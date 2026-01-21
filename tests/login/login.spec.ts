import { test } from 'fixtures/base.fixtures'
import { loginCreds } from 'helper'

test.describe('Login module', () => {

    test.beforeEach(async ({ login }) => {
        await login.goto()
    })

    test('should login successfully', async ({ login }) => {
        await login.login(loginCreds.username, loginCreds.password)
        await login.assertLoginSuccessful()
    })

    test('shows error for valid username but no password', async ({ login }) => {
        await login.fillUsername(loginCreds.username)
        await login.emailField.blur() // to trigger validation if needed
        await login.loginButton.click()
        await login.assertLoginError('Epic sadface: Password is required')
    })

    test('shows error for invalid username', async ({ login }) => {
        await login.fillUsername('test236')
        await login.emailField.blur()
        await login.loginButton.click()
        await login.assertLoginError('Epic sadface: Password is required')
    })

    test('shows error for empty username and password', async ({ login }) => {
        await login.loginButton.click()
        await login.assertLoginError('Epic sadface: Username is required')
    })
})
