export const prodConfig = {
    qa: `http://automationpractice.com`,
    dev: ``,
    qaApi: `https://reqres.in`,
    devApi: ``,
    username: `demouat@gmail.com`,
    password: `U2FsdGVkX1+6691EJeW/QG2vpjUvj47EQBrTIN5BqZg=`,
    waitForElement: 120000,
    dbUsername: ``,
    dbPassword: ``,
    dbServerName: ``,
    dbPort: ``,
    dbName: ``,
    testRailHost: `https://ridecommand.testrail.io`,
    testRailUserName: `heber.cardona@polaris.com`,
    testRailPassword: `Flowers2012`,
    testRailProjectId: `31`,
    testRailSuiteName: process.env.SUITE_NAME,
    connectionString: `Data Source=cms-prod-dbserver.polarisindcms.com;Initial Catalog=PolarisCMS;Integrated Security=False;User ID=EPiServer;Password=VJCt_H^6Xg-S;MultipleActiveResultSets=True`,
    db: {
        server: `cms-prod-dbserver.polarisindcms.com`,
        user: `EPiServer`,
        password: `VJCt_H^6Xg-S`,
        database: `PolarisCMS`,
        driver: `msnodesqlv8`,
        options: {
            enableArithAbort: true
        }
    },
    currentYearUrls: {
        rzr: `https://www.polaris.com/en-us/off-road/rzr/build-model`,
        rgr: `https://www.polaris.com/en-us/off-road/rgr/build-model`,
        grl: `https://www.polaris.com/en-us/off-road/general/build-model`,
        atv: `https://www.polaris.com/en-us/off-road/sportsman/build-model`,
        ind: `https://www.indianmotorcycle.com/en-us/build-category/`,
        slg: `https://slingshot.polaris.com/en-us/build-category/`,
        sno: `https://snowmobiles.polaris.com/en-us/build-category/`,
        cmv: `https://commercial.polaris.com/en-us/build-model/`,
        mil: `https://military.polaris.com/en-us/build-category/`,
        ben: `https://www.benningtonmarine.com/en-us/build-model/`,
        hur: `https://www.hurricaneboats.com/en-us/build-model/`,
        gdy: `https://www.godfreypontoonboats.com/en-us/build-category/`
    }
}