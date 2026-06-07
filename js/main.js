import { DataAdapter } from "./DataAdapter.js";
import { MotoFactory } from "./MotoFactory.js";
import { CatalogStore } from "./CatalogStore.js";
import { renderDashboard, renderError, renderFeatures, renderHome } from "./ui.js";

const navLinks = document.querySelectorAll(".nav-link");
const navLinksContainer = document.querySelector("#navLinks");
const menuButton = document.querySelector("#menuButton");

const dataAdapter = new DataAdapter("./data/data.json");
const store = CatalogStore.getInstancia();

async function iniciarAplicacion() {
  try {
    const datosRaw = await dataAdapter.obtenerDatos();
    const motos = MotoFactory.crearMotos(datosRaw);
    store.cargarMotos(motos);
    navegar();
  } catch (error) {
    renderError(error.message);
  }
}

function navegar() {
  // Limpiar observadores al cambiar de vista en la SPA
  store.limpiarObservadores();

  const ruta = obtenerRuta();

  actualizarNavbar(ruta);

  if (ruta === "dashboard") {
    renderDashboard();
    return;
  }

  if (ruta === "features") {
    renderFeatures();
    return;
  }

  renderHome();
}

function obtenerRuta() {
  const hash = window.location.hash.replace("#", "");
  return hash || "home";
}

function actualizarNavbar(ruta) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.route === ruta);
  });
}

window.addEventListener("hashchange", navegar);

menuButton.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-route]");

  if (link) {
    navLinksContainer.classList.remove("open");
  }
});

iniciarAplicacion();
