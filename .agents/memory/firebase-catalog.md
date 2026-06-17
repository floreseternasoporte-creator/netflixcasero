---
name: Firebase dynamic catalog
description: Cómo agregar contenido dinámico a los carruseles sin editar catalog.js.
---

## Estructura
- `catalog.js` → `seriesDatabase` (objeto JS estático, requiere edición de código)
- Firebase `miniDramas/` → mini dramas dinámicos, cargados por `loadMiniDramas()`
- Firebase `catalog/` → catálogo adicional dinámico, cargado por `loadDynamicCatalog()`

## Cómo agregar contenido vía Firebase
En Firebase Console > Realtime Database > catalog > (agregar nodo con ID único):
```json
{
  "id": "mi-pelicula",
  "title": "Título",
  "spanishTitle": "Título en Español",
  "type": "movie",
  "genre": "Acción",
  "year": "2026",
  "poster": "https://...",
  "isFeatured": true,
  "isTrending": false,
  "isLocked": false,
  "episodes": [{ "id": 1, "videoUrl": "https://..." }]
}
```

**Why:** El usuario sube contenido desde servidores externos (Dropbox/Cloudinary) y necesita que aparezca sin tocar código.

**How to apply:** `loadDynamicCatalog()` usa `.on('value')` — reacciona en tiempo real. Los items se inyectan en `seriesDatabase` y se re-renderizan carruseles y hero automáticamente.
