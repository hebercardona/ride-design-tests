import { test }  from '../framework/BaseTest';
import { BuildPage } from '../pageFactory/pageRepository/BuildPage'
import { LoginPage } from '../pageFactory/pageRepository/LoginPage';
import { QuotePage } from '../pageFactory/pageRepository/QuotePage';
import { BasePage } from '../pageFactory/pageRepository/BasePage';

let webContext;

test.beforeAll(async( {browser} ) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  let login = new LoginPage(page);
  await page.goto('https://ranger.polaris.com/en-us/build-model/');
  await login.clickSignIn();
  await login.enterEmail('heber.cardona@polaris.com');
  await login.enterPassword('C@rdona01');
  await login.clickSubmit();
  await page.waitForNavigation({waitUntil: 'load'});
  await context.storageState({path: './state.json'});
  await page.waitForLoadState('networkidle');
  webContext = await browser.newContext( {storageState: './state.json'} );
});

test('TEST', async( {page} ) => {
  let build = new BuildPage(page);
  let quote = new QuotePage(page);

  await page.goto('https://ranger.polaris.com/en-us/build-model/');
  await build.clickAnySeatCategory();
  await build.clickAnyModelCategory();
  await build.clickAnyTrim();
  await build.clickColorPageNextBtn();
  await build.openSummary();
  await build.clickIamFinishedBtn();
  await quote.enterFormDetailsAndSubmit();
})


test('Api Test', async ( {browser} ) => {
  const page = await webContext.newPage();
  let login = new LoginPage(page);
  await page.waitForLoadState('networkidle');
  await page.goto('https://ranger.polaris.com/en-us/build-model/');
  await login.clickSignIn();
})

test('TEST with pom manager', async( { pages: pages } ) => {

  await pages.navigation.navigateToUrl('https://ranger.polaris.com/en-us/build-model/');
  await pages.build.clickAnySeatCategory();
  await pages.build.clickAnyModelCategory();
  await pages.build.clickAnyTrim();
  await pages.build.clickColorPageNextBtn();
  await pages.build.openSummary();
  await pages.build.clickIamFinishedBtn();
  await pages.quote.enterFormDetailsAndSubmit();
})
