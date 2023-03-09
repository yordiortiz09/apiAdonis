import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
