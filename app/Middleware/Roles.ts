import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Roles {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles: String[]
  ) {
    try {
      const user = await auth.authenticate();

      if (!roles.includes(user.rol_id.toString())) {
        return response
          .status(403)
          .json({ message: `No tienes autorizacion. Tu rol actual es ${user.rol_id}` });
      }

      await next();
    } catch (error) {
      return response.status(401).json({
        message: "Debes estar autenticado para realizar esta acción.",
      });
    }
  }
}
