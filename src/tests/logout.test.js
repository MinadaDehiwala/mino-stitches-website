import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function logoutTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the profile page
        await driver.get('http://localhost:5173/profile');

        // Wait for the profile elements to be visible
        await driver.wait(until.elementLocated(By.css('[data-testid="logout-button"]')), 10000);

        // Click the logout button
        let logoutButton = await driver.findElement(By.css('[data-testid="logout-button"]'));
        await logoutButton.click();

        // Wait for the success alert
        let alert = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);

        // Assert that the alert is displayed
        let alertText = await alert.getText();
        assert(alertText.includes('Logout Successful'), 'Logout Failed');

        // Optional: Confirm the alert
        let confirmButton = await driver.findElement(By.className('swal2-confirm'));
        await confirmButton.click();

        // Wait for the navigation to the home page
        await driver.wait(until.urlIs('http://localhost:5173/'), 5000);

        console.log('Logout Test Passed');
    } catch (err) {
        console.error('Logout Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
})();
