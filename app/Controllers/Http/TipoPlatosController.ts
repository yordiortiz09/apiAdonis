 import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema, rules } from "@ioc:Adonis/Core/Validator";
import TipoPlato from 'App/Models/TipoPlato';

export default class TipoPlatosController {

    public async create({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
            nombre: schema.string({ trim: true, escape: true }, [
                rules.required(),
                rules.maxLength(25),
                rules.minLength(3),
            ]),
            descripcion: schema.string({ trim: true, escape: true }, [
                rules.required(),
                rules.maxLength(255),
                rules.minLength(3),
            ]),
        });
        try {
            const data = await request.validate({
                schema: validationSchema,
                messages: {
                    "nombre.required": "El nombre es requerido",
                    "nombre.string": "El nombre debe ser un texto",
                    "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
                    "nombre.maxLength": "El nombre debe tener como máximo 25 caracteres",
                    "descripcion.required": "La descripción es requerida",
                    "descripcion.string": "La descripción debe ser un texto",
                    "descripcion.minLength": "La descripción debe tener al menos 3 caracteres",
                    "descripcion.maxLength": "La descripción debe tener como máximo 255 caracteres",
                },
            });
            const { nombre, descripcion } = data;
            const tipoPlato = new TipoPlato();
            tipoPlato.nombre = nombre;
            tipoPlato.descripcion = descripcion;
            await tipoPlato.save();

            return response.status(201).json({
                message: "Tipo de plato creado correctamente",
                data: data,
            });
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                message: "Error al crear el tipo de plato",
                data: error,
            });
        }
    }
    public async getTipoPlatos({ response }: HttpContextContract) {
        const tipoPlatos = await TipoPlato.all();
        return response.status(200).json(tipoPlatos);
    }
    public async tipoPlatoInfo({ response, params }: HttpContextContract) {
        try {
            const tipoPlato = await TipoPlato.findOrFail(params.id);
            return response.status(200).json(tipoPlato);
        } catch (error) {
            return response.status(404).json({
                message: "Tipo de plato no encontrado",
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
            descripcion: schema.string({ trim: true, escape: true }, [
                rules.required(),
                rules.maxLength(255),
                rules.minLength(3),
            ]),
        });
        try {
            const data = await request.validate({
                schema: validationSchema,
                messages: {
                    "nombre.required": "El nombre es requerido",
                    "nombre.string": "El nombre debe ser un texto",
                    "nombre.minLength": "El nombre debe tener al menos 3 caracteres",
                    "nombre.maxLength": "El nombre debe tener como máximo 25 caracteres",
                    "descripcion.required": "La descripción es requerida",
                    "descripcion.string": "La descripción debe ser un texto",
                    "descripcion.minLength": "La descripción debe tener al menos 3 caracteres",
                    "descripcion.maxLength": "La descripción debe tener como máximo 255 caracteres",
                },
            });
            const { nombre, descripcion } = data;
            const tipoPlato = await TipoPlato.findOrFail(params.id);
            if (tipoPlato) {
                tipoPlato.nombre = nombre;
                tipoPlato.descripcion = descripcion;
                await tipoPlato.save();
                return response.status(200).json({
                    message: "Tipo de plato actualizado correctamente",
                    data: tipoPlato,
                });
            } else {
                return response.status(404).json({
                    message: "El tipo de plato no existe",
                    data: null,
                });
            }
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                message: "Error al actualizar el tipo de plato",
                data: error,
            });
        }
    }
    public async delete({ response, params }: HttpContextContract) {
        const tipoPlato = await TipoPlato.find(params.id);

        if (!tipoPlato) {
            return response.status(404).json({
                status: 404,
                msg: "Tipo de plato no encontrado",
                error: null,
                data: null,
            });
        }

        tipoPlato.status = 0;
        await tipoPlato.save();

        return response.status(200).json({
            status: 200,
            msg: "Se ha eliminado correctamente",
            error: null,
            data: tipoPlato,
        });
    }



}

