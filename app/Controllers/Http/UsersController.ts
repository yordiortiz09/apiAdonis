import { HttpContext } from "@adonisjs/core/build/standalone";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Hash from "@ioc:Adonis/Core/Hash";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Route from "@ioc:Adonis/Core/Route";
import VerifyEmail from "App/Mailers/VerifyEmail";
import VerifyEmail2 from "App/Mailers/VerifyEmail2";
import Sms from "App/Mailers/Sms";

export default class UsersController {
  
  public async numerodeverificacionmovil({ request, response }: HttpContext) {
    const numeroiddelaurl = request.param("url");
    console.log(numeroiddelaurl);

    const user = await Database.from("users")
      .where("id", numeroiddelaurl)
      .first();
    const correo = user.email;

    await new VerifyEmail2(user).sendLater();

    await new Sms(user).sendLater();

    const domain = correo.substring(correo.lastIndexOf("@") + 1);
    response.redirect(`https://${domain}`);
  }

  //--------------------------------------------------------------------------------
  public async registrar({ request, response }: HttpContext) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(255),
      ]),
      email: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(255),
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({}, [rules.required(), rules.minLength(8)]),

      telefono: schema.string([
        rules.required(),
        rules.unique({ table: "users", column: "telefono" }),
        rules.minLength(10),
        rules.maxLength(10),
      ]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "name.required": "El nombre es requerido",
          "name.string": "El nombre debe ser un texto",
          "name.minLength": "El nombre debe tener al menos 3 caracteres",
          "name.maxLength": "El nombre debe tener como máximo 50 caracteres",
          "email.required": "El email es requerido",
          "email.string": "El email debe ser un texto",
          "email.email": "El email debe ser un email válido",
          "email.unique": "El email ya está en uso",

          "password.required": "La contraseña es requerida",
          "password.string": "La contraseña debe ser un texto",
          "password.minLength":
            "La contraseña debe tener al menos 8 caracteres",
          "password.maxLength":
            "La contraseña debe tener como máximo 50 caracteres",

          "telefono.required": "El teléfono es requerido",
          "telefono.minLength": "Debe tener al menos 10 caracteres",
          "telefono.maxLength": "Debe tener como máximo 10 caracteres",
          "telefono.unique": "El teléfono ya está en uso",
        },
      });
      const numeroAleatorio = Math.round(Math.random() * (9000 - 5000) + 5000);
      const { name, email, password, telefono } = data;
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = await Hash.make(password);
      user.telefono = telefono;
      user.no_verificacion = numeroAleatorio;
      await user.save();
      const HOST = process.env.HOST;
      const PORT = process.env.PORT;
      const url =
        "http://" +
        HOST +
        ":" +
        PORT +
        Route.makeSignedUrl(
          "validarnumero",
          {
            url: user.id,
          },
          {
            expiresIn: "5m",
          }
        );

      await new VerifyEmail(user, url).sendLater();

      return response.status(201).json({
        message: "Usuario registrado correctamente",
        user: user,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al registrar el usuario",
        data: error,
      });
    }
  }

  public async registrarsms({ request, response }: HttpContext) {
    const validationSchema = schema.create({
      codigo: schema.string({ trim: true, escape: true }, [
        rules.minLength(4),
        rules.maxLength(4),
      ]),
    });

    const data = await request.validate({
      schema: validationSchema,
      messages: {
        "codigo.required": "El codigo es requerido",
        "codigo.minLength": "El codigo debe tener al menos 4 caracteres",
        "codigo.maxLength": "El codigo debe tener como máximo 4 caracteres",
      },
    });

    const user = await Database.from("users")
      .where("no_verificacion", data.codigo)
      .first();

    if (user) {
      await Database.from("users")
        .where("no_verificacion", data.codigo)
        .update({ status: 1 });

      return response
        .status(200)
        .json({ message: "Usuario actualizado correctamente" });
    } else {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate({
        schema: schema.create({
          email: schema.string({}, [rules.required(), rules.email()]),
          password: schema.string({}, [
            rules.required(),
            rules.minLength(8),
            rules.maxLength(180),
          ]),
        }),
        messages: {
          "email.required": "El email es requerido",
          "email.email": "El email debe ser un email válido",

          "password.required": "La contraseña es requerida",
          "password.minLength":
            "La contraseña debe tener al menos 8 caracteres",
          "password.maxLength":
            "La contraseña debe tener como máximo 180 caracteres",
        },
      });

      const user = await User.findByOrFail("email", email);

      const isPasswordValid = await Hash.verify(user.password, password);
      if (!isPasswordValid) {
        return response.status(400).json({
          message: "Email o contraseña incorrectos",
          data: null,
        });
      }

      const token = await auth.use("api").generate(user);

      return response.status(200).json({
        message: "Inicio de sesión exitoso",
        user: user,

        token: token.token,
      });
    } catch (error) {
      return response.status(400).json({
        message: "Error al iniciar sesión",
        data: error,
      });
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
      return response.status(200).json({
        message: "Sesión cerrada correctamente",
        data: null,
        revoked: true,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al cerrar sesión",
        data: error,
      });
    }
  }

  public async info({ response, params }) {
    try {
      const user = await Database.from("users")
        .where("id", params.id)
        .firstOrFail();
      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).json({
        error: "Usuario no encontrado",
      });
    }
  }

  public async getUsers({ response }) {
    const users = await User.all();
    return response.json(users);
  }

  public async getRole({ auth, response }) {
    try {
      const user = await auth.authenticate();
      const rol_id = user.rol_id;
      return response.json({ rol_id });
    } catch (error) {
      return response.status(401).json({ message: "Usuario no autenticado" });
    }
  }
  public async getStatus({ auth, response }) {
    try {
      const user = await auth.authenticate();
      const status = user.status;
      return response.json({ status });
    } catch (error) {
      return response.status(401).json({ message: "Usuario no autenticado" });
    }
  }

  public async updateRole({ auth, params, request, response }) {
    const user = await User.findOrFail(params.id);

    if (!auth.user) {
      return response.status(401).json({ message: "Usuario no autenticado" });
    }
    if (auth.user.rol_id !== 1) {
      return response.status(403).json({
        message: "No tienes permisos para actualizar roles de usuario",
      });
    }
    const rol_id = request.input("rol_id");
    if (!rol_id) {
      return response
        .status(422)
        .json({ message: "El campo rol_id es requerido" });
    }

    user.rol_id = rol_id;
    await user.save();

    return response
      .status(200)
      .json({ message: "Rol actualizado correctamente" });
  }

  public async updateStatus({ request, response, params }) {
    const { id } = params;
    const user = await User.findOrFail(id);
    user.status = request.input("status");
    await user.save();
    return response.status(200).json({
      message: "Estado actualizado con éxito",
      user: user,
    });
  }

  public async destroy({ params, response }) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();

      return response.status(200).json({
        message: "Usuario eliminado con éxito",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Ocurrió un error al eliminar el usuario",
      });
    }
  }
  public async updateUser({ request, response, params }) {
    const { id } = params;
    const user = await User.findOrFail(id);

    user.rol_id = request.input("rol_id");
    user.status = request.input("status");

    await user.save();

    return response.status(200).json({
      message: "Usuario actualizado correctamente",
      user: user,
    });
  }
}
