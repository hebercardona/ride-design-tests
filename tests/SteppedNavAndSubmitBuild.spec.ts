import { expect, test } from "@framework/BaseTest"
import { Brands } from "@framework/Brands";
import { testConfig } from "@testConfig";


  for (const brand of Brands.orv) {
    for (const locale of testConfig.domesticLocales[brand]) {
      test(`@regression Verify ${brand} ${locale} stepped process and build submission`, async ( { pages } ) => {

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
    test(`@regression Verify ind build submission for ${locale}`, async ( { pages } ) => {
      let accessoryAdded;
      await test.step(`Navigate to indian start build page`, async () => {
        await pages.navigation.navigateToStartingBuildUrl(Brands.ind);
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

  test(`@regression Verify slg build submission`, async ( { pages } ) => {
    let accessoryAdded;
    await test.step(`Navigate to slingshot start build page`, async () => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.slg);
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

  test(`@regression Verify sno build submission`, async ( { pages } ) => {
    let accessoryAdded;
    await test.step(`Navigate to snow start build page`, async () => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.sno);
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

  test(`@regression Verify cmv build submission`, async ( { pages } ) => {
    let accessoryAdded;
    await test.step(`Navigate to commercial start build page`, async () => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.cmv);
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

  test(`@regression Verify mil build submission`, async ( { pages } ) => {
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

  test(`@regression Verify ben build submission`, async ( { pages } ) => {

    let modelId;
    let items;
    await test.step(`Navigate to ben start build page`, async () => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.ben);
    });
    await test.step(`Click ben boat series`, async () => {
      await pages.build.clickBenBoatSeries('R Series');
    });
    await test.step(`Click ben model category`, async () => {
      await pages.build.clickBenModelCategory('R Line');
    });
    await test.step(`Click any available furniture layout`, async () => {
      await pages.build.clickAvailableLayoutItem();
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

  test(`@regression @gdy Verify gdy build submission`, async ( { pages } ) => {
    let modelId;
    let items;
    await test.step(`Navigate to gdy start build page`, async () => {
      await pages.navigation.navigateToStartingBuildUrl(Brands.gdy);
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

  for (const locale of testConfig.domesticLocales.hur) {
    test(`@regression @hur Verify hur build submission for ${locale}`, async ( { pages } ) => {
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

  
  