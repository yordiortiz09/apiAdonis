import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Seguro extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public id_paciente: number
  @column()
  public numero_seguro: number
  @column()
  public nombre_seguro: string
  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
