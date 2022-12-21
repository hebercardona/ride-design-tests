import { expect, test }  from '../framework/baseTest';

test('C15432125 Test with fixture', async ( { pages } ) => {
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