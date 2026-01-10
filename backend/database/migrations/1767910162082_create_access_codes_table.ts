import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'access_codes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable()
      table.string('member_first_name').notNullable()
      table.string('member_last_name').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').nullable().onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}