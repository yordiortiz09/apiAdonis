import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import Receta from "App/Models/Receta";


export default class RecetasController {
    
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(30),
        rules.minLength(3),
      ]),
      duracion: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(40),
        rules.minLength(3),
      ]),
      preparacion: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(255),
        rules.minLength(3),
      ]),
      chef: schema.number([rules.required(), rules.range(1, 1000)]),
      ingrediente: schema.number([rules.required(), rules.range(1, 1000)]),
      tipo_plato: schema.number([rules.required(), rules.range(1, 1000)]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "nombre.required": "El nombre es requerido",
          "nombre.string": "El nombre debe ser un texto",
          "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
          "nombre.maxLength": "El nombre debe tener como máximo 30 caracteres",
          "duracion.required": "La duración es requerida",
          "duracion.string": "La duración debe ser un texto",
          "duracion.minLength": "La duración debe tener al menos 3 caracteres",
          "duracion.maxLength":
            "La duración debe tener como máximo 40 caracteres",
          "preparacion.required": "La preparación es requerida",
          "preparacion.string": "La preparación debe ser un texto",
          "preparacion.minLength":
            "La preparación debe tener al menos 3 caracteres",
          "preparacion.maxLength":
            "La preparación debe tener como máximo 255 caracteres",
          "chef.required": "El chef es requerido",
          "chef.number": "El chef debe ser un número",
          "chef.range": "El chef debe estar entre 1 y 1000",
          "ingrediente.required": "El ingrediente es requerido",
          "ingrediente.number": "El ingrediente debe ser un número",
          "ingrediente.range": "El ingrediente debe estar entre 1 y 1000",
          "tipo_plato.required": "El tipo de plato es requerido",
          "tipo_plato.number": "El tipo de plato debe ser un número",
          "tipo_plato.range": "El tipo de plato debe estar entre 1 y 1000",
        },
      });
      const { nombre, duracion, preparacion, chef, ingrediente, tipo_plato } =
        data;
      const receta = new Receta();
      receta.nombre = nombre;
      receta.duracion = duracion;
      receta.preparacion = preparacion;
      receta.chef = chef;
      receta.ingrediente = ingrediente;
      receta.tipo_plato = tipo_plato;
      await receta.save();

      return response.status(201).json({
        message: "Receta creada correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear la receta",
        data: error,
      });
    }
  }
  public async getRecetas({ response }: HttpContextContract) {
    const recetas = await Receta.all();
    return response.status(200).json(recetas);
  }
  public async getReceta({ params, response }: HttpContextContract) {
    const receta = await Receta.find(params.id);
    if (receta) {
      return response.status(200).json(receta);
    } else {
      return response.status(404).json({ message: "Receta no encontrada" });
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    const receta = await Receta.find(params.id);
    if (receta) {
      const validationSchema = schema.create({
        nombre: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(30),
          rules.minLength(3),
        ]),
        duracion: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(40),
          rules.minLength(3),
        ]),
        preparacion: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(255),
          rules.minLength(3),
        ]),
        chef: schema.number([rules.required(), rules.range(1, 1000)]),
        ingrediente: schema.number([rules.required(), rules.range(1, 1000)]),
        tipo_plato: schema.number([rules.required(), rules.range(1, 1000)]),
      });
      try {
        const data = await request.validate({
          schema: validationSchema,
          messages: {
            "nombre.required": "El nombre es requerido",
            "nombre.string": "El nombre debe ser un texto",
            "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
            "nombre.maxLength":
              "El nombre debe tener como máximo 30 caracteres",
            "duracion.required": "La duración es requerida",
            "duracion.string": "La duración debe ser un texto",
            "duracion.minLength":
              "La duración debe tener al menos 3 caracteres",
            "duracion.maxLength":
              "La duración debe tener como máximo 40 caracteres",
            "preparacion.required": "La preparación es requerida",
            "preparacion.string": "La preparación debe ser un texto",
            "preparacion.minLength":
              "La preparación debe tener al menos 3 caracteres",
            "preparacion.maxLength":
              "La preparación debe tener como máximo 255 caracteres",
            "chef.required": "El chef es requerido",
            "chef.number": "El chef debe ser un número",
            "chef.range": "El chef debe estar entre 1 y 1000",
            "ingrediente.required": "El ingrediente es requerido",
            "ingrediente.number": "El ingrediente debe ser un número",
            "ingrediente.range": "El ingrediente debe estar entre 1 y 1000",
            "tipo_plato.required": "El tipo de plato es requerido",
            "tipo_plato.number": "El tipo de plato debe ser un número",
            "tipo_plato.range": "El tipo de plato debe estar entre 1 y 1000",
          },
        });
        const { nombre, duracion, preparacion, chef, ingrediente, tipo_plato } =
          data;
        receta.nombre = nombre;
        receta.duracion = duracion;
        receta.preparacion = preparacion;
        receta.chef = chef;
        receta.ingrediente = ingrediente;
        receta.tipo_plato = tipo_plato;
        await receta.save();
        return response.status(200).json({
          message: "Receta actualizada correctamente",
          data: data,
        });
      } catch (error) {
        console.error(error);
        return response.status(400).json({
          message: "Error al actualizar la receta",
          data: error,
        });
      }
    } else {
      return response.status(404).json({ message: "Receta no encontrada" });
    }
  }
  public async delete({ params, response }: HttpContextContract) {
    const receta = await Receta.find(params.id);
    

  
    if (!receta) {
      return response.status(404).json({
        status: 404,
        message: "Receta no encontrada",
        data: null,
        error: null,
      });
    }
 
    Database.from("recetas").where("id", params.id).delete();

   

    return response.status(200).json({
      status: 200,
      message: "Receta eliminada correctamente",
      data: null,
      error: null,
    });
  }
  
}
