import { testConfig } from '@testConfig'
import { Request, Response } from './payload';
import axios, { Axios } from 'axios';



class TestRailApi {

    private readonly http: Axios;
    private readonly projectId: string | undefined;
    constructor() {
      this.projectId = testConfig.testRailProjectId;
      this.http = axios.create({
        baseURL: testConfig.testRailHost + '/index.php?/api/v2/',
        auth: {
          username: testConfig.testRailUserName,
          password: testConfig.testRailPassword
        },
        headers: { 'Content-Type': 'application/json' },
      });  
    }

    async getProjects(): Promise<any> {
      const response = await this.http.get('/get_projects/');
      return response.data;
    }

    async getSuites(): Promise<Response.Suite[]> {
      const response = await this.http.get(`/get_suites/${this.projectId}/`);
      const suites: Response.Suite[] = JSON.parse(JSON.stringify(response.data));
      return suites;
    }

    async getSuite(name: string): Promise<Response.Suite> {
      const suites = await this.getSuites();
      const suite = suites.find(x => x.name === `${name}`);
      return suite;
    }

    async getSuiteId(name: string): Promise<number> {
      const suites = await this.getSuites();
      const suite = suites.find(x => x.name === `${name}`);
      return suite.id;
    }

    async getSuiteOneMethod(name: string): Promise<number> {
      const suiteId = await (await this.getSuites()).find(x => x.name === name).id;
      return suiteId;
    }

    async getRunId(runName: string, suiteId: number): Promise<number> {
      const response = await this.http.get(`/get_runs/${this.projectId}/`);
      const runs: Response.Run[] = JSON.parse(JSON.stringify(response.data.runs));
      const run = await runs.find(x => x.suite_id === suiteId);
      return run.id;
    }

    async getTests(runID: number): Promise<Response.Case[]> {
      const response = await this.http.get(`/get_tests/${runID.toString()}/`);
      const tests: Response.Case[] = JSON.parse(JSON.stringify(response.data.tests));
      return tests;
    }

    async addTestRun(suiteId: number, runName: string): Promise<void> {
      const data = {
        suite_id: suiteId,
        name: runName
      };
      await this.http.post('/add_run/' + this.projectId, data, {timeout: 4000});
    }

    async addTestsResults(runId: number, results: any): Promise<void> {
    try {
      await this.http.post(`add_results/${runId}`, results); 
    } catch (error) {
      console.log(error);
    }
    }
}

export default new TestRailApi();

