import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Conductor from "App/Models/Conductor";

export default class ConductorsController {
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(40),
        rules.minLength(3),
      ]),
      ap_paterno: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(40),
        rules.minLength(3),
      ]),
      ap_materno: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(40),
        rules.minLength(3),
      ]),
      edad: schema.number([rules.required(), rules.range(18, 70)]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "nombre.required": "El nombre es requerido",
          "nombre.string": "El nombre debe ser un texto",
          "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
          "nombre.maxLength": "El nombre debe tener como máximo 40 caracteres",
          "ap_paterno.required": "El apellido paterno es requerido",
          "ap_paterno.string": "El apellido paterno debe ser un texto",
          "ap_paterno.minLength":
            "El apellido paterno debe tener al menos 3 caracteres",
          "ap_paterno.maxLength":
            "El apellido paterno debe tener como máximo 40 caracteres",
          "ap_materno.required": "El apellido materno es requerido",
          "ap_materno.string": "El apellido materno debe ser un texto",
          "ap_materno.minLength":
            "El apellido materno debe tener al menos 3 caracteres",
          "ap_materno.maxLength":
            "El apellido materno debe tener como máximo 40 caracteres",
          "edad.required": "La edad es requerida",
          "edad.number": "La edad debe ser un número",
          "edad.range": "La edad debe estar entre 1 y 100",
        },
      });
      const { nombre, ap_paterno, ap_materno, edad } = data;
      const conductor = new Conductor();
      conductor.nombre = nombre;
      conductor.ap_paterno = ap_paterno;
      conductor.ap_materno = ap_materno;
      conductor.edad = edad;
      await conductor.save();

      return response.status(201).json({
        message: "Conductor creado correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear el conductor",
        data: error,
      });
    }
  }
  public async getConductores({ response }: HttpContextContract) {
    const conductores = await Conductor.all();
    return response.status(200).json(conductores);
  }
  public async getConductor({ response, params }: HttpContextContract) {
    const conductor = await Conductor.find(params.id);
    if (conductor) {
      return response.status(200).json(conductor);
    } else {
      return response.status(404).json({ message: "Conductor no encontrado" });
    }
  }
  public async update({ request, response, params }: HttpContextContract) {
    const conductor = await Conductor.find(params.id);
    if (conductor) {
      const validationSchema = schema.create({
        nombre: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(40),
          rules.minLength(3),
        ]),
        ap_paterno: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(40),
          rules.minLength(3),
        ]),
        ap_materno: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(40),
          rules.minLength(3),
        ]),
        edad: schema.number([rules.required(), rules.range(1, 100)]),
      });
      try {
        const data = await request.validate({
          schema: validationSchema,
          messages: {
            "nombre.required": "El nombre es requerido",
            "nombre.string": "El nombre debe ser un texto",
            "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
            "nombre.maxLength":
              "El nombre debe tener como máximo 40 caracteres",
            "ap_paterno.required": "El apellido paterno es requerido",
            "ap_paterno.string": "El apellido paterno debe ser un texto",
            "ap_paterno.minLength":
              "El apellido paterno debe tener al menos 3 caracteres",
            "ap_paterno.maxLength":
              "El apellido paterno debe tener como máximo 40 caracteres",
            "ap_materno.required": "El apellido materno es requerido",
            "ap_materno.string": "El apellido materno debe ser un texto",
            "ap_materno.minLength":
              "El apellido materno debe tener al menos 3 caracteres",
            "ap_materno.maxLength":
              "El apellido materno debe tener como máximo 40 caracteres",
            "edad.required": "La edad es requerida",
            "edad.number": "La edad debe ser un número",
            "edad.range": "La edad debe estar entre 1 y 100",
          },
        });
        const { nombre, ap_paterno, ap_materno, edad } = data;
        conductor.nombre = nombre;
        conductor.ap_paterno = ap_paterno;
        conductor.ap_materno = ap_materno;
        conductor.edad = edad;
        await conductor.save();
        return response.status(200).json({
          message: "Conductor actualizado correctamente",
          data: data,
        });
      } catch (error) {
        console.error(error);
        return response.status(400).json({
          message: "Error al actualizar el conductor",
          data: error,
        });
      }
    } else {
      return response.status(404).json({ message: "Conductor no encontrado" });
    }
  }
  public async delete({ response, params }: HttpContextContract) {
    const conductor = await Conductor.find(params.id);

    if (!conductor) {
      return response.status(404).json({ message: "Conductor no encontrado" });
    }
   conductor.delete();
    return response
      .status(200)
      .json({ message: "Conductor eliminado correctamente" });
  }
}
