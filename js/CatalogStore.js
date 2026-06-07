import { buscarMotosLineal } from "./search.js";
import { ordenarMotosBurbuja } from "./sort.js";

export class CatalogStore {
  #motos = [];
  #observers = [];
  #textoBusqueda = "";
  #criterioOrden = "anio-desc";

  static #instancia = null;

  constructor() {
    if (CatalogStore.#instancia) {
      return CatalogStore.#instancia;
    }
    CatalogStore.#instancia = this;
  }

  /**
   * Obtiene la instancia única de CatalogStore (Singleton)
   * @returns {CatalogStore}
   */
  static getInstancia() {
    if (!CatalogStore.#instancia) {
      CatalogStore.#instancia = new CatalogStore();
    }
    return CatalogStore.#instancia;
  }

  /**
   * Carga el catálogo inicial de motos
   * @param {Array<Moto>} motos 
   */
  cargarMotos(motos) {
    this.#motos = motos;
    this.notify();
  }

  get motos() {
    return [...this.#motos];
  }

  get textoBusqueda() {
    return this.#textoBusqueda;
  }

  get criterioOrden() {
    return this.#criterioOrden;
  }

  setBusqueda(texto) {
    this.#textoBusqueda = texto;
    this.notify();
  }

  setOrden(criterio) {
    this.#criterioOrden = criterio;
    this.notify();
  }

  /**
   * Retorna la lista de motos filtrada y ordenada según el estado actual
   * @returns {Array<Moto>}
   */
  get motosFiltradasYOrdenadas() {
    const filtradas = buscarMotosLineal(this.#motos, this.#textoBusqueda);
    return ordenarMotosBurbuja(filtradas, this.#criterioOrden);
  }

  /**
   * Suscribe un observador para recibir notificaciones de cambios
   * @param {Object} observer 
   */
  subscribe(observer) {
    if (typeof observer.update === "function") {
      this.#observers.push(observer);
    } else {
      throw new Error("El observador debe implementar el método update()");
    }
  }

  /**
   * Desinscribe un observador
   * @param {Object} observer 
   */
  unsubscribe(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  /**
   * Notifica a todos los observadores registrados
   */
  notify() {
    this.#observers.forEach(obs => {
      try {
        obs.update();
      } catch (error) {
        console.error("Error notificando al observador:", error);
      }
    });
  }

  /**
   * Elimina todos los observadores actuales (útil al navegar en la SPA)
   */
  limpiarObservadores() {
    this.#observers = [];
  }
}
