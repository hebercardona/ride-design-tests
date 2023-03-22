import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Common } from "@framework/Common";
import SqlHelper from "@framework/SqlClient";
import { testConfig } from "@testConfig";
import sql from 'mssql';
const qaStr = "Data Source=awsusesqlqa01.cwnon3ixzzta.us-east-1.rds.amazonaws.com;Initial Catalog=PolarisCMS;Integrated Security=False;User ID=QATester;Password=Polaris$16;MultipleActiveResultSets=True";
const prodStr = "Data Source=cms-prod-dbserver.polarisindcms.com;Initial Catalog=PolarisCMS;Integrated Security=False;User ID=EPiServer;Password=VJCt_H^6Xg-S;MultipleActiveResultSets=True";

const loadUrlQuery = `select LoadUrl from ConfiguredWholegoods where BuildID = '0e6b4673-7800-4119-b805-7b5956349ed7'`;
const dbSettings = {
    server: 'cms-prod-dbserver.polarisindcms.com',
    user: 'EPiServer',
    password: 'VJCt_H^6Xg-S',
    database: 'PolarisCMS',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

test.only(`Verify build load url working fine`, async( {pages} ) => {
    


    /* const url = await ApiData.getApiBuildUrl('en-us', 'rzr');
    await pages.navigation.navigateToUrl(url);
    await pages.build.waitForPcLoaded();
    await pages.build.openBuildSummaryAndClickImFinished();
    const buildId = Common.getBuildIdFromQuoteUrl(await pages.page.url()); */
    const query = `select LoadUrl from ConfiguredWholegoods where BuildID = 'F26971AE-B497-41D2-87E3-792B92CFB610'`;
    const results = await SqlHelper.executeQuery(query);
    const loadUrl = results.recordset[0].LoadUrl;
    console.log(loadUrl);
})

async function getConnection() {
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query(`select LoadUrl from ConfiguredWholegoods where BuildID = 'F26971AE-B497-41D2-87E3-792B92CFB610'`);
    console.log(result);
}