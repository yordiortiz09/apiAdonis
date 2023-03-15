import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class VerifyStatus {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      const user = await auth.authenticate();
      
      if (user.status === 0) {
        return response.status(403).json({ message: 'Cuenta desactivada', user });
      }
      
      await next();
      
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'Error en el servidor' });
    }
  }
}
