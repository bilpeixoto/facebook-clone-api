import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversations extends BaseSchema {
  protected tableName = 'conversations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id_one')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('user_id_two')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
