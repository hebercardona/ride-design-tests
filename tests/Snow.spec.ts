import ApiData from "@framework/ApiData";
import { expect, test } from "@framework/BaseTest"

const fs = require('fs');
const urls = JSON.parse(fs.readFileSync('buildUrls.json'));


test(`sno console errors build-color testtest`, async ( { pages } ) => {
    await pages.navigation.navigateToUrl('https://snowmobiles.polaris.com/en-us/build-color/?CatalogContentId=686318__CatalogContent');
    await pages.build.waitForPcLoaded();
  });

for (const url of urls) {
    test(`sno ${url}`, async ( { pages } ) => {
        await pages.navigation.navigateToUrl(url);
        await pages.build.waitForPcLoaded();
    });
}

test.afterEach(async({ pages }) => {
    const errors = pages.pageConsoleErrors;
    expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
});

async function getBuildUrls(): Promise<string[]> {
    const urls = await ApiData.getApiAllBuildUrl('en-us', 'sno');
    return urls;
}

  