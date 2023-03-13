import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View';
import User from 'App/Models/User'

export default class VerifyEmail extends BaseMailer {

  constructor(private user:User,private url){
    super()
    this.url=url
  }
 


  public html =  View.render('emails/correo', {user:this.user,url:this.url});

  // Envía el correo
  public async prepare(message:MessageContract)  {
    message
      .from('UTT@example.com')
      .to(this.user.email)
      .subject('Bienvenido/a a nuestro sitio')
      .html(await this.html);
  }

}
