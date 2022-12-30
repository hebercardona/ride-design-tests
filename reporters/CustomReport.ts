import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";
import rimraf from 'rimraf';
const winston = require(`winston`);
import * as fs from 'fs';
import TestRailReporter from './testRail/TestRailReporter';

let logger;
let obj = {
    results: [

    ]
};

const rmLogger = new Promise(resolve => {
    rimraf(`./logs`, resolve);
});

rmLogger.then(() => {
    const console = new winston.transports.Console();
    logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      // - Write all logs with importance level of `info` or less than it
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    ],
  });

  // Writes logs to console
  logger.add(console);
});

const testRailResults = new Promise(resolve => {
    fs.rm(`./reporters/testRailResults.json`, resolve)
}).then(() => {
    fs.openSync(`./reporters/testRailResults.json`, 'w');
});

let regex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

export default class CustomReport implements Reporter {

    onTestBegin(test: TestCase): void {
        logger.info(`Test Case Started : ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);
        obj.results.push({
            title: test.title,
            status: result.status,
            message: result.status === 'passed' ? 'Automated Test Passed' : 
            result.status === 'failed' ? result.error.message.replace(regex, '') : result.errors[0].message.replace(regex, '')
        });
        fs.writeFileSync(`./reporters/testRailResults.json`, JSON.stringify(obj, null, 2));
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === `test.step`) {
            logger.info(`Executing Step : ${step.title}`);
        }
    }

    onError(error: TestError): void {
        logger.error(error.message);
    }

    onStdErr(chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void {
        logger.error('onStd Error');
    }

    onStdOut(chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void {
        logger.error('onStdOut Error');
    }

    onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
        console.log('onBegin error');
    }

    onEnd(result: FullResult): void | Promise<void> {

    }
}