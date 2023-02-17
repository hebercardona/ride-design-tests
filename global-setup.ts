import rimraf from 'rimraf';
import * as fs from 'fs';
import ApiData from '@framework/ApiData';

async function globalSetup(): Promise<void> {
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve);
    });
    /* const buildUrls = await ApiData.getApiAllBuildUrl('en-us', 'sno')
    .then(result => {
        fs.writeFileSync('./buildUrls.json', JSON.stringify(result, null, 2));
    }); */
}
export default globalSetup;