import { test, expect, request } from '@playwright/test';
import axios from 'axios';
import { BuildPage } from '../pageFactory/pageRepository/BuildPage';
import * as fs from 'fs';
import TestRailApi from '../reporters/testRail/testRailApi';
import { testConfig } from '@testConfig/';
import testRailReporter from 'reporters/testRail/testRailReporter';

let responseBody = {
    seoCategoryPage: {
      Title: "",
      Description: "",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoModelPage: {
      Title: "Prueba",
      Description: "Select a Polaris RZR SxS to customize: Add roofs, tires, wheels, panels, door, storage and more to build an off-road vehicle that is right for you.",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoBrandPage: {
      Title: "",
      Description: "",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoTrimPage: {
      Title: "Build a Polaris RZR",
      Description: "",
      NoIndex: true,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoColorPage: {
      Title: "Choose color - Polaris {DisplayName}",
      Description: "",
      NoIndex: true,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoPackagePage: {
      Title: "Choose package - Polaris {DisplayName}",
      Description: "",
      NoIndex: true,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoConfiguratorPage: {
      Title: "Add Accessories: Polaris {DisplayName}",
      Description: "",
      NoIndex: true,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoLayoutPage: {
      Title: "",
      Description: "",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoTrackPage: {
      Title: "",
      Description: "",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoEnginePage: {
      Title: "",
      Description: "",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    seoOptionPage: {
      Title: "",
      Description: "",
      NoIndex: false,
      CanonicalUrl: "https://rzr.polaris.com/en-us/api/configurator/settings",
      OpenGraphImage: null
    },
    cpqUIPath: "https://cdn2.polaris.com/cpqui/v3",
    cpqHomePageUrl: "/en-us/build-model/",
    cpqBuildQuotePageUrl: "/en-us/build-quote/",
    cpqExitPageUrl: "/en-us/",
    cpqPreviousYear: "2022",
    cpqPreviousYearHomePageUrl: "/en-us/2022/build-model/",
    cpqCurrentYear: "2023",
    cpqCurrentYearHomePageUrl: "/en-us/build-model/",
    productLineCode: "rzr",
    currentYear: "2023",
    isDealerEnabled: false,
    dealerId: null,
    userIPAddress: "189.219.248.7, 10.224.3.205",
    cpqRenderUnavailableRedirectUrl: null,
    cpqAddExternalBuildToBuildQuoteParameters: false,
    settingsFromPage: {
      userAgent: "playwright/1.27.1 (x64; windows 10.0) node/16.17",
      env: "prod",
      ccn: "en-us",
      browser: {
        name: "unknown",
        version: "0.0"
      },
      customerFirstName: "",
      flyoutEnabled: false,
      flyoutHtml: null,
      categoryShouldBeExpanded: false,
      paymentCalculatorAvailable: true,
      paymentCalculatorDefaultInterestRate: 7.49,
      paymentCalculatorDefaultLoanTerm: 72,
      paymentCalculatorDefaultDownPayment: 0.15,
      iosSupportVersion: 11,
      showSnapshot: true,
      showPOV: true,
      quotePageOverride: null,
      showPreviousYearRetailExpereince: true,
      hideModelSelectionDropDownMenu: false,
      snowCheckModelMessage: null,
      infoTimeout: 120000,
      polarisBrandLogo: "https://cdn1.polaris.com/globalassets/rzr/polaris_rzr_nopolaris_blk.png?v=6ab97ac6",
      cpqUseSubstepProcess: false,
      showOptionPricing: false,
      cpqBuildSummaryTitle: null,
      cpqBuildSummaryClose: null,
      cpqBuildSummaryAsConfiguredClose: null,
      cpqBuildSummaryFreePrice: null,
      cpqBuildSummaryOptions: null,
      cpqBuildSummaryAccessories: null,
      cpqBuildSummaryAddAdditionalAccessories: null,
      cpqBuildSummaryAdditionalCost: null,
      cpqBuildSummaryFreightPrice: null,
      cpqBuildSummaryModelAdditionalInformation: null,
      cpqShowBuildSummaryFreightPrice: false,
      cpqRestartBuildRestartButton: null,
      cpqRestartBuildCancelButton: null,
      cpqRestartBuildSaveButton: null,
      cpqRestartBuildSaveDisabled: true,
      cpqDisableUserSave: false,
      cpqDisableAsConfigured: false,
      cpqUseAltColorPage: false,
      cpqAltColorCategoryLevel: null,
      cpqHideTrimSpecs: false,
      cqpDisableSignIn: false,
      cpqHeaderMenuLinks: null,
      cpqRestartBuildTitle: null,
      cpqRestartBuildMessage: null,
      navigationItems: null,
      substepModelOptions: null,
      categoryGroups: null,
      shareCaption: "Check out my custom RZR",
      shareBody: "I just designed a custom RZR! You can view it here:{newLine}{0}{newLine}{newLine}Build your own here:{newLine}{1}",
      queryParamToQuotePageMappings: [],
      cpqCategoryToPreload: null,
      cpqHideProductIds: false,
      cpqHidePrice: false,
      pricingDisclaimer: "<p>Manufacturer&rsquo;s suggested retail price (MSRP) subject to change. The current MSRP is valid until 12/31/2022. MSRP also excludes destination and handling fees, tax, title, license and registration. Dealer prices may vary. Logistics surcharge of $500 will apply. Plus destination charge and set-up. May be shown with additional modifications or accessories.</p>",
      cpqDisableDiscountPrices: false,
      useSiteWholegoodProductLayout: false,
        ModelHeading: "Titulo con Mock",
        ItemSelectionText: "Select Seats",
        ItemSelectionItemsSuffix: null,
        ModelSelectionDefaultText: "TO GET STARTED BUILDING YOUR <i>RZR</i><sup>®</sup>, PLEASE SELECT SEAT OPTIONS.",
        ErrorCodes: [
          {
            Key: "CPQCOREE300",
            Title: "Your browser is missing support for WebGL",
            Body: "<div>WebGL support is necessory for your browser to render Polaris 3D Configurator. Unforunately your browser is missing WebGL support. Please select an item below to troubleshoot this problem:</div>\n<br />\n<section class=\"toggle\"><input id=\"pcdesktop\" type=\"checkbox\" /> <label for=\"pcdesktop\">I am on a Windows Desktop</label>\n<div class=\"expand\">Please make sure you are using Windows 7 or newer. Also please make sure to use latest version of your browser. Please refer to Microsoft for latest operating system and your browser manufacturer for the latest download.</div>\n</section>\n<section class=\"toggle\"><input id=\"macdesktop\" type=\"checkbox\" /> <label for=\"macdesktop\">I am on a Mac</label>\n<div class=\"expand\">Please make sure you are using macOS Sierra or newer. Also please make sure to use latest version of your browser. Please refer to Apple for latest operating system and your browser manufacturer for the latest download.</div>\n</section>\n<section class=\"toggle\"><input id=\"ios\" type=\"checkbox\" /> <label for=\"ios\">I am on an iPhone/iPad</label>\n<div class=\"expand\">Please make sure you are using iOS 10 or newer. If you are not using Safari browser then please update the browser to the latest version. You can download latest iOS version from Settings. You can update your third party browser by going in to App Store.</div>\n</section>\n<section class=\"toggle\"><input id=\"andriod\" type=\"checkbox\" /> <label for=\"andriod\">I am on an Android Phone/Tablet</label>\n<div class=\"expand\">Please make sure you are using Android 8 or newer. If you are not using Chrome browser then please update the browser to the latest version. You can update your Android version by going in to Settings menu. You can update your third party browser by going in to Play Store.</div>\n</section>"
          }
        ]
      },
      cpqLeadTypes: {
        Enabled: false,
        Types: null,
        Header: null,
        SubHeader: null,
        LocalPriceDisplayNameOverride: null,
        LocalPriceTooltipOverride: null,
        LocalPriceIconOverride: null
      },
      cpqFooterQuoteCTACopy: null,
      cpqFooterPolarisBrandLogo: null,
      cpqPurposePrompt: {
        purposePromptEnabled: false,
        Header: "What are you looking to do?",
        Options: [
          {
            Enabled: true,
            Id: "new-vehicle",
            Icon: "1086156",
            IconURL: "https://cdn1.polaris.com/globalassets/common/cpq/purposeprompticons/icons_rzr---new.svg?v=8b7de5df",
            DisplayName: "Build a New Ride",
            Action: [],
            ActionString: null
          },
          {
            Enabled: true,
            Id: "current-vehicle",
            Icon: "1086155",
            IconURL: "https://cdn1.polaris.com/globalassets/common/cpq/purposeprompticons/icons_rzr---custom.svg?v=8b7de5af",
            DisplayName: "Customize a Ride I Own",
            Action: [
              1776
            ],
            ActionString: "RedirectToEcomMode"
          }
        ]
      },
      cpqActionCards: {
        Enabled: true,
        ActionCards: [
          {
            CardType: "RedirectCard",
            Enabled: true,
            Position: "bottom",
            Title: "Help Me Choose",
            DisplayingPage: null,
            Description: "We can help you choose an off-road vehicle to fit your needs.",
            Additional: null,
            SubTitle: null,
            RedirectOrVideoUrl: null,
            IconUrl: "https://cdn1.polaris.com/globalassets/orv/2022/model/model-pages/help-me-choose-icon.png?v=95b13f27",
            EventAction: "Help Me Choose",
            BackgroundColor: null,
            ForegroundColor: null,
            OpenOnType: null
          }
        ]
      },
      kenectIntegration: {
        enabled: false,
        scriptUrl: null,
        widgetId: null,
        contactDealerCopy: null
      },
      inventoryStatusSettings: {
        enabled: false,
        settingsList: null
      },
      buildPageCanvasToast: {
        enabled: false,
        text: null,
        toastTimeout: 6000
      }
    }

test.skip('Api Test', async ( {page} ) => {
    let build = new BuildPage(page);
    let buf = Buffer.from(JSON.stringify(responseBody));
    
    
    
    const apiContext = await request.newContext();
    const apiResponse = await apiContext.get('https://rzr.polaris.com/en-us/api/configurator/settings?productLineCode=rzr')
    /* await page.route('https://rzr.polaris.com/en-us/api/configurator/settings', 
    route => route.fulfill({ path: './body.json' })); */
    await page.route('**/*', route => {
        console.log(route.request().url());
        return route.continue();
    });
    
    await page.route('https://rzr.polaris.com/en-us/api/configurator/settings?productLineCode=rzr', 
    async route => {
        route.fulfill({ path: 'body.json'});
    });
    await page.goto('https://rzr.polaris.com/en-us/build-model/');
    await build.clickAnySeatCategory();
    await build.clickAnyModelCategory();
    await build.clickAnyTrim();
    await build.clickFooterNext();
    await page.pause();

    expect(apiResponse.status() === 200).toBeTruthy();

  });

  test.skip('Test Rail', async () => {
    const base = '';
    const url = 'https://ridecommand.testrail.io/index.php?/api/v2/';
    const headersLocal: any = {};
    //const usernamel = 'heber.cardona@polaris.com';
    //const passwordl = 'Flowers2012';
    const usernamel = testConfig.testRailUserName;
    const passwordl = testConfig.testRailPassword;
    const headers: any = {};

    const btoa = (str: string) => Buffer.from(str).toString('base64');
    const credentialsBase64 = btoa(`${usernamel}:${passwordl}`);

    const apiContext = await request.newContext({
      baseURL: url,
      extraHTTPHeaders: {
        'Authorization': `Basic ${credentialsBase64}`
      }
    });

    const respuesta = await apiContext.get('./index.php?/api/v2/get_projects/');
    const estatus = respuesta.status();
    const contenido = respuesta.body();
    const suites = await apiContext.get('./index.php?/api/v2/get_suites/31');
    let obj: MyObj [] = JSON.parse(await suites.text());

    console.log('Serialized obj: ' + obj[0].id);
    const id = obj.find(x => {
      return x.name === 'Smoke Tests';
    }).id;
    
    const dataj = {
      "suite_id": id,
      "name": 'Test Run Test'
    };

    const run = await apiContext.post('./index.php?/api/v2/add_run/31', {data: dataj})
    
    const http = axios.create({
      baseURL: url,
      auth: {
        username: usernamel,
        password: passwordl
      },
      headers: { 'Content-Type': 'application/json' },
    });
    const uri = http.getUri();
    const response = await http.get('/get_projects/', {timeout: 3000});
    const suitesAxios = await http.get('get_suites/');
    const suites_axios_data = suitesAxios.data;
    console.log(response.status);
    console.log(response.data);

    const axios_suites = await http.get('/get_suites/31');
    
  });

  interface MyObj {
    id: number
    name: string
  }


  function base64(string: string) {
    if (typeof btoa !== 'undefined') {
      return btoa(string);
    } else {
      return Buffer.from(string).toString('base64');
    }
  }

  test.skip('Data set', async () => {
    let data = fs.readFileSync('./test-results.json', 'utf8');
    let results = JSON.parse(data);
    console.log(results.suites[0].specs[0].tests.length);
  }); 

  test('Reporter', async () => {
    const projects = await TestRailApi.getProjects();
    const suiteId = await TestRailApi.getSuiteId('Playwright');
    await TestRailApi.addTestRun(suiteId, 'Playwright Run');
    const runId = await TestRailApi.getRunId('Playwright Run', suiteId);
    const tests = await TestRailApi.getTests(runId);
   });

   test('Reporter Results', async () => {
    const projects = await TestRailApi.getProjects();
    const suiteId = await TestRailApi.getSuiteId('Playwright');
   });

   test('C15432126 Reporter Results', async () => {
    const projects = await TestRailApi.getProjects();
    const suiteId = await TestRailApi.getSuiteId('Playwright');
    
   });