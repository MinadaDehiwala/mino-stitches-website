import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

async function testAddToCart() {
    // Set up the Chrome driver
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
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


        // Wait for the products to be loaded
        await driver.wait(until.elementLocated(By.css('div.MuiCard-root')), 10000);


        // Add the first product to the cart
        let addToCartButtons = await driver.findElements(By.css('button.MuiButton-containedPrimary'));
        await addToCartButtons[0].click();


        // Wait for the success alert
        alert = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);
        alertText = await alert.getText();
        assert(alertText.includes('Added to Cart'), 'Add to Cart Failed');


        // Confirm the alert
        await driver.findElement(By.className('swal2-confirm')).click();


        console.log('Add to Cart Test Passed');
    } catch (err) {
        console.error('Add to Cart Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

testAddToCart();
