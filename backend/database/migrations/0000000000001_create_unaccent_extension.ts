import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UnaccentExtension extends BaseSchema {
  async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS unaccent;')
  }

  async down() {
    this.schema.raw('DROP EXTENSION IF EXISTS unaccent;')
  }
}
