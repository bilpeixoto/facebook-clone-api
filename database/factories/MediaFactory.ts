import { File } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export const MediaFactory = Factory.define(File, () => {
  return {
    fileCategory: 'post' as const,
    fileName: `${cuid()}.png`
  }
}).build()
