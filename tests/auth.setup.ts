
import { expect } from "@playwright/test";
import { test as setup } from "fixtures/base.fixtures";
import { loginCreds } from "helper";
import path from "path";


const authFile = path.join(__dirname, '../.auth/user.json');
setup('standard user', async ({ login, page }) => {
    await login.goto()
    await login.login(loginCreds.username, loginCreds.password)
    await expect(page).toHaveURL('/inventory.html')
    await page.context().storageState({ path: authFile });
})