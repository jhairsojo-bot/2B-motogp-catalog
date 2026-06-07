export class DataAdapter {
  #url;

  constructor(url) {
    this.#url = url;
  }

  /**
   * Obtiene los datos del archivo externo y los adapta a un formato normalizado.
   * @returns {Promise<Array<Object>>}
   */
  async obtenerDatos() {
    const respuesta = await fetch(this.#url);

    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar el archivo desde la ruta: ${this.#url}`);
    }

    const datos = await respuesta.json();
    
    // Adaptador: Normalización y mapeo de datos
    return datos.map(item => ({
      id: Number(item.id),
      nombre: String(item.nombre || ""),
      equipo: String(item.equipo || ""),
      marca: String(item.marca || ""),
      anio: Number(item.anio),
      velocidadMaxima: Number(item.velocidadMaxima),
      imagen: String(item.imagen || "")
    }));
  }
}
