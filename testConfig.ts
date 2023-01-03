import config from "playwright.config";
import * as configFiles from './configFiles'


export const testConfig = 
process.env.ENV === `qa` ? configFiles.qaConfig :
process.env.ENV === `prod` ? configFiles.prodConfig : configFiles.qaConfig;