import { User } from 'App/Models'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Database from '@ioc:Adonis/Lucid/Database'

export const isFollowed = async (user: User, auth: AuthContract) => {
  const isFollowed = await Database.query()
    .from('follows')
    .where('follower_id', auth.user!.id)
    .andWhere('following_id', user.id)
    .first()

  return isFollowed ? true : false
}
