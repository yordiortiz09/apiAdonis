import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    const roleData = [
      { nombre: 'Administrador' },
      { nombre: 'Usuario' },
      { nombre: 'Invitado' },
    ]
    
    await Database.table('roles').insert(roleData)
}
}
