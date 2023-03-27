import ApiData from "@framework/ApiData";
import { test, expect } from "@framework/BaseTest";
import { Brands } from "@framework/Brands";
import { Common } from "@framework/Common";
import SqlHelper from "@framework/SqlClient";
import { pages } from "@pages/BasePage";
import { Page, TestInfo } from "@playwright/test";
import { testConfig } from "@testConfig";
import { getComparator } from 'playwright-core/lib/utils';
const comparator = getComparator('image/png');


for (const brand of Brands.orv) {
    test(`Verify ${brand} build load works as expected for any domestic locale @regression`, async( {pages}, testInfo ) => {
        const locale = Common.getAnyValueFromArray(testConfig.domesticLocales[brand]);
        await test.step(`Navigate to any ${brand} ${locale} build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, brand);
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    });   
}


for (const locale of testConfig.domesticLocales.rzr) {
    test(`Verify rzr build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rzr ${locale} build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'rzr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.rzr) {
    test(`Verify rzr build load works as expected for previous year domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rzr ${locale} previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'rzr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.internationalLocales.rzr) {
    test(`Verify rzr build load works as expected for international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rzr ${locale} international build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'rzr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.previousYearInternationalLocales.rzr) {
    test(`Verify rzr build load works as expected for previous year international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rzr ${locale} international previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'rzr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.rgr) {
    test(`Verify rgr build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rgr ${locale} build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'rgr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.rgr) {
    test(`Verify rgr build load works as expected for previous year domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any previous year rgr ${locale} build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'rgr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.internationalLocales.rgr) {
    test(`Verify rgr build load works as expected for international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rgr ${locale} international build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'rgr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.previousYearInternationalLocales.rgr) {
    test(`Verify rgr build load works as expected for previous year international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any rgr ${locale} international previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'rgr');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.atv) {
    test(`Verify atv build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any atv ${locale} build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'atv');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.atv) {
    test(`Verify atv build load works as expected for previous year domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any atv previous year ${locale} build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'atv');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.internationalLocales.atv) {
    test(`Verify atv build load works as expected for international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any atv ${locale} international build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'atv');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.previousYearInternationalLocales.atv) {
    test(`Verify atv build load works as expected for previous year international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any atv ${locale} international previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'atv');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.grl) {
    test(`Verify grl build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any grl ${locale} build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'grl');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.grl) {
    test(`Verify grl build load works as expected for previous year domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any grl ${locale} previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'grl');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.internationalLocales.grl) {
    test(`Verify grl build load works as expected for international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any grl ${locale} international build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'grl');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.previousYearInternationalLocales.grl) {
    test(`Verify grl build load works as expected for previous year international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any grl ${locale} previous year international build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'grl');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.ind) {
    test(`Verify ind build load works as expected for domestic ${locale} @buildLoadInd`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any ind ${locale} build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'ind');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.ind) {
    test(`Verify ind build load works as expected for previous year domestic ${locale} @buildLoadInd`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any ind ${locale} previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'ind');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.internationalLocales.ind) {
    test(`Verify ind build load works as expected for international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any ind ${locale} international build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'ind');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.previousYearInternationalLocales.ind) {
    test(`Verify ind build load works as expected for previous year international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any ind ${locale} international previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'ind');
            await pages.navigation.navigateToUrl(url);
            await pages.build.modals.clickPurposePromptNewVehicle();
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.mil) {
    test(`Verify mil build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to any ${locale} military build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'mil');
            await pages.navigation.navigateToUrl(url);
            await pages.build.waitForPcLoaded();
        });
        await buildLoadTestSteps(pages, testInfo);
    })
}

for (const locale of testConfig.domesticLocales.cmv) {
    test(`Verify commercial build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to ${locale} commercial start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('cmv', locale);
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
          await buildLoadTestStepsSummaryOptions(pages, testInfo);
    });
}

for (const locale of testConfig.domesticLocales.sno) {
    test(`Verify snow build load works as expected for domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to ${locale} sno build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'sno');
            await pages.navigation.navigateToUrl(url);
        });
        await test.step(`Click footer next`, async () => {
            await pages.build.waitForPcLoaded();
            await pages.build.clickFooterNextBtn();
          });
        await test.step(`Perform option selection subteps`, async () => {
            await pages.build.performOptionSelectionSubsteps();
            await pages.build.waitForPcLoaded();
          });
        await buildLoadTestStepsSummaryOptions(pages, testInfo);
    });
}

for (const locale of testConfig.domesticLocales.sno) {
    test(`Verify snow build load works as expected for previous year domestic ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to ${locale} sno previous year build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'sno');
            await pages.navigation.navigateToUrl(url);
        });
        await test.step(`Click footer next`, async () => {
            await pages.build.waitForPcLoaded();
            await pages.build.clickFooterNextBtn();
          });
        await test.step(`Perform option selection subteps`, async () => {
            await pages.build.performOptionSelectionSubsteps();
            await pages.build.waitForPcLoaded();
          });
        await buildLoadTestStepsSummaryOptions(pages, testInfo);
    });
}


for (const locale of testConfig.internationalLocales.sno) {
    test(`Verify snow build load works as expected for international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to ${locale} sno build url`, async() => {
            const url = await ApiData.getApiBuildUrl(locale, 'sno');
            await pages.navigation.navigateToUrl(url);
        });
        await test.step(`Click footer next`, async () => {
            await pages.build.waitForPcLoaded();
            await pages.build.clickFooterNextBtn();
          });
        await test.step(`Perform option selection subteps`, async () => {
            await pages.build.performOptionSelectionSubsteps();
            await pages.build.waitForPcLoaded();
          });
        await buildLoadTestStepsSummaryOptions(pages, testInfo);
    });
}

for (const locale of testConfig.previousYearInternationalLocales.sno) {
    test(`Verify snow build load works as expected for previous year international ${locale} @buildLoad`, async( {pages}, testInfo ) => {
        await test.step(`Navigate to previous year ${locale} sno build url`, async() => {
            const url = await ApiData.getApiPreviousYearBuildUrl(locale, 'sno');
            await pages.navigation.navigateToUrl(url);
        });
        await test.step(`Click footer next`, async () => {
            await pages.build.waitForPcLoaded();
            await pages.build.clickFooterNextBtn();
          });
        await test.step(`Perform option selection subteps`, async () => {
            await pages.build.performOptionSelectionSubsteps();
            await pages.build.waitForPcLoaded();
          });
        await buildLoadTestStepsSummaryOptions(pages, testInfo);
    });
}


for (const locale of testConfig.domesticLocales.ben) {
    test(`Verify bennington build load works as expected for domestic ${locale} @buildLoad`, async ( { pages }, testInfo ) => {
        let loadUrl;
        let beforeImg;
        let afterImg;
        let summaryItems;
        await test.step(`Navigate to ben ${locale} start build page`, async () => {
            await pages.navigation.navigateToStartingBuildUrl('ben', locale);
        });
        await test.step(`Select any available layout item`, async () => {
            await pages.build.selectBenCategoryWithLayoutAvailable();
          });
        await test.step(`Click footer next button`, async () => {
            await pages.build.clickFooterNextBtn();
        });
        await test.step(`Open build summary and get summary items and model id`, async () => {
            await pages.build.openSummary();
            summaryItems = await pages.build.summary.getBuildSummaryItemDescriptions();
            beforeImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_before.png`});
        });
        await test.step(`Click I am Finished to get to build quote page`, async () => {
            await pages.build.clickIamFinishedBtn();
        });    
        await test.step('Get submissionID from url and get load url from database', async() => {
            const buildId = Common.getBuildIdFromQuoteUrl(pages.page.url());
            const loadUrlQuery = await SqlHelper.executeQuery(`select LoadUrl from ConfiguredWholegoods where BuildID = '${buildId}'`);
            loadUrl = loadUrlQuery.recordset[0].LoadUrl;
        });
        await test.step('Navigate to load url and verify response is successful', async() => {
            await pages.navigation.navigateToUrl(loadUrl);
            await pages.build.waitForPcLoaded();
        });
        await test.step('Open build summary and take snapshot after load url loaded', async() => {
            expect(await pages.build.modals.isNoModelDialogPresent(), 'No model dialog should not be present').toBeFalsy();
            await pages.build.openSummary();
            await pages.build.summary.verifyBuildItemsPresentOnSummary(await summaryItems);
            afterImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_after.png`})
        });
        await test.step('Compare build summary snapshots', async() => {
            expect(comparator(beforeImg, afterImg)).toBeNull();
        });
      });
}

for (const locale of testConfig.domesticLocales.hur) {
    test(`Verify hurricane build load works as expected for domestic ${locale} @buildLoad`, async ( { pages }, testInfo ) => {
        let loadUrl;
        let beforeImg;
        let afterImg;
        let summaryItems;
        await test.step(`Navigate to hurricane ${locale} start build page`, async () => {
          await pages.navigation.navigateToStartingBuildUrl('hur', locale);
        });
        await test.step(`Select any available layout item`, async () => {
            await pages.build.selectHurricaneCategoryWithLayoutAvailable();
          });
        await test.step(`Click footer next button`, async () => {
          await pages.build.clickFooterNextBtn();
        });
        await test.step(`Open build summary and get summary items and model id`, async () => {
            await pages.build.openSummary();
            summaryItems = await pages.build.summary.getBuildSummaryItemDescriptions();
            beforeImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_before.png`});
        });
        await test.step(`Click I am Finished to get to build quote page`, async () => {
          await pages.build.clickIamFinishedBtn();
        });    
        await test.step('Get submissionID from url and get load url from database', async() => {
            const buildId = Common.getBuildIdFromQuoteUrl(pages.page.url());
            const loadUrlQuery = await SqlHelper.executeQuery(`select LoadUrl from ConfiguredWholegoods where BuildID = '${buildId}'`);
            loadUrl = loadUrlQuery.recordset[0].LoadUrl;
        });
        await test.step('Navigate to load url and verify response is successful', async() => {
            await pages.navigation.navigateToUrl(loadUrl);
            await pages.build.waitForGdyHurricaneCanvas();
        });
        await test.step('Open build summary and take snapshot after load url loaded', async() => {
            expect(await pages.build.modals.isNoModelDialogPresent(), 'No model dialog should not be present').toBeFalsy();
            await pages.build.openSummary();
            await pages.build.summary.verifyBuildItemsPresentOnSummary(await summaryItems);
            afterImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_after.png`})
        });
        await test.step('Compare build summary snapshots', async() => {
            expect(comparator(beforeImg, afterImg)).toBeNull();
        });
      });
}

for (const locale of testConfig.domesticLocales.gdy) {
    test(`Verify godfrey build load works as expected for domestic ${locale} @buildLoad`, async ( { pages }, testInfo ) => {
        let loadUrl;
        let beforeImg;
        let afterImg;
        let summaryItems;
        await test.step(`Navigate to godfrey ${locale} start build page`, async () => {
          await pages.navigation.navigateToStartingBuildUrl('gdy', locale);
        });
        await test.step(`Select any available layout item`, async () => {
            await pages.build.selectGodfreyCategoryWithLayoutAvailable();
          });
          await test.step(`Click footer next button`, async () => {
              await pages.build.clickFooterNextBtn();
            });
          await test.step(`Open build summary and get summary items and model id`, async () => {
              await pages.build.openSummaryGdy();
              summaryItems = await pages.build.summary.getBuildSummaryItemDescriptions();
              beforeImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_before.png`});
          });
          await test.step(`Click I am Finished to get to build quote page`, async () => {
              await pages.build.clickIamFinishedBtn();
          });    
          await test.step('Get submissionID from url and get load url from database', async() => {
              const buildId = Common.getBuildIdFromQuoteUrl(pages.page.url());
              const loadUrlQuery = await SqlHelper.executeQuery(`select LoadUrl from ConfiguredWholegoods where BuildID = '${buildId}'`);
              loadUrl = loadUrlQuery.recordset[0].LoadUrl;
          });
          await test.step('Navigate to load url and verify response is successful', async() => {
              await pages.navigation.navigateToUrl(loadUrl);
              await pages.build.waitForGdyHurricaneCanvas();
          });
          await test.step('Open build summary and take snapshot after load url loaded', async() => {
              expect(await pages.build.modals.isNoModelDialogPresent(), 'No model dialog should not be present').toBeFalsy();
              await pages.build.openSummaryGdy();
              await pages.build.summary.verifyBuildItemsPresentOnSummary(await summaryItems);
              afterImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_after.png`})
          });
          await test.step('Compare build summary snapshots', async() => {
              expect(comparator(beforeImg, afterImg)).toBeNull();
          });
      });   
}

const buildLoadTestSteps = async (pages: pages, testInfo: TestInfo) => {
    let beforeImg;
    let afterImg;
    let loadUrl;
    await test.step('Open build summary and take snapshot for further validation', async() => {
        await pages.build.openSummary();
        beforeImg = await  (await pages.build.summary.getBuildsummaryDialogElement()).screenshot({path: `screenshots/${testInfo.title}_before.png`});
    });
    await test.step('Click I am Finished to get to build quote page', async() => {
        await pages.build.clickIamFinishedBtn();
    });
    await test.step('Get submissionID from url and get load url from database', async() => {
        const buildId = Common.getBuildIdFromQuoteUrl(pages.page.url());
        const loadUrlQuery = await SqlHelper.executeQuery(`select LoadUrl from ConfiguredWholegoods where BuildID = '${buildId}'`);
        loadUrl = loadUrlQuery.recordset[0].LoadUrl;
    });
    await test.step('Navigate to load url and verify response is successful', async() => {
        await pages.navigation.navigateToUrl(loadUrl);
        await pages.build.modals.clickPurposePromptNewVehicle();
        await pages.build.waitForPcLoaded();
    });
    await test.step('Open build summary and take snapshot after load url loaded', async() => {
        await pages.build.openSummary();
        afterImg = await  (await pages.build.summary.getBuildsummaryDialogElement()).screenshot({path: `screenshots/${testInfo.title}_after.png`})
    });
    await test.step('Compare build summary snapshots', async() => {pages.page
        expect(comparator(beforeImg, afterImg)).toBeNull();
    });
}

const buildLoadTestStepsSummaryOptions = async (pages: pages, testInfo: TestInfo) => {
    let beforeImg;
    let afterImg;
    let loadUrl;
    let summaryItems;
    await test.step('Open build summary and take snapshot for further validation', async() => {
        await pages.build.openSummary();
        summaryItems = await pages.build.summary.getBuildSummaryItemDescriptions();
        beforeImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_before.png`});
    });
    await test.step('Click I am Finished to get to build quote page', async() => {
        await pages.build.clickIamFinishedBtn();
    });
    await test.step('Get submissionID from url and get load url from database', async() => {
        const buildId = Common.getBuildIdFromQuoteUrl(pages.page.url());
        const loadUrlQuery = await SqlHelper.executeQuery(`select LoadUrl from ConfiguredWholegoods where BuildID = '${buildId}'`);
        loadUrl = loadUrlQuery.recordset[0].LoadUrl;
    });
    await test.step('Navigate to load url and verify response is successful', async() => {
        await pages.navigation.navigateToUrl(loadUrl);
        await pages.build.modals.clickPurposePromptNewVehicle();
        await pages.build.waitForPcLoaded();
    });
    await test.step('Open build summary and take snapshot after load url loaded', async() => {
        await pages.build.openSummary();
        await pages.build.summary.verifyBuildItemsPresentOnSummary(await summaryItems);
        afterImg = await  (await pages.build.summary.getSummaryVehicleSectionElement()).screenshot({path: `screenshots/${testInfo.title}_after.png`})
    });
    await test.step('Compare build summary snapshots', async() => {pages.page
        expect(comparator(beforeImg, afterImg)).toBeNull();
    });
}