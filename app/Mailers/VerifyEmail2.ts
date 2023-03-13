import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import View from '@ioc:Adonis/Core/View';

export default class VerifyEmail2 extends BaseMailer {

  constructor (private user: User) {
    super()
  }
  public async prepare(message: MessageContract) {
    message
    .from('UTT@example.com')
    .to(this.user.email)
    .subject('Segundo paso/a a nuestro sitio')
    .html(await View.render('emails/welcome', { user:this.user }));

  }
}
