---
name: DeepSeek navy theme
description: CSS variables en uber-theme.css y cómo mapean a los colores de Atenis.
---

## Variables actuales (uber-theme.css)
- `--uber-black: #0a0b14` — fondo body principal
- `--uber-surface: #0d0e1a` — superficies primarias
- `--uber-surface-elevated: #111322` — tarjetas, modales
- `--uber-surface-muted: #151830` — inputs, chips
- `--uber-border: #1c1e2e` — bordes normales
- `--uber-border-strong: #252848` — bordes marcados
- `--uber-green: #4c6ef5` — acento azul (botones primarios, activos, spinners)
- `--uber-green-hover: #3b5fd4` — hover azul

**Why:** El archivo se llama uber-theme.css y usa nombres --uber-* pero los colores son navy/azul DeepSeek — no cambiar los nombres de variables ya que rompería referencias.

**How to apply:** Cualquier nuevo color de acento va en --uber-green, cualquier fondo va en las variables --uber-black/surface.
