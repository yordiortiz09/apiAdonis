import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'recetas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nombre', 30).notNullable()
      table.string('duracion', 40).notNullable()
      table.text('preparacion').notNullable()
      table.boolean('status').notNullable().defaultTo(1)
      table.integer('chef').unsigned().references('id').inTable('chefs').onDelete('CASCADE')
      table.integer('ingrediente').unsigned().references('id').inTable('ingredientes').onDelete('CASCADE').onUpdate('CASCADE').nullable()
      table.integer('tipo_plato').unsigned().references('id').inTable('tipo_platoes').onDelete('CASCADE').onUpdate('CASCADE').nullable()


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
