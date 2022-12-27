import { test }  from '../framework/baseTest';
import { BuildPage } from '../pageFactory/pageRepository/buildPage'
import { LoginPage } from '../pageFactory/pageRepository/LoginPage';
import { QuotePage } from '../pageFactory/pageRepository/quotePage';
import { Pages } from '../pageFactory/pageRepository/Pages';

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
  await build.clickFooterNext();
  await build.openSummary();
  await build.clickGetQuote();
  await quote.enterFormDetailsAndSubmit();
})


test('Api Test', async ( {browser} ) => {
  const page = await webContext.newPage();
  let login = new LoginPage(page);
  await page.waitForLoadState('networkidle');
  await page.goto('https://ranger.polaris.com/en-us/build-model/');
  await login.clickSignIn();
})

test('TEST with pom manager', async( { pages } ) => {

  await pages.navigation.navigatoToUrl('https://ranger.polaris.com/en-us/build-model/');
  await pages.build.clickAnySeatCategory();
  await pages.build.clickAnyModelCategory();
  await pages.build.clickAnyTrim();
  await pages.build.clickFooterNext();
  await pages.build.openSummary();
  await pages.build.clickGetQuote();
  await pages.quote.enterFormDetailsAndSubmit();
})
