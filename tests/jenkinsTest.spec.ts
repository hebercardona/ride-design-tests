import { expect, test }  from '../framework/baseTest';

let testIdPerLocale = [
  {id: 'C15432125', locale: 'en-us'},
  {id: 'C15432126', locale: 'en-ca'}
];

for (const testInstance of testIdPerLocale) {

  test.only(`${testInstance.id}_${testInstance.locale} Test Title with parameters`, async ( { pages } ) => {
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