import rimraf from 'rimraf';
import * as fs from 'fs';

async function globalSetup(): Promise<void> {
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve);
    });
    /* await new Promise(resolve => {
        fs.unlink(`./reporters/resultados.json`, resolve)
    }).then(() => {
        fs.openSync(`./reporters/resultados.json`, 'w');
    }); */
}
export default globalSetup;