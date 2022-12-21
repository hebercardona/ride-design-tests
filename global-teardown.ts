import TestRailReporter from "./reporters/testRail/testRailReporter";

async function globalTeardown() {
    if(process.env.CI) {
        await TestRailReporter.processTestsResults();
    }
}

export default globalTeardown;