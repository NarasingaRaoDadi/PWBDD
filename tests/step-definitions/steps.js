const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

let browser, page;

Given('user navigates to sample test page', async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('file://' + __dirname + '/../../sampleTestPage.html'); // Adjust path accordingly
});

Given('user is on sample test page', async () => {
  if (!page) {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
  }
  await page.goto('file://' + __dirname + '/../../sampleTestPage.html');
});

When('user enters username {string} and password {string}', async (username, password) => {
  await page.fill('#username', username);
  await page.fill('#password', password);
});

When('user clicks login button', async () => {
  page.once('dialog', dialog => {
    expect(dialog.message()).toBe('Login Successful');
    dialog.accept();
  });
  await page.click('#loginButton');
});

When('user selects {string} from listbox', async (option) => {
  await page.selectOption('#listbox', option);
});

When('user checks the subscribe checkbox', async () => {
  await page.check('#subscribe');
});

When('user selects {string} radio button', async (gender) => {
  await page.check(`input[type="radio"][value="${gender}"]`);
});

Then('the fields should reflect the selections correctly', async () => {
  expect(await page.isChecked('#subscribe')).toBeTruthy();
  expect(await page.isChecked('input[type="radio"][value="male"]')).toBeTruthy();
  const selected = await page.$eval('#listbox', el => el.value);
  expect(selected).toBe('Option1');
});

// Popup steps (you need to add popup show logic in your HTML for clicking to show)
Given('user clicks to show popup', async () => {
  await page.evaluate(() => {
    document.getElementById('popup').style.display = 'block';
  });
});

When('user closes popup', async () => {
  await page.click('#popup button');
});

Then('popup should not be visible', async () => {
  const display = await page.$eval('#popup', el => getComputedStyle(el).display);
  expect(display).toBe('none');
});
