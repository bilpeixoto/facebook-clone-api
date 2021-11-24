import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator, StoreValidator } from 'App/Validators/Post/Main'
import { Post, User } from 'App/Models'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class PostsController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()
    const user = (await User.findBy('username', username)) || auth.user!

    await user.load('posts', (query) => {
      query.orderBy('id', 'desc')
      query.preload('media')
      query.preload('user', (query) => {
        query.select(['id', 'name', 'username'])
        query.preload('avatar')
      })
    })
    return user.posts
  }
  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('posts').create(data)
    return post
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.merge(data).save()

    return post
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.load('media')

    if (post.media) {
      fs.unlinkSync(Application.tmpPath('uploads', post.media.fileName))
      await post.media.delete()
    }
    await post.delete()
  }
}
