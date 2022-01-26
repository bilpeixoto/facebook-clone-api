import { Comment } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const CommentFactory = Factory.define(Comment, ({ faker }) => {
  return {
    content: faker.lorem.text()
  }
}).build()
