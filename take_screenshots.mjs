import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, bypassCSP: true });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  const takeShot = async (url, path, full = false) => {
    try {
      console.log(`Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path, fullPage: full, animations: "disabled" });
      console.log(`Saved: ${path}`);
    } catch (e) {
      console.error(`Error for ${url}: ${e.message}`);
    }
  }

  await takeShot('http://localhost:5173/home', 'screenshots/landing.png', true);
  await takeShot('http://localhost:5173/login', 'screenshots/login.png');
  await takeShot('http://localhost:5173/register', 'screenshots/register.png');

  try {
    console.log('Logging in...');
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
    // Use antd's id matching
    await page.fill('#email', 'admin@luxehotel.com');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
  } catch(e) { console.error('Login error', e.message); }

  await takeShot('http://localhost:5173/', 'screenshots/dashboard.png', true);
  await takeShot('http://localhost:5173/customers', 'screenshots/customers.png');
  await takeShot('http://localhost:5173/rooms', 'screenshots/rooms.png');
  await takeShot('http://localhost:5173/floormap', 'screenshots/floormap.png', true);
  await takeShot('http://localhost:5173/bookings', 'screenshots/bookings.png', true);
  await takeShot('http://localhost:5173/calendar', 'screenshots/calendar.png', true);
  await takeShot('http://localhost:5173/invoices', 'screenshots/invoices.png');
  await takeShot('http://localhost:5173/staff', 'screenshots/staff.png');
  await takeShot('http://localhost:5173/profile', 'screenshots/profile.png');
  await takeShot('http://localhost:5173/guest', 'screenshots/guest.png', true);

  await browser.close();
  console.log('All done');
})();
