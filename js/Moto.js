export class Moto {
  #id;
  #nombre;
  #equipo;
  #marca;
  #anio;
  #velocidadMaxima;
  #imagen;

  constructor({ id, nombre, equipo, marca, anio, velocidadMaxima, imagen }) {
    this.#id = id;
    this.#nombre = nombre;
    this.#equipo = equipo;
    this.#marca = marca;
    this.#anio = anio;
    this.#velocidadMaxima = velocidadMaxima;
    this.#imagen = imagen;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get equipo() {
    return this.#equipo;
  }

  get marca() {
    return this.#marca;
  }

  get anio() {
    return this.#anio;
  }

  get velocidadMaxima() {
    return this.#velocidadMaxima;
  }

  get imagen() {
    return this.#imagen;
  }
}
