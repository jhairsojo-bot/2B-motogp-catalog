# AGENTS.md — MotoGP Livery Catalog

## Project overview

Vanilla JS SPA — MotoGP prototype bike catalog. No bundler, no framework, no package.json. ES modules loaded directly in the browser via `<script type="module">`.

## Quick start

```bash
node server.js          # serves on http://localhost:5500
```

No `npm install` needed. The server is a zero-dependency Node.js static file server (path traversal guarded).

## Architecture

| File | Role |
|---|---|
| `index.html` | Shell with hash-based SPA nav (Home / Features / Dashboard) |
| `js/main.js` | Entrypoint: bootstraps DataAdapter → MotoFactory → CatalogStore → routing |
| `js/CatalogStore.js` | Singleton state store + Observer pattern |
| `js/DataAdapter.js` | Fetches & normalizes `data/data.json` |
| `js/Moto.js` | Immutable model (private fields, getters) |
| `js/MotoFactory.js` | Validation + construction of Moto instances |
| `js/search.js` | Linear search across nombre/equipo/marca |
| `js/sort.js` | Bubble sort (4 criteria: anio-desc, anio-asc, velocidad-desc, velocidad-asc) |
| `js/ui.js` | Renders all views (Home, Features, Dashboard cards) |
| `css/styles.css` | Dark theme, responsive (breakpoints: 900px, 540px, 380px) |
| `data/data.json` | Static catalog of 11 bikes across 5 manufacturers |

## Key patterns

- **Singleton**: `CatalogStore.getInstancia()` — single state store
- **Observer**: views subscribe via `store.subscribe({ update() })`; `limpiarObservadores()` clears on route change
- **Factory**: `MotoFactory.crearMoto(raw)` validates required fields before constructing Moto
- **Adapter**: `DataAdapter` normalizes raw JSON (coerces types)

## State & persistence

- Search text and sort order persisted to `localStorage` keys `motogpUltimaBusqueda` / `motogpUltimoOrden`
- Store exposes `motosFiltradasYOrdenadas` computed getter (filter then sort)

## Sorting criteria

`anio-desc` | `anio-asc` | `velocidad-desc` | `velocidad-asc`

## Image fallback

Cards show `<img>` with `onerror` that hides the image and reveals a `.image-fallback` div (CSS managed).

## No tests / no CI

No test framework, no CI config. Manual browser verification only.

## No package.json

All JS is vanilla — no linter, no formatter, no typechecker. No `node_modules/` ever needed.
