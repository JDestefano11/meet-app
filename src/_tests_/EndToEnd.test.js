import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('End-to-end tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('An event element is collapsed by default', async () => {
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('li', { timeout: 10000 });

        const eventDetails = await page.$('[data-testid="event-details"]');
        expect(eventDetails).toBeNull();
    });
});
