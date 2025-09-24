import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercise_muscle'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('exercise_id')
        .unsigned()
        .references('id')
        .inTable('exercises')
        .onDelete('CASCADE')
      table.integer('muscle_id').unsigned().references('id').inTable('muscles').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
