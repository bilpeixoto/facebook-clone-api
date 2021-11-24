import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'lais@gmail.com',
        password: 'senha',
        name: 'Lais Soares Peixoto',
        username: 'laispeixoto'
      },
      {
        email: 'marcos@gmail.com',
        password: 'senha',
        name: 'Marcos Cesar Peixoto',
        username: 'MarcosCesar'
      },
      {
        email: 'igor@gmail.com',
        password: 'senha',
        name: 'Igor Soares Peixoto',
        username: 'igorpeixoto'
      },
      {
        email: 'neurimaria@gmail.com',
        password: 'senha',
        name: 'Neurimaria Soares Peixoto',
        username: 'neurimaria'
      },
      {
        email: 'suellen@gmail.com',
        password: 'senha',
        name: 'Suellen Gamarano',
        username: 'SuellenGamarano'
      },
      {
        email: 'celio@gmail.com',
        password: 'senha',
        name: 'Célio Peixoto',
        username: 'celiopeixoto'
      },
      {
        email: 'eva@gmail.com',
        password: 'senha',
        name: 'Eva Trindade Peixoto',
        username: 'evaTrindade'
      },
      {
        email: 'cocielo@gmail.com',
        password: 'senha',
        name: 'Júlio Cocielo',
        username: 'cocielo'
      }
    ])
  }
}
