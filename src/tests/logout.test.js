import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

(async function logoutTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Step 1: Navigate to the login page
        await driver.get('http://localhost:5173/login');

        // Step 2: Perform login
        await driver.findElement(By.id('form1')).sendKeys('test@example.com');
        await driver.findElement(By.id('form2')).sendKeys('Test@123456');
        await driver.findElement(By.className('btn-primary')).click();
        console.log("Login submitted");

        // Step 3: Wait for redirection to the home page
        await driver.wait(until.urlIs('http://localhost:5173/'), 10000);
        console.log("Redirected to home page");

        // Step 4: Wait for the profile link to be present and visible
        const profileLink = await driver.wait(until.elementLocated(By.linkText('Profile')), 20000);
        await driver.wait(until.elementIsVisible(profileLink), 10000);


        // Step 5: Wait to ensure the UI is stable before clicking the profile link
        await driver.sleep(10000); // Wait for 10 seconds

        // Step 6: Click the profile link to navigate to the profile page
        await profileLink.click();


        // Step 7: Wait for the profile page to load completely
        await driver.sleep(5000); // Wait for 5 seconds to ensure the page loads

        // Step 8: Scroll into view if necessary and find the logout button
        const logoutButton = await driver.wait(until.elementLocated(By.css('button[data-testid="logout-button"]')), 20000);


        // Scroll to the logout button if it's not visible
        await driver.executeScript("arguments[0].scrollIntoView(true);", logoutButton);

        // Step 9: Click the logout button
        await logoutButton.click();


        // Step 10: Wait for the Swal popup and confirm logout
        const alert = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);
        const alertText = await alert.getText();
        assert(alertText.includes('Logout Successful'), 'Logout Failed');


        // Confirm the alert
        const confirmButton = await driver.findElement(By.className('swal2-confirm'));
        await confirmButton.click();


        // Step 11: Wait for a short period to allow redirection to the homepage
        await driver.sleep(5000); // 5 seconds delay to ensure the redirect

        // Step 12: Verify redirection to the homepage
        await driver.wait(until.urlIs('http://localhost:5173/'), 10000);
        console.log("Redirection to homepage confirmed");

        console.log('Logout Test Passed');
    } catch (err) {
        console.error('Logout Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
})();
