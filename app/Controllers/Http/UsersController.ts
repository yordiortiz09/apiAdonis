import { HttpContext } from "@adonisjs/core/build/standalone";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Hash from "@ioc:Adonis/Core/Hash";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";



export default class UsersController {
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


  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate({
        schema: schema.create({
          email: schema.string({}, [
            rules.required(),
            rules.email(),
          ]),
          password: schema.string({}, [
            rules.required(),
            rules.minLength(8),
            rules.maxLength(180),
          ]),
        }),
        messages: {
          'email.required': 'El email es requerido',
          'email.email': 'El email debe ser un email válido',

          'password.required': 'La contraseña es requerida',
          'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
          'password.maxLength': 'La contraseña debe tener como máximo 180 caracteres',
        },
      })
  
      const user = await User.findByOrFail('email', email)
  
      const isPasswordValid = await Hash.verify(user.password, password)
      if (!isPasswordValid) {
        return response.status(400).json({
          message: 'Email o contraseña incorrectos',
          data: null,
        })
      }
  
      const token = await auth.use('api').generate(user)
  
      return response.status(200).json({
        message: 'Inicio de sesión exitoso',
        id : user.id,
        email : user.email,
        rol_id : user.rol_id,
        token: token.token,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error al iniciar sesión',
        data: error,
      })
    }
  }
  public async logout({ response, auth }: HttpContextContract)
  {
      try {
          await auth.use('api').revoke();
          return response.status(200).json({
              message: 'Sesión cerrada correctamente',
              data: null,
              revoked: true,
          });
      }
      catch (error) {
        console.error(error);
          return response.status(400).json({
              message: 'Error al cerrar sesión',
              data: error,
          });
      }

  } 
}
