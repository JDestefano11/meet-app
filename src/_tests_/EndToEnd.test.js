import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
    let browser;
    let page;

    // beforeAll(async () => {
    //     browser = await puppeteer.launch({ headless: true });
    //     page = await browser.newPage();
    //     await page.goto('http://localhost:3000/');
    //     await page.waitForSelector('li', { timeout: 5000 });
    // });

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slows down Puppeteer operations by 250ms
            args: ['--start-maximized'] // starts the browser window maximized
        });
        page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('li', { timeout: 5000 });
    });


    afterAll(async () => {
        await browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('[data-testid="event-details"]');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see details', async () => {
        await page.click('li button');
        const eventDetails = await page.$('[data-testid="event-details"]');
        expect(eventDetails).not.toBeNull();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('li button');
        await page.waitForSelector('[data-testid="event-details"]', { hidden: true });
        const eventDetails = await page.$('[data-testid="event-details"]');
        expect(eventDetails).toBeNull();
    });
});





