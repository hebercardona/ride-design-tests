import { testConfig } from '@testConfig/*';
import { expect, test }  from '../framework/BaseTest';
import SqlClient from '@framework/SqlClient';

let theList;

let testIdPerLocale = [
  {id: 'C15432125', locale: 'en-us'},
  {id: 'C15432126', locale: 'en-ca'}
];

for (const testInstance of testIdPerLocale) {

  test(`${testInstance.id}_${testInstance.locale} Test Title with parameters`, async ( { pages } ) => {
    await pages.navigation.navigatoToUrl("https://ranger.polaris.com/en-us/build-model/");
    await pages.build.clickAnySeatCategory();
    /* await pages.build.clickAnyModelCategory();
    await pages.build.clickAnyTrim();
    await pages.build.clickFooterNext();
    await pages.build.openSummary();
    await pages.build.clickGetQuote();
    await pages.quote.enterFormDetailsAndSubmit(); */
    console.log('process.env.CI ' + process.env.CI);
    const envOne = process.env.SUITE_NAME;
    console.log(envOne);
  });

  
}

test(`Test with urls dynamic`, async ( { pages } ) => {
  const url = testConfig.currentYearUrls.rzr;
  /* await pages.navigation.navigateToStartingBuildUrl('sno');
  await pages.build.clickAnySeatCategory();
  await pages.build.header.clickModelsNavigationItem(); */
  /* await pages.build.clickAnyModelCategory();
  await pages.build.clickAnyTrim();
  await pages.build.clickFooterNext();
  await pages.build.openSummary();
  await pages.build.clickGetQuote();
  await pages.quote.enterFormDetailsAndSubmit(); */
});

test.only(`Test SQL Server`, async ( { pages } ) => {
  await pages.navigation.navigateToStartingBuildUrl('rzr');
  const query = `select LoadUrl from ConfiguredWholegoods where BuildID = 'D7489428-D586-4255-9887-4B4FC23BF89B'`;
  const results = await SqlClient.executeQuery(query);
  console.log(results.recordset[0].LoadUrl);
})