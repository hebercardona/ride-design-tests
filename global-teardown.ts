import TestRailReporter from "./reporters/testRail/TestRailReporter";

async function globalTeardown() {
    if(process.env.CI) {
        await TestRailReporter.processTestsResults();
    }
}

export default globalTeardown;