import ApiData from "@framework/ApiData";
import { test, expect } from "@framework/BaseTest";
import { Common } from "@framework/Common";
import SqlHelper from "@framework/SqlClient";
import { testConfig } from "@testConfig";
import { getComparator } from 'playwright-core/lib/utils';
const comparator = getComparator('image/png');

for (const locale of testConfig.domesticLocales.rzr) {
    test(`Verify rzr build load works as expected for domestic ${locale}`, async( {pages}, testInfo ) => {
        let beforeImg;
        let afterImg;
        let loadUrl;
    
        await test.step('Navigate to any build url', async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'rzr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await test.step('Open build summary and take snapshot for further validation', async() => {
            await pages.build.openSummary();
            beforeImg = await  (await pages.build.summary.getBuildsummaryDialogElement()).screenshot({path: `screenshots/${testInfo.title}_before.png`});
        });
        await test.step('Click I am Finished to get to build quote page', async() => {
            await pages.build.clickIamFinishedBtn();
        });
        await test.step('Get submissionID from url and get load url from database', async() => {
            const buildId = Common.getBuildIdFromQuoteUrl(pages.page.url());
            const loadUrlQuery = await SqlHelper.executeQuery(`select LoadUrl from ConfiguredWholegoods where BuildID = '${buildId}'`);
            loadUrl = loadUrlQuery.recordset[0].LoadUrl;
        });
        await test.step('Navigate to load url and verify response is successful', async() => {
            await pages.navigation.navigateToUrl(loadUrl);
            await pages.build.waitForPcLoaded();
        });
        await test.step('Open build summary and take snapshot after load url loaded', async() => {
            await pages.build.openSummary();
            afterImg = await  (await pages.build.summary.getBuildsummaryDialogElement()).screenshot({path: `screenshots/${testInfo.title}_after.png`})
        });
        await test.step('Compare build summary snapshots', async() => {
            expect(comparator(beforeImg, afterImg)).toBeNull();
        });
        
    })
}
