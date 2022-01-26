import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './user'
import './uploads'
import './posts'
import './reactions'
import './follows'
import './profiles'
import './messages'
import './conversations'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})

Route.on('/chat').render('chat')

/*
http://127.0.0.1:3333/chat?conversationId=1&userId=1&receiverId=2&token=OQ.LWJm9LgG2GXYRiLTa_I95qVA8T6cFfwP7P1OOpv3zsgBNBrV5GOcDMwsJkwH

http://127.0.0.1:3333/chat?conversationId=1&userId=2&receiverId=1&token=MTE.5kCKlHInqG5gKsSyqQ92XfkY9BMcNRtokSdGddOxL5LCjHKxsU4aRThpEWQw
*/
