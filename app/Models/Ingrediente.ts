import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Receta from 'App/Models/Receta'

export default class Ingrediente extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public ingredientes: string
  @column()
  public unidades:number
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
