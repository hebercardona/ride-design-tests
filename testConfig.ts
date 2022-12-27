
const prodConfig = {
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
};

const qaConfig = {
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
    currentYearUrls: {
        rzr: `https://www-qa.polarisindcms.com/en-us/off-road/rzr/build-model`,
        rgr: `https://www-qa.polarisindcms.com/en-us/off-road/rgr/build-model`,
        grl: `https://www-qa.polarisindcms.com/en-us/off-road/general/build-model`,
        atv: `https://www-qa.polaris.com/en-us/off-road/sportsman/build-model`,
        ind: `https://www-qa.indianmotorcyclecms.com/en-us/build-category/`,
        slg: `https://slingshot-qa.polarisindcms.com/en-us/build-category/`,
        sno: `https://snowmobiles-qa.polarisindcms.com/en-us/build-category/`,
        cmv: `https://commercial-qa.polarisindcms.com/en-us/build-model/`,
        mil: `https://military-qa.polarisindcms.com/en-us/build-category/`,
        ben: `https://www-qa.benningtonmarinecms.com/en-us/build-model/`,
        hur: `https://www-qa.hurricaneboatscms.com/en-us/build-model/`,
        gdy: `https://www-qa.godfreypontoonboatscms.com/en-us/build-category/`
    }
}

export const testConfig = 
process.env.ENV === `qa` ? qaConfig : 
process.env.ENV === `prod` ? prodConfig : qaConfig;

/* export const testConfig = {
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
}; */