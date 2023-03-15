import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nombre: string
  @column()
  public ap_paterno: string
  @column()
  public ap_materno: string
  @column()
  public edad : number
  @column()
  public status : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
