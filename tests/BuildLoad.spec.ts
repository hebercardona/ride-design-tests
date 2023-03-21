import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Common } from "@framework/Common";
import SqlHelper from "@framework/SqlClient";
import { SqlClient } from "msnodesqlv8";
const sql: SqlClient = require('msnodesqlv8');
const qaStr = "Data Source=awsusesqlqa01.cwnon3ixzzta.us-east-1.rds.amazonaws.com;Initial Catalog=PolarisCMS;Integrated Security=False;User ID=QATester;Password=Polaris$16;MultipleActiveResultSets=True";
const prodStr = "Data Source=cms-prod-dbserver.polarisindcms.com;Initial Catalog=PolarisCMS;Integrated Security=False;User ID=EPiServer;Password=VJCt_H^6Xg-S;MultipleActiveResultSets=True";

const loadUrlQuery = `select LoadUrl from ConfiguredWholegoods where BuildID = '0e6b4673-7800-4119-b805-7b5956349ed7'`;

test.only(`Verify build load url working fine`, async( {pages} ) => {

    /* const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(url);
    await pages.build.waitForPcLoaded();
    await pages.build.openBuildSummaryAndClickImFinished();
    const buildId = Common.getBuildIdFromQuoteUrl(await pages.page.url()); */
    const query = `select LoadUrl from ConfiguredWholegoods where BuildID = '0e6b4673-7800-4119-b805-7b5956349ed7'`;
    const results = await SqlHelper.executeQuery(query);
    const loadUrl = results.recordset[0].LoadUrl;
    console.log(loadUrl);
})