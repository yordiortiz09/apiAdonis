import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Hash from "@ioc:Adonis/Core/Hash";


export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    const userData = [
       { name: 'admin',
      no_verificacion: "8901",
        telefono: '8091234567',
        email: 'admin@gmail.com',
        password: await Hash.make('admin'),
        rol_id: 1,
        status: 1},
    ]
    await Database.table('users').insert(userData)
}
}

