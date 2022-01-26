import { Reaction } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { reactionsType } from 'App/Utils'

export const ReactionFactory = Factory.define(Reaction, ({ faker }) => {
  return {
    type: reactionsType[faker.datatype.number(4)]
  }
}).build()
