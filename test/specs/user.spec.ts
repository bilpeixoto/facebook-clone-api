import test from 'japa'
import { request } from '../utils'
import Database from '@ioc:Adonis/Lucid/Database'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'

test.group('/user', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[store] - should able to send email after pre-registration', async (assert) => {
    const email = faker.internet.email()

    Mail.trap((message) => {
      assert.deepEqual(message.to, [{ address: email }])
      assert.deepEqual(message.subject, 'Criação de Conta')
      assert.deepEqual(message.from, {
        address: 'contato@facebook.com',
        name: 'Facebook'
      })
    })

    await request
      .post('/users/register')
      .send({ email, redirectUrl: 'https://facebook.com' })
      .expect(200)

    Mail.restore()
  })
})
