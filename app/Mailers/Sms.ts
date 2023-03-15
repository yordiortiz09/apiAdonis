import { BaseMailer } from '@ioc:Adonis/Addons/Mail'

import User from 'App/Models/User';
import Nexmo from 'nexmo';

export default class Sms extends BaseMailer {
  
  constructor (private user: User) {
    super()
  }

  public async prepare() {
    const nexmo = new Nexmo({
      apiKey: '58762ea2',
      apiSecret: 'BClcjqQJjd41CtJD',
    });

    const from = 'UTT';
    const to = `52${this.user.telefono}`;
    const text = `Tu código de verificación es: ${this.user.no_verificacion}. Sigue las instrucciones en tu correo electrónico.`;

    nexmo.message.sendSms(from, to, text, {}, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    });
    
  }
}
