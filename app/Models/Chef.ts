import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Receta from 'App/Models/Receta'
export default class Chef extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nombre: string
  @column()
  public ap_paterno: string
  @column()
  public ap_materno: string
  @column()
  public nacionalidad: string
  @column()
  public edad : number
  @column()
  public status : number

  @belongsTo(() => Receta, {
    foreignKey: 'receta'
  })
  public receta: BelongsTo<typeof Receta>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
