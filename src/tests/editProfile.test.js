import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

async function testEditProfile() {
    // Set up the Chrome driver
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()) // Use headless mode for faster execution
        .build();

    try {
        // Navigate to the login page
        await driver.get('http://localhost:5173/login');
        console.log('Navigated to login page');

        // Wait for the login form to be visible
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        console.log('Login form is visible');

        // Find form elements and fill them out
        await driver.findElement(By.name('email')).sendKeys('test@example.com');
        await driver.findElement(By.name('password')).sendKeys('Test@123456');
        console.log('Entered login credentials');

        // Click the sign-in button
        await driver.findElement(By.css('.mb-4.w-100')).click();
        console.log('Clicked sign-in button');

        // Wait for the success alert
        let alert = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);
        console.log('Success alert appeared');

        // Assert that the alert is displayed
        let alertText = await alert.getText();
        assert(alertText.includes('Login Successful'), 'Login Failed');
        console.log('Login successful');

        // Confirm the alert
        await driver.findElement(By.className('swal2-confirm')).click();
        console.log('Confirmed the alert');

        // Wait for the redirection to the home page
        await driver.wait(until.urlIs('http://localhost:5173/'), 5000);
        console.log('Redirected to home page');

        // Navigate to the Profile page
        await driver.get('http://localhost:5173/profile');
        console.log('Navigated to profile page');

        // Wait for the Edit Profile button to be visible
        await driver.wait(until.elementLocated(By.css('button.MuiButton-containedPrimary')), 10000);
        console.log('Edit Profile button is visible');

        // Click the Edit Profile button
        await driver.findElement(By.css('button.MuiButton-containedPrimary')).click();
        console.log('Clicked Edit Profile button');

        // Wait for some indication that the edit profile form is visible
        // For example, if you navigate to a new page or show a modal with a form
        await driver.wait(until.elementLocated(By.css('form.edit-profile')), 10000);
        console.log('Edit profile form is visible');

        // Assuming there's a form field with name='first_name' to edit
        await driver.findElement(By.name('first_name')).clear();
        await driver.findElement(By.name('first_name')).sendKeys('NewFirstName');
        console.log('Entered new first name');

        // Find the save button and click it
        await driver.findElement(By.css('button.save-profile')).click();
        console.log('Clicked save button');

        // Wait for some indication that the profile has been updated
        // For example, you might wait for a success message or for the profile page to show the new name
        let successMessage = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);
        let successMessageText = await successMessage.getText();
        assert(successMessageText.includes('Profile Updated Successfully'), 'Profile Update Failed');
        console.log('Profile updated successfully');

        console.log('Edit Profile Test Passed');
    } catch (err) {
        console.error('Edit Profile Test Failed', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

testEditProfile();
