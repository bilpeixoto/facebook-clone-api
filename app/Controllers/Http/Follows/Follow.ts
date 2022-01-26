import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { isFollowed } from 'App/Utils'
import { StoreValidator } from 'App/Validators/Follows/Main'

export default class FollowController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { followingId } = await request.validate(StoreValidator)
    const user = await User.findOrFail(followingId)

    if (!(await isFollowed(user, auth))) await user.related('followers').attach([auth.user!.id])
    else return response.badRequest({ error: { message: 'Already follow this user' } })
  }
}
