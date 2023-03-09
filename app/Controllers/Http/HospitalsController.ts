import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Hospital from "App/Models/Hospital";

export default class HospitalsController {
  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      no_de_seguro: schema.number([rules.required()]),
      numero_de_seo: schema.number([rules.required()]),
      nombre_del_hospital: schema.string({ trim: true, escape: true }, [
        rules.required(),
        rules.maxLength(100),
        rules.minLength(3),
      ]),
    });
    try {
      const data = await request.validate({
        schema: validationSchema,
        messages: {
          "no_de_seguro.required": "El no de seguro es requerido",
          "no_de_seguro.number": "El no de seguro debe ser un número",
          "numero_de_seo.required": "El numero de seo es requerido",
          "numero_de_seo.number": "El numero de seo debe ser un número",
          "nombre_del_hospital.required": "El nombre del hospital es requerido",
          "nombre_del_hospital.string":
            "El nombre del hospital debe ser un texto",
          "nombre_del_hospital.minLength":
            "El nombre del hospital debe tener al menos 3 caracteres",
          "nombre_del_hospital.maxLength":
            "El nombre del hospital debe tener como máximo 100 caracteres",
        },
      });
      const { no_de_seguro, numero_de_seo, nombre_del_hospital } = data;
      const hospital = new Hospital();
      hospital.no_de_seguro = no_de_seguro;
      hospital.numero_de_seo = numero_de_seo;
      hospital.nombre_del_hospital = nombre_del_hospital;
      await hospital.save();

      return response.status(201).json({
        message: "Hospital creado correctamente",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        message: "Error al crear el hospital",
        data: error,
      });
    }
  }
  public async getHospitals({ response }: HttpContextContract) {
    const hospitals = await Hospital.all();
    return response.status(200).json(hospitals);
  }
  public async getHospital({ params, response }: HttpContextContract) {
    const hospital = await Hospital.find(params.id);
    if (hospital) {
      return response.status(200).json(hospital);
    } else {
      return response.status(404).json({ message: "Hospital no encontrado" });
    }
  }
  public async update({ request, response, params }: HttpContextContract) {
    const hospital = await Hospital.find(params.id);
    if (hospital) {
      const validationSchema = schema.create({
        no_de_seguro: schema.number([rules.required()]),
        numero_de_seo: schema.number([rules.required()]),
        nombre_del_hospital: schema.string({ trim: true, escape: true }, [
          rules.required(),
          rules.maxLength(100),
          rules.minLength(3),
        ]),
      });
      try {
        const data = await request.validate({
          schema: validationSchema,
          messages: {
            "no_de_seguro.required": "El no de seguro es requerido",
            "no_de_seguro.number": "El no de seguro debe ser un número",
            "numero_de_seo.required": "El numero de seo es requerido",
            "numero_de_seo.number": "El numero de seo debe ser un número",
            "nombre_del_hospital.required":
              "El nombre del hospital es requerido",
            "nombre_del_hospital.string":
              "El nombre del hospital debe ser un texto",
            "nombre_del_hospital.minLength":
              "El nombre del hospital debe tener al menos 3 caracteres",
            "nombre_del_hospital.maxLength":
              "El nombre del hospital debe tener como máximo 100 caracteres",
          },
        });
        const { no_de_seguro, numero_de_seo, nombre_del_hospital } = data;
        hospital.no_de_seguro = no_de_seguro;
        hospital.numero_de_seo = numero_de_seo;
        hospital.nombre_del_hospital = nombre_del_hospital;
        await hospital.save();

        return response.status(200).json({
          message: "Hospital actualizado correctamente",
          data: data,
        });
      } catch (error) {
        console.error(error);
        return response.status(400).json({
          message: "Error al actualizar el hospital",
          data: error,
        });
      }
    } else {
      return response.status(404).json({ message: "Hospital no encontrado" });
    }
  }
  public async delete({ params, response }: HttpContextContract) {
    const hospital = await Hospital.find(params.id);
    if (hospital) {
      hospital.status = 0;
      await hospital.save();
      return response
        .status(200)
        .json({ message: "Hospital eliminado correctamente" });
    } else {
      return response.status(404).json({ message: "Hospital no encontrado" });
    }
  }
}
