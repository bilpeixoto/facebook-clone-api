import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/Follows/Main'
import { isFollowed } from 'App/Utils'

export default class UnfollowController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { followingId } = await request.validate(StoreValidator)
    const user = await User.findOrFail(followingId)

    if (await isFollowed(user, auth)) await user.related('followers').detach([auth.user!.id])
    else return response.badRequest({ error: { message: 'Already unfollow this user' } })
  }
}
