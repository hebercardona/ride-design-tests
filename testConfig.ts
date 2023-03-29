import * as configFiles from './configFiles'


/* export const testConfig = 
process.env.ENV === 'qa' ? configFiles.qaConfig :
process.env.ENV === 'prod' ? configFiles.prodConfig : configFiles.qaConfig; */


const qaConfig = {
    db: {
        server: 'awsusesqlqa01.cwnon3ixzzta.us-east-1.rds.amazonaws.com',
        user: 'QATester',
        password: 'Polaris$16',
        database: 'PolarisCMS',
        driver: 'msnodesqlv8',
        options: {
            encrypt: true,
            trustServerCertificate: true,
            enableArithAbort: true
        }
    },
    baseUrl: 'https://www-qa.polarisindcms.com/',
    brandDomains: {
        rzr: 'www-qa.polarisindcms.com',
        rgr: 'www-qa.polarisindcms.com',
        grl: 'www-qa.polarisindcms.com',
        atv: 'www-qa.polaris.com',
        ind: 'www-qa.indianmotorcyclecms.com',
        slg: 'slingshot-qa.polarisindcms.com',
        sno: 'snowmobiles-qa.polarisindcms.com',
        cmv: 'commercial-qa.polarisindcms.com',
        mil: 'military-qa.polarisindcms.com',
        ben: 'www-qa.benningtonmarinecms.com',
        hur: 'www-qa.hurricaneboatscms.com',
        gdy: 'www-qa.godfreypontoonboatscms.com'
    },
    currentYearUrls: {
        rzr: 'https://www-qa.polarisindcms.com/{0}/off-road/rzr/build-model',
        rgr: 'https://www-qa.polarisindcms.com/{0}/off-road/ranger/build-model',
        grl: 'https://www-qa.polarisindcms.com/{0}/off-road/general/build-model',
        atv: 'https://www-qa.polarisindcms.com/{0}/off-road/sportsman/build-model',
        ind: 'https://www-qa.indianmotorcyclecms.com/{0}/build-category/',
        slg: 'https://slingshot-qa.polarisindcms.com/{0}/build-category/',
        sno: 'https://snowmobiles-qa.polarisindcms.com/{0}/build-category/',
        cmv: 'https://commercial-qa.polarisindcms.com/{0}/build-model/',
        mil: 'https://military-qa.polarisindcms.com/{0}/build-category/',
        ben: 'https://www-qa.benningtonmarinecms.com/{0}/build-model/',
        hur: 'https://www-qa.hurricaneboatscms.com/{0}/build-model/',
        gdy: 'https://www-qa.godfreypontoonboatscms.com/{0}/build-category/'
    },
    previousYearUrls: {
        rzr: 'https://www-qa.polarisindcms.com/{0}/off-road/rzr/{1}/build-model',
        rgr: 'https://www-qa.polarisindcms.com/{0}/off-road/ranger/{1}/build-model',
        grl: 'https://www-qa.polarisindcms.com/{0}/off-road/general/{1}/build-model',
        atv: 'https://www-qa.polaris.com/{0}/off-road/sportsman/{1}/build-model',
        ind: 'https://www-qa.indianmotorcyclecms.com/{0}/{1}/build-category/',
        slg: 'https://slingshot-qa.polarisindcms.com/{0}/{1}/build-category/',
        sno: 'https://snowmobiles-qa.polarisindcms.com/{0}/{1}/build-category/',
    }
}

const prodConfig = {
    db: {
        server: 'cms-prod-dbserver.polarisindcms.com',
        user: 'EPiServer',
        password: 'VJCt_H^6Xg-S',
        database: 'PolarisCMS',
        driver: 'msnodesqlv8',
        options: {
            encrypt: true,
            trustServerCertificate: true,
            enableArithAbort: true
        }
    },
    baseUrl: 'https://www.polaris.com/',
    brandDomains: {
        rzr: 'www.polaris.com',
        rgr: 'www.polaris.com',
        grl: 'www.polaris.com',
        atv: 'www.polaris.com',
        ind: 'www.indianmotorcycle.com',
        slg: 'slingshot.polaris.com',
        sno: 'snowmobiles.polaris.com',
        cmv: 'commercial.polaris.com',
        mil: 'military.polaris.com',
        ben: 'www.benningtonmarine.com',
        hur: 'www.hurricaneboats.com',
        gdy: 'www.godfreypontoonboats.com'
    },
    currentYearUrls: {
        rzr: 'https://www.polaris.com/{0}/off-road/rzr/build-model',
        rgr: 'https://www.polaris.com/{0}/off-road/ranger/build-model',
        grl: 'https://www.polaris.com/{0}/off-road/general/build-model',
        atv: 'https://www.polaris.com/{0}/off-road/sportsman/build-model',
        ind: 'https://www.indianmotorcycle.com/{0}/build-category/',
        slg: 'https://slingshot.polaris.com/{0}/build-category/',
        sno: 'https://snowmobiles.polaris.com/{0}/build-category/',
        cmv: 'https://commercial.polaris.com/{0}/build-model/',
        mil: 'https://military.polaris.com/{0}/build-category/',
        ben: 'https://www.benningtonmarine.com/{0}/build-model/',
        hur: 'https://www.hurricaneboats.com/{0}/build-model/',
        gdy: 'https://www.godfreypontoonboats.com/{0}/build-category/'
    },
    previousYearUrls: {
        rzr: 'https://www.polaris.com/{0}/off-road/rzr/{1}/build-model',
        rgr: 'https://www.polaris.com/{0}/off-road/ranger/{1}/build-model',
        grl: 'https://www.polaris.com/{0}/off-road/general/{1}/build-model',
        atv: 'https://www.polaris.com/{0}/off-road/sportsman/{1}/build-model',
        ind: 'https://www.indianmotorcycle.com/{0}/{1}/build-category/',
        slg: 'https://slingshot.polaris.com/{0}/{1}/build-category/',
        sno: 'https://snowmobiles.polaris.com/{0}/{1}/build-category/',
    }
}

const envConfig = {
    'prod': prodConfig,
    'qa': qaConfig
}

export const testConfig = {
    waitForElement: 120000,
    canvasWait: process.env.ENV === 'qa' ? 6000 : 3000,
    testRailHost: 'https://ridecommand.testrail.io',
    testRailUserName: 'heber.cardona@polaris.com',
    testRailPassword: 'Flowers2012',
    testRailProjectId: '31',
    testRailSuiteName: process.env.SUITE_NAME,
    testEnvironment: process.env.ENV ?? 'qa',
    db: envConfig[process.env.ENV].db,
    baseUrl: envConfig[process.env.ENV].baseUrl,
    brandDomains: envConfig[process.env.ENV].brandDomains,
    currentYearUrls: envConfig[process.env.ENV].currentYearUrls,
    previousYearUrls: envConfig[process.env.ENV].previousYearUrls,
    currentYears: {
        rzr: '2023',
        rgr: '2023',
        grl: '2023',
        atv: '2023',
        ind: '2023',
        slg: '2023',
        sno: '2024',
        cmv: '2023',
        mil: '2023',
        ben: '2023',
        hur: '2023',
        gdy: '2023',
    },
    previousYears: {
        rzr: '2022',
        rgr: '2022',
        grl: '2022',
        atv: '2022',
        ind: '2022',
        slg: '2022',
        sno: '2023'
    },
    domesticLocales: {
        rzr: ['en-us', 'en-ca', 'fr-ca', 'es-us'],
        rgr: ['en-us', 'en-ca', 'fr-ca', 'es-us'],
        grl: ['en-us', 'en-ca', 'fr-ca', 'es-us'],
        atv: ['en-us', 'en-ca', 'fr-ca', 'es-us'],
        ind: ['en-us', 'en-ca', 'fr-ca', 'es-us'],
        slg: ['en-us', 'en-ca', 'fr-ca', 'es-us'],
        sno: ['en-us', 'en-ca', 'fr-ca',],
        cmv: ['en-us', 'en-ca', 'fr-ca',],
        mil: ['en-us'],
        ben: ['en-us', 'en-ca', 'fr-ca',],
        hur: ['en-us', 'en-ca', 'fr-ca',],
        gdy: ['en-us', 'en-ca', 'fr-ca',],
    },
    internationalLocales: {
        rzr: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'es-es', 'en-001', 'sv-se', 'pt-pt', 'de-de', 'de-at', 'fr-fr'],
        rgr: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'en-001', 'sv-se', 'es-es', 'pt-pt', 'de-de', 'de-at', 'fr-fr', 'en-nz', 'en-au' ],
        atv: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'en-001', 'sv-se', 'es-es', 'pt-pt', 'de-de', 'de-at', 'fr-fr'],
        grl: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'en-001', 'sv-se', 'es-es', 'pt-pt', 'de-de', 'de-at', 'fr-fr'],
        ind: [ 'en-001', 'es-mx', 'de-de', 'de-at', 'en-nz', 'en-au', 'en-gb', 'en-ie', 'pt-pt', 'en-za', 'sv-se', 'nb-no', 'fi-fi', 'nl-be', 'nl-nl', 'fr-be', 'es-es', 'fr-fr', 'fr-ch', 'de-ch', 'en-in', 'ar-sa' ],
        sno: [ 'nb-no', 'fi-fi', 'sv-se' ],
        ben: [ 'nb-no' ]
    },
    previousYearInternationalLocales : {
        rzr: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'es-es', 'en-001', 'sv-se', 'pt-pt', 'de-de', 'de-at', 'fr-fr', 'pt-br', 'en-nz', 'en-au' ],
        rgr: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'en-001', 'sv-se', 'es-es', 'pt-pt', 'de-de', 'de-at', 'fr-fr', 'pt-br', 'en-nz', 'en-au' ],
        atv: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'en-001', 'sv-se', 'es-es', 'pt-pt', 'de-de', 'de-at', 'fr-fr', 'pt-br', 'en-nz' ],
        grl: [ 'es-mx', 'en-gb', 'en-ie', 'nb-no', 'fi-fi', 'en-001', 'sv-se', 'es-es', 'pt-pt', 'de-de', 'de-at', 'fr-fr', 'pt-br', 'en-nz', 'en-au' ],
        ind: [ 'en-001', 'es-mx', 'de-de', 'de-at', 'en-nz', 'en-au', 'en-gb', 'en-ie', 'pt-pt', 'en-za', 'sv-se', 'nb-no', 'fi-fi', 'nl-be', 'nl-nl', 'fr-be', 'es-es', 'fr-fr', 'fr-ch', 'de-ch', 'en-in', 'ar-sa' ],
        sno: [ 'nb-no' ]
    }
}




