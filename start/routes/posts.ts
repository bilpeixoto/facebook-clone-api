import Route from '@ioc:Adonis/Core/Route'

//Post Main
Route.resource('/posts', 'Posts/Main')
  .apiOnly()
  .except(['show'])
  .middleware({
    index: ['auth'],
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth']
  })

//Post Media
Route.post('/posts/:id/media', 'Posts/Media.store').middleware('auth')

//Post Comments
Route.resource('/comments', 'Posts/Comments')
  .apiOnly()
  .except(['index'])
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth']
  })
