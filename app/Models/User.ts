import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public rol_id: number

  @column()
  public status: number

  @column()
  public telefono: string

  @column()
  public no_verificacion: number

 
  
  @belongsTo(() => Role, {
    foreignKey: 'rol_id',
  })
  public role: BelongsTo<typeof Role>




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
