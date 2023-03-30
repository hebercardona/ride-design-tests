import rimraf from 'rimraf';

async function globalSetup(): Promise<void> {
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve);
    });
    await new Promise(resolve => {
        rimraf(`./screenshots`, resolve);
    });
}
export default globalSetup;