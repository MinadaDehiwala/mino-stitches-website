import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'assert';

(async function signUpTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the signup page
        await driver.get('http://localhost:5173/signup');

        // Wait for the signup form to be visible
        await driver.wait(until.elementLocated(By.name('firstName')), 10000);

        // Find form elements and fill them out
        await driver.findElement(By.name('firstName')).sendKeys('test');
        await driver.findElement(By.name('lastName')).sendKeys('example');
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('Test@123456');

        // Click the sign-up button
        await driver.findElement(By.css('.w-100.mb-4')).click();

        // Wait for the success alert
        let alert = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);

        // Assert that the alert is displayed
        let alertText = await alert.getText();
        assert(alertText.includes('Sign Up Successful'), 'Sign Up Failed');

        // Optional: Navigate to the home page if the alert is confirmed
        await driver.findElement(By.className('swal2-confirm')).click();
        await driver.wait(until.urlIs('http://localhost:5173/'), 5000);

        console.log('Sign Up Test Passed');
    } catch (err) {
        console.error('Sign Up Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
})();
