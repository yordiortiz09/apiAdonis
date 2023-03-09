import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('telefono', 10).notNullable().unique()
      table.integer('rol_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').defaultTo(3)
      table.integer('status').notNullable().defaultTo(0)
      table.string('no_verificacion').nullable()
      table.string('remember_me_token').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
