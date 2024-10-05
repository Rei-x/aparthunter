import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'failed_apartments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('external_id').notNullable()
      table.string('url')
      table.text('error').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
