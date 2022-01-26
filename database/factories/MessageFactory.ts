import { Message } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const MessageFactory = Factory.define(Message, ({ faker }) => {
  return {
    content: faker.lorem.lines()
  }
}).build()
