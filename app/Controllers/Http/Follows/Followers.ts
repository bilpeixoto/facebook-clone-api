import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowing } from 'App/Utils'

export default class FollowersController {
  public async index({ request, auth, response }: HttpContextContract) {
    const { username } = request.qs()

    if (!username) {
      return response.badRequest({ error: { message: 'missing username' } })
    }

    const user = await User.findByOrFail('username', username)
    await user.load('followers')

    const queries = user.followers.map(async (user) => {
      await isFollowing(user, auth)
      await user.load('avatar')
    })

    await Promise.all(queries)
    return user.followers
  }
  public async destroy({ params, auth }: HttpContextContract) {
    auth.user!.related('followers').detach([params.id])
  }
}
