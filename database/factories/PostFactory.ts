import { Post } from 'App/Models'
import { MediaFactory, UserFactory } from 'Database/factories'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const PostFactory = Factory.define(Post, ({ faker }) => {
  return {
    description: faker.lorem.text()
  }
})
  .relation('user', () => UserFactory)
  .relation('media', () => MediaFactory)
  .build()
