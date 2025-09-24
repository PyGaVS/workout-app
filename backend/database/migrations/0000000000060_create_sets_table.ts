import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('reps')
      table.integer('weight')
      table.string('comment')
      table.integer('rest_time')
      table.string('tempo')
      table.integer('exercise_id').unsigned().references('id').inTable('exercises').notNullable()
      table
        .integer('exercise_bloc_id')
        .unsigned()
        .references('id')
        .inTable('exercise_blocs')
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
