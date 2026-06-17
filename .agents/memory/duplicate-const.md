---
name: Duplicate const crash
description: Declarar const dos veces rompe todo el JS de la app.
---

## El problema
Si en el mismo script hay `const CLOUDINARY_CLOUD_NAME = ...` dos veces (en bloques distintos pero dentro del mismo `<script>`), el navegador lanza SyntaxError antes de ejecutar nada. Resultado: toda la app queda sin funcionalidad — sin navegación, sin títulos visibles, sin nada.

**Why:** JavaScript no permite redeclarar `const` en el mismo scope.

**How to apply:** Antes de agregar nuevas constantes de Cloudinary/Firebase/etc., buscar con grep si ya existen en el mismo bloque script.
