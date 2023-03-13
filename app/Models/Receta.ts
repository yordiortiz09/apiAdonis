import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Ingrediente from 'App/Models/Ingrediente'
import Chef from 'App/Models/Chef'
import TipoPlato from 'App/Models/TipoPlato'

export default class Receta extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nombre: string
  @column()
  public duracion: string
  @column()
  public preparacion: string
  @column()
  public status : number
  @column()
  public chef: number
  @column()
  public ingrediente: number
  @column()
  public tipo_plato: number

  @hasMany(() => Ingrediente, {
    foreignKey: 'receta'
  })
  public ingredientes: HasMany<typeof Ingrediente>

  @hasMany(() => Chef, {
    foreignKey: 'receta'
  })
  public chefs: HasMany<typeof Chef>

  @hasMany(() => TipoPlato, {
    foreignKey: 'receta'
  })
  public tiposPlato: HasMany<typeof TipoPlato>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
