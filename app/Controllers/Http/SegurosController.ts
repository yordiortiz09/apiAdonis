import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Seguro from "App/Models/Seguro";

export default class SegurosController {
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      id_paciente: schema.number([
        rules.exists({ table: "conductor", column: "id" }),
        rules.required(),
      ]),
      numero_seguro: schema.number([rules.required()]),
      nombre_seguro: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(40),
        rules.minLength(3),
      ]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "id_paciente.required": "El paciente es requerido",
          "id_paciente.number": "El paciente debe ser un número",
          "id_paciente.exists": "El paciente no existe",
          "numero_seguro.required": "El número de seguro es requerido",
          "numero_seguro.number": "El número de seguro debe ser un número",
          "nombre_seguro.required": "El nombre del seguro es requerido",
          "nombre_seguro.string": "El nombre del seguro debe ser un texto",
          "nombre_seguro.minLength":
            "El nombre del seguro debe tener al menos 3 caracteres",
          "nombre_seguro.maxLength":
            "El nombre del seguro debe tener como máximo 40 caracteres",
        },
      });
      const { id_paciente, numero_seguro, nombre_seguro } = data;
      const seguro = new Seguro();
      seguro.id_paciente = id_paciente;
      seguro.numero_seguro = numero_seguro;
      seguro.nombre_seguro = nombre_seguro;
      await seguro.save();

      return response.status(201).json({
        message: "Seguro creado correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear el seguro",
        data: error,
      });
    }
  }
  public async getSeguros({ response }: HttpContextContract) {
    const seguros = await Seguro.all();
    return response.status(200).json(seguros);
  }
  public async getSeguro({ response, params }: HttpContextContract) {
    const seguro = await Seguro.find(params.id);
    if (!seguro) {
      return response.status(404).json({ message: "Seguro no encontrado" });
    }
    return response.status(200).json(seguro);
  }
  public async update({ request, response, params }: HttpContextContract) {
    const seguro = await Seguro.find(params.id);
    if (seguro) {
      const validationSchema = schema.create({
        id_paciente: schema.number([
          rules.exists({ table: "conductor", column: "id" }),
          rules.required(),
        ]),
        numero_seguro: schema.number([rules.required()]),
        nombre_seguro: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(40),
          rules.minLength(3),
        ]),
      });
      try {
        const data = await request.validate({
          schema: validationSchema,
          messages: {
            "id_paciente.required": "El paciente es requerido",
            "id_paciente.number": "El paciente debe ser un número",
            "id_paciente.exists": "El paciente no existe",
            "numero_seguro.required": "El número de seguro es requerido",
            "numero_seguro.number": "El número de seguro debe ser un número",
            "nombre_seguro.required": "El nombre del seguro es requerido",
            "nombre_seguro.string": "El nombre del seguro debe ser un texto",
            "nombre_seguro.minLength":
              "El nombre del seguro debe tener al menos 3 caracteres",
            "nombre_seguro.maxLength":
              "El nombre del seguro debe tener como máximo 40 caracteres",
          },
        });
        const { id_paciente, numero_seguro, nombre_seguro } = data;
        seguro.id_paciente = id_paciente;
        seguro.numero_seguro = numero_seguro;
        seguro.nombre_seguro = nombre_seguro;
        await seguro.save();

        return response.status(200).json({
          message: "Seguro actualizado correctamente",
          data: data,
        });
      } catch (error) {
        console.error(error);
        return response.status(400).json({
          message: "Error al actualizar el seguro",
          data: error,
        });
      }
    }
    return response.status(404).json({ message: "Seguro no encontrado" });
  }
  public async delete({ response, params }: HttpContextContract) {
    const seguro = await Seguro.find(params.id);

    if (!seguro) {
      return response.status(404).json({ message: "Seguro no encontrado" });
    }
    seguro.status = 0;
    await seguro.save();
    return response
      .status(200)
      .json({ message: "Seguro eliminado correctamente" });
  }
}
