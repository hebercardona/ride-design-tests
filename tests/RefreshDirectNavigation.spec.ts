import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { testConfig } from "@testConfig";


for (const brand of Brands.orv) {
    for (const locale of testConfig.previousYearInternationalLocales[brand]) {
        test(`Verify ${brand} direct navigation for previous year ${locale}`, async ( {pages} ) => {
            let response;
            await test.step(`Get url for ${brand} ${locale} from getAllModels api and navigate`, async() => {
                const url = await ApiData.getApiPreviousYearBuildUrl(locale, brand);
                await pages.navigation.navigateToUrl(url);
                await pages.page.waitForLoadState('domcontentloaded');
            });
            await test.step(`Evaluate api response status is successful`, async() => {
                response = await pages.page.request.get(pages.page.url());
                expect(await response.status()).toBe(200);
            });
            await test.step(`UI refresh and validate response status is successful`, async() => {
                await pages.page.reload();
                response = await pages.page.request.get(pages.page.url());
                expect(await response.status()).toBe(200); 
            });
        
        });
    }
}

for (const locale of testConfig.previousYearInternationalLocales.ind) {
    test(`Get url for ind ${locale} from getAllModels api and navigate`, async ( {pages} ) => {
        let response;
        await test.step(`Navigate to ind ${locale} accessories page for any model`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, Brands.ind);
            await pages.navigation.navigateToUrl(url);
            await pages.page.waitForLoadState('domcontentloaded');
        });
        await test.step(`Send request to evaluate responsa status for current build url`, async() => {
            response = await pages.page.request.get(pages.page.url());
            expect(await response.status()).toBe(200);
        });
        await test.step(`UI refresh and validate response status is successful`, async() => {
            await pages.page.reload();
            response = await pages.page.request.get(pages.page.url());
            expect(await response.status()).toBe(200); 
        });
    
    });
}

for (let brand of Brands.orv) {
    for (let locale of testConfig.previousYearInternationalLocales[brand]) {
        test(`Get ${brand} build urls for ${locale}`, async ( {pages} ) => {
            let response;
            const urls = await ApiData.getApiAllPreviousYearBuildUrl(locale, brand);
            expect(await urls.length, 'Build Urls not returned').toBeGreaterThan(0);
            console.log('Total urls returned: ' + urls.length);
            console.log('urls: ' + urls);

            let brandName;
            if(brand === 'atv') {
                brandName = 'sportsman';
            } else if(brand === 'rgr') {
                brandName = 'ranger';
            } else if(brand === 'grl') {
                brandName = 'general';
            } else if(brand === 'rzr') {
                brandName = 'rzr';
            }
            console.log('Converted brand: ' + brand);
            const incorrectUrls = urls.filter(url => !url.includes(brandName));

            if(incorrectUrls.length > 0) {
                console.log('Unexpected urls: ' + incorrectUrls)
            }

            expect(urls.every(url => url.includes(brandName))).toBeTruthy();
        });
    }
}


