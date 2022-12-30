
import { testConfig } from '@testConfig/';
import TestRailApi from './TestRailApi';

interface Result {
    title: string,
    status: string,
    message: string
}

interface TestRailResult {
    test_id: string,
    status_id: string,
    comment: string
}

class TestRailReporter {
    private testRailSuiteName: string;

    constructor() {
        this.testRailSuiteName = testConfig.testRailSuiteName;
    }

    async processTestsResults(): Promise<void> {
        const regex: RegExp = /^C\d+/;
        const json = require('../../reporters/testRailResults.json');
        const results: Result[] = JSON.parse(JSON.stringify(json.results));

        //Get tests from testRailResults.json file that has Test Rail Case ID in the title
        const testsWithCaseID = results.filter(x => x.title.match(regex));
		
		//Updating test title to just leave the case ID
		testsWithCaseID.forEach(test => {
            test.title = test.title.match(regex)[0].substring(1);
        });

        //To store test results in test rail format
        const resultsObj: TestRailResult[] = [];
        
        //Get test suite id based on suite name
        const testRailSuiteId = await TestRailApi.getSuiteId(this.testRailSuiteName);

        //Add test run based on suite ID and project ID
        await TestRailApi.addTestRun(testRailSuiteId, 'Playwright Run');

        //Get newly created run ID
        const runId = await TestRailApi.getRunId('Playwright Run', testRailSuiteId);

        //Get tests cases from test rail contained in newly created test run
        const testsList = await TestRailApi.getTests(runId);

        //Compare test IDs from local results json file and test rail tests cases and exclude tests not found in test rail
        const testsIdsMatchingInTestRail = testsWithCaseID.filter(testResults => 
            testsList.some(testRailIds => 
                testResults.title === testRailIds.case_id.toString()));

        //Update test case ID to use test run case id for reporting
        testsIdsMatchingInTestRail.forEach(x => {
            testsList.forEach(t => {
                if(x.title === t.case_id.toString()) {
                    x.title = t.id.toString();
                }
            })
        });

        //Update test results object with test rail status
        testsIdsMatchingInTestRail.forEach(x => {
            resultsObj.push({
                test_id: x.title,
                status_id: x.status === 'passed' ? '1' : '5',
                comment: x.message});
        });
    
        //Create test results object in the requested format for api use
        const testRailResults = {
            "results": resultsObj
        }

        //Add bulk update from test results in the test run
        await TestRailApi.addTestsResults(runId, testRailResults)
    }
    
}

export default new TestRailReporter();