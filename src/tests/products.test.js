import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function testProductsLoading() {
    // Set up the Chrome driver
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()) // Run in headless mode
        .build();

    try {
        // Navigate to the Products page
        await driver.get('http://localhost:5173/products'); // Update the URL to your local server

        // Wait until the loading spinner is gone
        await driver.wait(until.elementLocated(By.css('h1')), 10000);

        // Check if products are loaded
        const products = await driver.findElements(By.css('div.MuiCard-root'));
        console.log(`Number of products loaded: ${products.length}`);

        if (products.length > 0) {
            console.log('Test passed: Products are loaded.');
        } else {
            console.log('Test failed: No products are loaded.');
        }
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

testProductsLoading();
