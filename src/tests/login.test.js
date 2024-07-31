import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'assert';

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();
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

        // Optional: Navigate to the home page if the alert is confirmed
        await driver.findElement(By.className('swal2-confirm')).click();
        await driver.wait(until.urlIs('http://localhost:5173/'), 5000);

        console.log('Login Test Passed');
    } catch (err) {
        console.error('Login Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
})();
