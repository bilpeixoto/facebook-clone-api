import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator, StoreValidator } from 'App/Validators/Post/Main'
import { Post, User } from 'App/Models'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export default class PostsMainController {
  public async index({ request, auth }: HttpContextContract) {
    const { username } = request.qs()
    let user
    if (username) user = await User.findByOrFail('username', username)
    else user = auth.user!

    await user.load('posts', (query) => {
      query.orderBy('id', 'desc')

      query.preload('media')

      query.withCount('comments')

      query.preload('user', (query) => {
        query.select(['id', 'name', 'username'])
        query.preload('avatar')
      })

      query.preload('comments', (query) => {
        query.select(['userId', 'id', 'content', 'createdAt'])

        query.preload('user', (query) => {
          query.select(['id', 'name', 'username'])
          query.preload('avatar')
        })
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'like')
        query.as('likeCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'love')
        query.as('loveCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'haha')
        query.as('hahaCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'angry')
        query.as('angryCount')
      })

      query.withCount('reactions', (query) => {
        query.where('type', 'sad')
        query.as('sadCount')
      })

      query.preload('reactions', () => {
        query.where('userId', auth.user!.id).first()
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
