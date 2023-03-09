import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hospital extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public no_de_seguro: number
  @column()
  public numero_de_seo: number
  @column()
  public nombre_del_hospital: string
  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
