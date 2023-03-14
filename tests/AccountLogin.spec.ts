import { test, expect } from "@framework/BaseTest";
import { testConfig } from "@testConfig";

for (const locale of testConfig.domesticLocales.rzr) {
    test(`Verify user can sucessfully login in rzr ${locale} site`, async({ pages }) => {
        await test.step(`Navigate to rzr ${locale} starting build page`, async() => {
            await pages.navigation.navigateToStartingBuildUrl('rzr', locale);
        });
        await test.step(`Login as regular customer from hamburger menu`, async() => {
            await pages.build.login.customerLogin();
        });
        await test.step(`Verify login is successfull`, async() => {
            await pages.build.login.clickSignIn();
            await pages.build.login.verifyUserLoggedIn();
        });
    }); 
}

for (const locale of testConfig.domesticLocales.rgr) {
    test(`Verify user can sucessfully login in rgr ${locale} site`, async({ pages }) => {
        await test.step(`Navigate to rgr ${locale} starting build page`, async() => {
            await pages.navigation.navigateToStartingBuildUrl('rgr', locale);
        });
        await test.step(`Login as regular customer from hamburger menu`, async() => {
            await pages.build.login.customerLogin();
        });
        await test.step(`Verify login is successfull`, async() => {
            await pages.build.login.clickSignIn();
            await pages.build.login.verifyUserLoggedIn();
        });
    }); 
}

for (const locale of testConfig.domesticLocales.grl) {
    test(`Verify user can sucessfully login in grl ${locale} site`, async({ pages }) => {
        await test.step(`Navigate to rgr ${locale} starting build page`, async() => {
            await pages.navigation.navigateToStartingBuildUrl('grl', locale);
        });
        await test.step(`Login as regular customer from hamburger menu`, async() => {
            await pages.build.login.customerLogin();
        });
        await test.step(`Verify login is successfull`, async() => {
            await pages.build.login.clickSignIn();
            await pages.build.login.verifyUserLoggedIn();
        });
    }); 
}

for (const locale of testConfig.domesticLocales.atv) {
    test(`Verify user can sucessfully login in atv ${locale} site`, async({ pages }) => {
        await test.step(`Navigate to rgr ${locale} starting build page`, async() => {
            await pages.navigation.navigateToStartingBuildUrl('atv', locale);
        });
        await test.step(`Login as regular customer from hamburger menu`, async() => {
            await pages.build.login.customerLogin();
        });
        await test.step(`Verify login is successfull`, async() => {
            await pages.build.login.clickSignIn();
            await pages.build.login.verifyUserLoggedIn();
        });
    }); 
}
