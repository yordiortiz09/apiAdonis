import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Ingrediente from "App/Models/Ingrediente";

export default class IngredientesController {
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      ingredientes: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(255),
        rules.minLength(3),
      ]),
      unidades: schema.number([rules.required(), rules.range(1, 100)]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "ingredientes.required": "El ingrediente es requerido",
          "ingredientes.string": "El ingrediente debe ser un texto",
          "ingredientes.minLength":
            "El ingrediente debe tener al menos 3 caracteres",
          "ingredientes.maxLength":
            "El ingrediente debe tener como máximo 255 caracteres",
          "unidades.required": "La unidad es requerida",
          "unidades.number": "La unidad debe ser un número",
          "unidades.range": "La unidad debe estar entre 1 y 100",
        },
      });
      const { ingredientes, unidades } = data;
      const ingrediente = new Ingrediente();
      ingrediente.ingredientes = ingredientes;
      ingrediente.unidades = unidades;
      await ingrediente.save();

      return response.status(201).json({
        message: "Ingrediente creado correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear el ingrediente",
        data: error,
      });
    }
  }
  public async getIngredientes({ response }: HttpContextContract) {
    const ingredientes = await Ingrediente.all();
    return response.status(200).json(ingredientes);
  }
  public async getIngrediente({ response, params }: HttpContextContract) {
    const ingrediente = await Ingrediente.find(params.id);
    if (!ingrediente) {
      return response.status(404).json({
        status: 404,
        msg: "Ingrediente no encontrado",
        error: null,
        data: null,
      });
    }
    return response.status(200).json(ingrediente);
  }
  public async update({ request, response, params }: HttpContextContract) {
    const validationSchema = schema.create({
      ingredientes: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(255),
        rules.minLength(3),
      ]),
      unidades: schema.number([rules.required(), rules.range(1, 100)]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "ingredientes.required": "El ingrediente es requerido",
          "ingredientes.string": "El ingrediente debe ser un texto",
          "ingredientes.minLength":
            "El ingrediente debe tener al menos 3 caracteres",
          "ingredientes.maxLength":
            "El ingrediente debe tener como máximo 255 caracteres",
          "unidades.required": "La unidad es requerida",
          "unidades.number": "La unidad debe ser un número",
          "unidades.range": "La unidad debe estar entre 1 y 100",
        },
      });
      const { ingredientes, unidades } = data;
      const ingrediente = await Ingrediente.findOrFail(params.id);
      if (ingrediente) {
        ingrediente.ingredientes = ingredientes;
        ingrediente.unidades = unidades;
        await ingrediente.save();
        return response.status(200).json({
          message: "Ingrediente actualizado correctamente",
          data: ingrediente,
        });
      } else {
        return response.status(404).json({
          message: "El ingrediente no existe",
          data: null,
        });
      }
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al actualizar el ingrediente",
        data: error,
      });
    }
  }
    public async delete({ response, params }: HttpContextContract) {
        const ingrediente = await Ingrediente.find(params.id);

        if (!ingrediente) {
            return response.status(404).json({
                status: 404,
                msg: "Ingrediente no encontrado",
                error: null,
                data: null,
            });
        }

      ingrediente.delete();

        return response.status(200).json({
            status: 200,
            msg: "Se ha eliminado correctamente",
            error: null,
            data: ingrediente,
        });
    }
}
