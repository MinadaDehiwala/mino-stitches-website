import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

async function testLoginAndProductLoading() {
    // Set up the Chrome driver
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()) // Use headless mode for faster execution
        .build();

    try {
        // Navigate to the login page
        await driver.get('http://localhost:5173/login');

        // Wait for the login form to be visible
        await driver.wait(until.elementLocated(By.name('email')), 10000);

        // Find form elements and fill them out
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('Test@123456');

        // Click the sign-in button
        await driver.findElement(By.css('.mb-4.w-100')).click();

        // Wait for the success alert
        let alert = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);

        // Assert that the alert is displayed
        let alertText = await alert.getText();
        assert(alertText.includes('Login Successful'), 'Login Failed');

        // Confirm the alert
        await driver.findElement(By.className('swal2-confirm')).click();

        // Wait for the redirection to the home page
        await driver.wait(until.urlIs('http://localhost:5173/'), 5000);

        // Navigate to the Products page
        await driver.get('http://localhost:5173/products');

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
    } catch (err) {
        console.error('Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

testLoginAndProductLoading();
