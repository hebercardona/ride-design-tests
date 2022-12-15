import TestRailReporter from "./reporters/testRail/testRailReporter";

async function globalTeardown() {
    await TestRailReporter.processTestsResults();
    console.log('Global Teardown executed');
}

export default globalTeardown;