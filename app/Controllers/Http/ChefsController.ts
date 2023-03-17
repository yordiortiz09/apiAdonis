import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import Chef from "App/Models/Chef";
import Event from '@ioc:Adonis/Core/Event';


export default class ChefsController {
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(25),
        rules.minLength(3),
      ]),
      ap_paterno: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(30),
        rules.minLength(3),
      ]),
      ap_materno: schema.string.optional({ trim: true, escape: true }, [
        rules.maxLength(30),
        rules.minLength(3),
      ]),
      nacionalidad: schema.enum(["Mexicana", "Italiana"] as const, [
        rules.required(),
      ]),

      edad: schema.number([rules.required(), rules.range(18, 100)]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "nombre.required": "El nombre es requerido",
          "nombre.string": "El nombre debe ser un texto",
          "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
          "nombre.maxLength": "El nombre debe tener como máximo 25 caracteres",
          "ap_paterno.required": "El apellido paterno es requerido",
          "ap_paterno.string": "El apellido paterno debe ser un texto",
          "ap_paterno.minLength":
            "El apellido paterno debe tener al menos 3 caracteres",
          "ap_paterno.maxLength":
            "El apellido paterno debe tener como máximo 30 caracteres",
          "ap_materno.string": "El apellido materno debe ser un texto",
          "ap_materno.minLength":
            "El apellido materno debe tener al menos 3 caracteres",
          "ap_materno.maxLength":
            "El apellido materno debe tener como máximo 30 caracteres",
          "nacionalidad.enum": "La nacionalidad debe ser Mexicana o Italiana",
          "edad.required": "La edad es requerida",
          "edad.number": "La edad debe ser un número",
          "edad.range": "La edad debe estar entre 18 y 100 años",
        },
      });
      const { nombre, ap_paterno, ap_materno, nacionalidad, edad } = data;
      const chef = new Chef();
      chef.nombre = nombre;
      chef.ap_paterno = ap_paterno;
      chef.ap_materno = ap_materno!;
      chef.nacionalidad = nacionalidad;
      chef.edad = edad;
      await chef.save();
      Event.emit('Chef', chef);

      return response.status(201).json({
        message: "Chef creado correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear el chef",
        data: error,
      });
    }
  }

  public async getChefs({ response }: HttpContextContract) {
    const chefs = await Chef.all();
    return response.status(200).json(chefs);
  }

  public async chefInfo({ response, params }: HttpContextContract) {
    try {
      const chef = await Database.from("chefs")
        .where("id", params.id)
        .firstOrFail();
      return response.status(200).json(chef);
    } catch (error) {
      return response.status(404).json({
        message: "Chef no encontrado",
        data: error,
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(25),
        rules.minLength(3),
      ]),
      ap_paterno: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(30),
        rules.minLength(3),
      ]),
      ap_materno: schema.string.optional({ trim: true, escape: true }, [
        rules.maxLength(30),
        rules.minLength(3),
      ]),
      nacionalidad: schema.enum(["Mexicana", "Italiana"] as const, [
        rules.required(),
      ]),
      edad: schema.number([rules.required(), rules.range(18, 100)]),
    });

    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "nombre.required": "El nombre es requerido",
          "nombre.string": "El nombre debe ser un texto",
          "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
          "nombre.maxLength": "El nombre debe tener como máximo 25 caracteres",
          "ap_paterno.required": "El apellido paterno es requerido",
          "ap_paterno.string": "El apellido paterno debe ser un texto",
          "ap_paterno.minLength":
            "El apellido paterno debe tener al menos 3 caracteres",
          "ap_paterno.maxLength":
            "El apellido paterno debe tener como máximo 30 caracteres",
          "ap_materno.string": "El apellido materno debe ser un texto",
          "ap_materno.minLength":
            "El apellido materno debe tener al menos 3 caracteres",
          "ap_materno.maxLength":
            "El apellido materno debe tener como máximo 30 caracteres",
          "nacionalidad.enum": "La nacionalidad debe ser Mexicana o Italiana",
          "edad.required": "La edad es requerida",
          "edad.number": "La edad debe ser un número",
          "edad.range": "La edad debe estar entre 18 y 100 años",
        },
      });

      const { nombre, ap_paterno, ap_materno, nacionalidad, edad } = data;
      const chef = await Chef.findOrFail(params.id);

      if (chef) {
        chef.nombre = nombre;
        chef.ap_paterno = ap_paterno;
        chef.ap_materno = ap_materno!;
        chef.nacionalidad = nacionalidad;
        chef.edad = edad;

        await chef.save();
        Event.emit('Chef', chef);

        return response.status(200).json({
          message: "Chef actualizado correctamente",
          data: chef,
        });
      } else {
        return response.status(404).json({
          message: "El chef no existe",
          data: null,
        });
      }
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al actualizar el chef",
        data: error,
      });
    }
  }
  public async delete({ response, params }) {
    const chef = await Chef.find(params.id);

    if (!chef) {
      return response.status(404).json({
        status: 404,
        msg: "Chef no encontrado",
        error: null,
        data: null,
      });
    }

    chef.delete();
    Event.emit('Delete', chef);

    return response.status(200).json({
      status: 200,
      msg: "Se ha eliminado correctamente",
      error: null,
      data: chef,
    });
  }
  public async streamChefs({ response }){
    const stream = response.response;
    stream.writeHead(200, {
      "Access-Control-Allow-Origin":"*",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    
    Event.on("Chef", (chef) => {
      stream.write(`event: Chef\ndata: ${JSON.stringify(chef)}\n\n`);
      console.log('Se recibió un nuevo chef:', chef);
    });  
    Event.on("Delete", (chef) => {
      stream.write(`event: Delete\ndata: ${JSON.stringify(chef)}\n\n`);
      console.log('Se eliminó un chef:', chef);
    })
   
  }
 
}