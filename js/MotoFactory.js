import { Moto } from "./Moto.js";

export class MotoFactory {
  /**
   * Crea una instancia de Moto a partir de datos crudos
   * @param {Object} datosRaw 
   * @returns {Moto}
   */
  static crearMoto(datosRaw) {
    if (!datosRaw.id || !datosRaw.nombre || !datosRaw.equipo || !datosRaw.marca || !datosRaw.anio || !datosRaw.velocidadMaxima) {
      throw new Error("Datos de moto inválidos o incompletos.");
    }
    return new Moto(datosRaw);
  }

  /**
   * Crea un array de instancias de Moto a partir de una lista de datos crudos
   * @param {Array<Object>} arrayDatosRaw 
   * @returns {Array<Moto>}
   */
  static crearMotos(arrayDatosRaw) {
    if (!Array.isArray(arrayDatosRaw)) {
      throw new Error("Se esperaba un array de datos de motos.");
    }
    return arrayDatosRaw.map(datos => MotoFactory.crearMoto(datos));
  }
}
