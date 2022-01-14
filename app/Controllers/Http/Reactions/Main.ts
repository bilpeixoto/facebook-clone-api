import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/Reactions/Main'
import { Post, Reaction } from 'App/Models'

export default class ReactionController {
  public async update({ request, auth }: HttpContextContract) {
    const { postId, type } = await request.validate(UpdateValidator)
    const post = await Post.findOrFail(postId)
    const reaction = await post
      .related('reactions')
      .updateOrCreate({ postId, userId: auth.user!.id }, { type })
    return reaction
  }

  public async destroy({ params }: HttpContextContract) {
    const reaction = await Reaction.firstOrFail(params.id)
    await reaction.delete()
  }
}
