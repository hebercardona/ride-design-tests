import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { testConfig } from "@testConfig";

const TEST_RAIL_IDS = {
  rzr: { 'en-us': 'C17826767', 'es-us': 'C17826769', 'en-ca': 'C17826768', 'fr-ca': 'C17826770' },
  rgr: { 'en-us': 'C17826771', 'es-us': 'C17826773', 'en-ca': 'C17826772', 'fr-ca': 'C17826774' },
  grl: { 'en-us': 'C17826775', 'es-us': 'C17826777', 'en-ca': 'C17826776', 'fr-ca': 'C17826778' },
  atv: { 'en-us': 'C17826779', 'es-us': 'C17826781', 'en-ca': 'C17826780', 'fr-ca': 'C17826782' },
  ind: { 'en-us': 'C17826783', 'es-us': 'C17826784', 'en-ca': 'C17826785', 'fr-ca': 'C17826786' },
  slg: { 'en-us': 'C17826787', 'es-us': 'C17826790', 'en-ca': 'C17826788', 'fr-ca': 'C17826789' },
  sno: { 'en-us': 'C17826791', 'en-ca': 'C17826792', 'fr-ca': 'C17826793' },
  cmv: { 'en-us': 'C17826794', 'en-ca': 'C17826795', 'fr-ca': 'C17826796' },
  ben: { 'en-us': 'C17826798', 'en-ca': 'C17826799', 'fr-ca': 'C17826800' },
  gdy: { 'en-us': 'C17826801', 'en-ca': 'C17826802', 'fr-ca': 'C17826803' },
  hur: { 'en-us': 'C17826804', 'en-ca': 'C17826805', 'fr-ca': 'C17826806' }
}

  for (const brand of Brands.orv) {
    for (const locale of testConfig.domesticLocales[brand]) {
      test(`${TEST_RAIL_IDS[brand][locale]} Verify ${brand} ${locale} stepped process and build submission @regression`, async ( { pages } ) => {

        let accessoryAdded;
        await test.step(`Navigate to ${brand} ${locale} start build page`, async () => {
          await pages.navigation.navigateToStartingBuildUrl(brand, locale);
        });
        await test.step(`Select any model and go to accessories page`, async () => {
          await pages.build.modelSelectionToAccessoriesPage();
        });
        await test.step(`Add any regular accessory`, async () => {
          accessoryAdded = await pages.build.carousel.addAccessory();
        });
        await test.step(`Open build summary and click I am Finished`, async () => {
          await pages.build.openBuildSummaryAndClickImFinished();
        });
        await test.step(`Fill quote form details and submit`, async () => {
          await pages.quote.enterFormDetailsAndSubmit();
        });
        await test.step(`Verify the product added is present in confirmation page`, async () => {
          expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
        `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
        });
        await test.step(`Verify no duplicate products`, async () => {
          expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
        });
      }); 
    } 
  }

  for (const locale of testConfig.domesticLocales.ind) {
    test(`${TEST_RAIL_IDS.ind[locale]} Verify ind build submission for ${locale} @regression `, async ( { pages } ) => {
      let accessoryAdded;
      await test.step(`Navigate to indian start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.ind, locale);
      });
      await test.step(`Navigate to accessories page with any selection`, async () => {
        await pages.build.categoryToAccessoriesPageInd();
      });
      await test.step(`Add accessory`, async () => {
        accessoryAdded = await pages.build.carousel.addAccessory();
      });
      await test.step(`Navigate to build quote and submit form`, async () => {
        await pages.build.openBuildSummaryAndClickImFinished();
        await pages.quote.enterFormDetailsAndSubmit();
      });
      await test.step(`Verify confirmation page details`, async () => {
        expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
        `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
    
        expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
      });
    }); 
  }

  for (const locale of testConfig.domesticLocales.slg) {
    test(`${TEST_RAIL_IDS.slg[locale]} Verify slg build submission for ${locale} @regression`, async ( { pages } ) => {
      let accessoryAdded;
      await test.step(`Navigate to slingshot start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.slg, locale);
      });
      await test.step(`Click slingshot category`, async () => {
        await pages.build.clickAnyCategory();
      });
      await test.step(`Perform feature selection subteps`, async () => {
        await pages.build.performFeatureSelectionSubsteps();
        await pages.build.waitForPcLoaded();
      });
      await test.step(`Click any color item`, async () => {
        await pages.build.clickAnyColorItem();
      });
      await test.step(`Click footer next`, async () => {
        await pages.build.clickFooterNextBtn();
      });
      await test.step(`Perform option selection subteps`, async () => {
        await pages.build.performOptionSelectionSubsteps();
        await pages.build.waitForPcLoaded();
      });
      await test.step(`Add accessory`, async () => {
        accessoryAdded = await pages.build.carousel.addAccessory();
      });
      await test.step(`Navigate to build quote and submit form`, async () => {
        await pages.build.openBuildSummaryAndClickImFinished();
        await pages.quote.enterSlgFormDetailsAndSubmit();
      });
      await test.step(`Verify confirmation page details`, async () => {
        expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
      `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
  
        expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();  
      });
    }); 
  }

  for (const locale of testConfig.domesticLocales.sno) {
    test(`${TEST_RAIL_IDS.sno[locale]} Verify sno build submission for ${locale} @regression`, async ( { pages } ) => {
      let accessoryAdded;
      await test.step(`Navigate to snow start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.sno, locale);
      });
      await test.step(`Click snow family`, async () => {
        await pages.build.clickAnyCategory();
      });
      await test.step(`Perform feature selection subteps`, async () => {
        await pages.build.performFeatureSelectionSubsteps();
        await pages.build.waitForPcLoaded();
      });
      await test.step(`Select any available colors`, async () => {
        await pages.build.clickSnoColorItems();
      });
      await test.step(`Click footer next`, async () => {
        await pages.build.clickFooterNextBtn();
      });
      await test.step(`Perform option selection subteps`, async () => {
        await pages.build.performOptionSelectionSubsteps();
        await pages.build.waitForPcLoaded();
      });
      await test.step(`Add accessory`, async () => {
        accessoryAdded = await pages.build.carousel.addAccessory();
      });
      await test.step(`Navigate to build quote and submit form`, async () => {
        await pages.build.openBuildSummaryAndClickImFinished();
        await pages.quote.enterFormDetailsAndSubmit();
      });
      await test.step(`Verify confirmation page details`, async () => {
        expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
      `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
  
        expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();  
      });
    });
  }

  for (const locale of testConfig.domesticLocales.cmv) {
    test(`${TEST_RAIL_IDS.cmv[locale]} Verify cmv build submission for ${locale} @regression`, async ( { pages } ) => {
      let accessoryAdded;
      await test.step(`Navigate to commercial start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.cmv, locale);
      });
      await test.step(`Click seat category`, async () => {
        await pages.build.clickAnySeatCategory();
      });
      await test.step(`Click model category`, async () => {
        await pages.build.clickAnyModelCategory();
      });
      await test.step(`Click trim`, async () => {
        await pages.build.clickAnyTrim();
        await pages.build.waitForPcLoaded();
      });
      await test.step(`Click any color item if present`, async () => {
        await pages.build.clickCmvAnyColorItem();
      });
      await test.step(`Perform option selection substeps`, async () => {
        await pages.build.performOptionSelectionSubsteps();
        await pages.build.waitForPcLoaded();
      });
      await test.step(`Add accessory`, async () => {
        accessoryAdded = await pages.build.carousel.addAccessory();
      });
      await test.step(`Navigate to build quote and submit form`, async () => {
        await pages.build.openBuildSummaryAndClickImFinished();
        await pages.quote.enterCmvFormDetailsAndSubmit();
      });
      await test.step(`Verify confirmation page details`, async () => {
        expect(await pages.confirmation.verifyIfProductPresent(accessoryAdded), 
      `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();
  
        expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
      });
    }); 
  }

  test(`C17826797 Verify mil build submission @regression`, async ( { pages } ) => {
    let accessoryAdded;
    await test.step(`Navigate to military start build page`, async () => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.mil);
    });
    await test.step(`Click any military category`, async () => {
      await pages.build.clickAnyCategory();
    });
    await test.step(`Click any military brand`, async () => {
      await pages.build.clickAnyMilBrand();
    });
    await test.step(`Click any military model category`, async () => {
      await pages.build.clickMilModelCategory();
    });
    await test.step(`Click any military trim`, async () => {
      await pages.build.clickAnyTrim();
    });
    await test.step(`Click any color item`, async () => {
      await pages.build.clickAnyColorItem();
    });
    await test.step(`Click footer next button`, async () => {
      await pages.build.clickFooterNextBtn();
      await pages.build.waitForPcLoaded();
    });
    await test.step(`Add accessory`, async () => {
      accessoryAdded = await pages.build.carousel.addAccessory();
    });
    await test.step(`Navigate to build quote and submit form`, async () => {
      await pages.build.openBuildSummaryAndClickImFinished();
      await pages.quote.enterMilFormDetailsAndSubmit();
    });
    await test.step(`Verify confirmation page details`, async () => {
      expect(await pages.confirmation.verifyIfProductNoPricingPresent(accessoryAdded), 
    `Accessory ${accessoryAdded.title} was not found on confirmation page`).toBeTruthy();

      expect(await pages.confirmation.verifyDuplicateItems(), 'Duplicate items were present').toBeFalsy();
    });    
  });

  for (const locale of testConfig.domesticLocales.ben) {
    test(`${TEST_RAIL_IDS.ben[locale]} Verify ben build submission for ${locale} @regression`, async ( { pages } ) => {

      let modelId;
      let items;
      await test.step(`Navigate to ben start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.ben, locale);
      });
      await test.step(`Select any available layout item`, async () => {
        await pages.build.selectBenCategoryWithLayoutAvailable();
      });
      await test.step(`Click footer next button`, async () => {
        await pages.build.clickFooterNextBtn();
      });
      await test.step(`Open build summary and get summary items and model id`, async () => {
        await pages.build.openSummary();
        modelId = await pages.build.getJsModelId();
        items = await pages.build.summary.getBuildSummaryItemDescriptions();
      });
      await test.step(`Click I am Finished and fill quote form`, async () => {
        await pages.build.clickIamFinishedBtn();
        await pages.quote.enterBenFormDetailsAndSubmit();
      });    
      await test.step(`Verify confirmation page details`, async () => {
        await pages.confirmation.verifyBuildItemsPresentOnConfirmation(items);
      });
    }); 
  }

  for (const locale of testConfig.domesticLocales.gdy) {
    test(`${TEST_RAIL_IDS.gdy[locale]} Verify gdy build submission for ${locale} @regression`, async ( { pages } ) => {
      let modelId;
      let items;
      await test.step(`Navigate to gdy start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.gdy, locale);
      });
      await test.step(`Click godfrey boat series`, async () => {
        await pages.build.clickGdyBoatSeries('Sanpan');
      });
      await test.step(`Perform boat feature selections`, async () => {
        await pages.build.performFeatureDefaultSelections();
      });
      await test.step(`Click any available furniture layout`, async () => {
        await pages.build.clickGdyHurAvailableLayoutItem();
      });
      await test.step(`Click footer next button`, async () => {
        await pages.build.clickFooterNextBtn();
      });
      await test.step(`Open build summary and get summary items and model id`, async () => {
        await pages.build.openSummaryGdy();
        modelId = await pages.build.getJsModelId();
        items = await pages.build.summary.getBuildSummaryItemDescriptions();
      });
      await test.step(`Click I am Finished and fill quote form`, async () => {
        await pages.build.clickIamFinishedBtn();
        await pages.quote.enterGdyFormDetailsAndSubmit();
      });    
      await test.step(`Verify confirmation page details`, async () => {
        await pages.confirmation.verifyBuildItemsPresentOnConfirmation(items);
      });
    }); 
  }

  for (const locale of testConfig.domesticLocales.hur) {
    test(`${TEST_RAIL_IDS.hur[locale]} Verify hur build submission for ${locale} @regression`, async ( { pages } ) => {
      await test.step(`Navigate to hurricane ${locale} start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.hur, locale);
      });
      await test.step('Click hurricane boat series category', async () => {
        await pages.build.clickHurBoatSeries('SunDeck Series');
      });
      await test.step('Click hurricane model', async () => {
        await pages.build.clickHurModelCategory('SunDeck OB');
      });
      await test.step('Click any available layout item', async () => {
        await pages.build.clickGdyHurAvailableLayoutItem();
      });
      await test.step('Click footer button', async () => {
        await pages.build.clickFooterNextBtn(); 
      });
      await test.step(`Open build summary and click I am Finished`, async () => {
        await pages.build.openSummaryHur();
      await pages.build.clickIamFinishedBtn();
      });
      await test.step(`Fill quote form details and submit`, async () => {
        await pages.quote.enterHurFormDetailsAndSubmit();
      });
    }); 
  }


  /* test.afterEach(async({ pages }) => {
    const errors = pages.pageConsoleErrors;
    expect.soft(pages.pageConsoleErrors, 'Console errors thrown').toStrictEqual([]);
  }); */

  
  