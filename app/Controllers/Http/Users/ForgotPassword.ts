import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import { User, UserKey } from 'App/Models'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ForgotPassword {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)

      const user = await User.findByOrFail('email', email)

      user.useTransaction(trx)

      const key = faker.datatype.uuid() + user.id
      user.related('keys').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await Mail.send((message) => {
        message.to(email)
        message.from('contato@facebook.com', 'Facebook')
        message.subject('Recuperação de Senha')
        message.htmlView('emails/forgot-password', { link })
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    const user = userKey.related('user').query().firstOrFail()
    return user
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    user.merge({ password })
    user.save()
    userKey.delete()
    return response.ok({ message: 'Ok' })
  }
}
