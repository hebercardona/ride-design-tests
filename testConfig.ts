import * as configFiles from './configFiles'


/* export const testConfig = 
process.env.ENV === `qa` ? configFiles.qaConfig :
process.env.ENV === `prod` ? configFiles.prodConfig : configFiles.qaConfig; */


const qaConfig = {
    db: {
        server: `awsusesqlqa01.cwnon3ixzzta.us-east-1.rds.amazonaws.com`,
        user: `QATester`,
        password: `Polaris$16`,
        database: `PolarisCMS`,
        driver: `msnodesqlv8`,
        options: {
            enableArithAbort: true
        }
    },
    currentYearUrls: {
        rzr: `https://www-qa.polarisindcms.com/{0}/off-road/rzr/build-model`,
        rgr: `https://www-qa.polarisindcms.com/{0}/off-road/ranger/build-model`,
        grl: `https://www-qa.polarisindcms.com/{0}/off-road/general/build-model`,
        atv: `https://www-qa.polaris.com/{0}/off-road/sportsman/build-model`,
        ind: `https://www-qa.indianmotorcyclecms.com/{0}/build-category/`,
        slg: `https://slingshot-qa.polarisindcms.com/{0}/build-category/`,
        sno: `https://snowmobiles-qa.polarisindcms.com/{0}/build-category/`,
        cmv: `https://commercial-qa.polarisindcms.com/{0}/build-model/`,
        mil: `https://military-qa.polarisindcms.com/{0}/build-category/`,
        ben: `https://www-qa.benningtonmarinecms.com/{0}/build-model/`,
        hur: `https://www-qa.hurricaneboatscms.com/{0}/build-model/`,
        gdy: `https://www-qa.godfreypontoonboatscms.com/{0}/build-category/`
    },
    previousYearUrls: {
        rzr: `https://www-qa.polarisindcms.com/{0}/off-road/rzr/{1}/build-model`,
        rgr: `https://www-qa.polarisindcms.com/{0}/off-road/ranger/{1}/build-model`,
        grl: `https://www-qa.polarisindcms.com/{0}/off-road/general/{1}/build-model`,
        atv: `https://www-qa.polaris.com/{0}/off-road/sportsman/{1}/build-model`,
        ind: `https://www-qa.indianmotorcyclecms.com/{0}/{1}/build-category/`,
        slg: `https://slingshot-qa.polarisindcms.com/{0}/{1}/build-category/`,
        sno: `https://snowmobiles-qa.polarisindcms.com/{0}/{1}/build-category/`,
    }
}

const prodConfig = {
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
        rzr: `https://www.polaris.com/{0}/off-road/rzr/build-model`,
        rgr: `https://www.polaris.com/{0}/off-road/ranger/build-model`,
        grl: `https://www.polaris.com/{0}/off-road/general/build-model`,
        atv: `https://www.polaris.com/{0}/off-road/sportsman/build-model`,
        ind: `https://www.indianmotorcycle.com/{0}/build-category/`,
        slg: `https://slingshot.polaris.com/{0}/build-category/`,
        sno: `https://snowmobiles.polaris.com/{0}/build-category/`,
        cmv: `https://commercial.polaris.com/{0}/build-model/`,
        mil: `https://military.polaris.com/{0}/build-category/`,
        ben: `https://www.benningtonmarine.com/{0}/build-model/`,
        hur: `https://www.hurricaneboats.com/{0}/build-model/`,
        gdy: `https://www.godfreypontoonboats.com/{0}/build-category/`
    },
    previousYearUrls: {
        rzr: `https://www.polaris.com/{0}/off-road/rzr/{1}/build-model`,
        rgr: `https://www.polaris.com/{0}/off-road/ranger/{1}/build-model`,
        grl: `https://www.polaris.com/{0}/off-road/general/{1}/build-model`,
        atv: `https://www.polaris.com/{0}/off-road/sportsman/{1}/build-model`,
        ind: `https://www.indianmotorcycle.com/{0}/{1}/build-category/`,
        slg: `https://slingshot.polaris.com/{0}/{1}/build-category/`,
        sno: `https://snowmobiles.polaris.com/{0}/{1}/build-category/`,
    }
}

const envConfig = {
    'prod': prodConfig,
    'qa': qaConfig
}

export const testConfig = {
    waitForElement: 120000,
    testRailHost: `https://ridecommand.testrail.io`,
    testRailUserName: `heber.cardona@polaris.com`,
    testRailPassword: `Flowers2012`,
    testRailProjectId: `31`,
    testRailSuiteName: process.env.SUITE_NAME,
    db: envConfig[process.env.ENV].db,
    currentYearUrls: envConfig[process.env.ENV].currentYearUrls,
    previousYearUrls: envConfig[process.env.ENV].previousYearUrls,
    previousYears: {
        rzr: `2022`,
        rgr: `2022`,
        grl: `2022`,
        atv: `2022`,
        ind: `2022`,
        slg: `2022`,
        sno: `2022`
    }
}




