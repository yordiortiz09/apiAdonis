import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import TipoAvion from "App/Models/TipoAvion";

export default class AvionsController {
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      id_piloto: schema.number([
        rules.exists({ table: "conductors", column: "id" }),
        rules.required(),
      ]),
      aerolinea: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(40),
        rules.minLength(3),
      ]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "id_piloto.required": "El piloto es requerido",
          "id_piloto.number": "El piloto debe ser un número",
          "id_piloto.exists": "El piloto no existe",
          "aerolinea.required": "La aerolínea es requerida",
          "aerolinea.string": "La aerolínea debe ser un texto",
          "aerolinea.minLength":
            "La aerolínea debe tener al menos 3 caracteres",
          "aerolinea.maxLength":
            "La aerolínea debe tener como máximo 40 caracteres",
        },
      });
      const { id_piloto, aerolinea } = data;
      const tipoAvion = new TipoAvion();
      tipoAvion.id_piloto = id_piloto;
      tipoAvion.aerolinea = aerolinea;
      await tipoAvion.save();

      return response.status(201).json({
        message: "Tipo de avión creado correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear el tipo de avión",
        data: error,
      });
    }
  }
  public async getAvions({ response }: HttpContextContract) {
    const avions = await TipoAvion.all();
    return response.status(200).json(avions);
  }
  public async getAvion({ response, params }: HttpContextContract) {
    const avion = await TipoAvion.find(params.id);
    if (avion) {
      return response.status(200).json(avion);
    }
    return response.status(404).json({
      message: "Avión no encontrado",
      id: params.id,
    });
  }
  public async update({ request, response, params }: HttpContextContract) {
    const avion = await TipoAvion.find(params.id);
    if (avion) {
      const validationSchema = schema.create({
        id_piloto: schema.number([
          rules.exists({ table: "conductors", column: "id" }),
          rules.required(),
        ]),
        aerolinea: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(40),
          rules.minLength(3),
        ]),
      });
      try {
        const data = await request.validate({
          schema: validationSchema,
          messages: {
            "id_piloto.required": "El piloto es requerido",
            "id_piloto.number": "El piloto debe ser un número",
            "id_piloto.exists": "El piloto no existe",
            "aerolinea.required": "La aerolínea es requerida",
            "aerolinea.string": "La aerolínea debe ser un texto",
            "aerolinea.minLength":
              "La aerolínea debe tener al menos 3 caracteres",
            "aerolinea.maxLength":
              "La aerolínea debe tener como máximo 40 caracteres",
          },
        });
        const { id_piloto, aerolinea } = data;
        avion.id_piloto = id_piloto;
        avion.aerolinea = aerolinea;
        await avion.save();

        return response.status(200).json({
          message: "Tipo de avión actualizado correctamente",
          data: data,
        });
      } catch (error) {
        console.error(error);
        return response.status(400).json({
          message: "Error al actualizar el tipo de avión",
          data: error,
        });
      }
    }
    return response.status(404).json({
      message: "Avión no encontrado",
      id: params.id,
    });
  }
  public async delete({ response, params }: HttpContextContract) {
    const avion = await TipoAvion.find(params.id);
    if (avion) {
      avion.status = 0;
      await avion.save();
      return response.status(200).json({
        message: "Avión eliminado correctamente",
        id: params.id,
      });
    }
    return response.status(404).json({
      message: "Avión no encontrado",
      id: params.id,
    });
  }
}
