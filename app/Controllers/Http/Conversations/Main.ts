import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation } from 'App/Models'

export default class ConversationController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    const conversations = await Conversation.query()
      .where({ userIdOne: user.id })
      .orWhere({ userIdTwo: user.id })
      .preload('userOne', (query) => {
        query.whereNot('id', user.id)
        query.preload('avatar')
      })
      .preload('userTwo', (query) => {
        query.whereNot('id', user.id)
        query.preload('avatar')
      })

    const newArray = conversations.map((conversation) => {
      const conversationInJSON = conversation.toJSON()

      conversationInJSON.user = conversation.userOne || conversation.userTwo

      delete conversationInJSON['userOne']
      delete conversationInJSON['userTwo']

      return conversationInJSON
    })

    return newArray
  }

  public async show({ response, auth, params }: HttpContextContract) {
    const conversation = await Conversation.findOrFail(params.id)

    if (![conversation.userIdOne, conversation.userIdTwo].includes(auth.user!.id)) {
      return response.unauthorized()
    }
    await conversation.load('messages')

    return conversation
  }
}
