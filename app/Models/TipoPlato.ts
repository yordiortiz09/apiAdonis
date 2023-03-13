import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Receta from './Receta'

export default class TipoPlato extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nombre: string
  @column()
  public descripcion: string
  @column()
  public status: number

  @belongsTo(() => Receta, {
    foreignKey: 'receta'
  })
  public receta: BelongsTo<typeof Receta>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
