---
name: Settings accordion
description: Settings usa grupos accordion estilo iOS con cards colapsables.
---

## Estructura HTML
```html
<div class="settings-group [open]">
  <div class="settings-group-toggle" onclick="toggleSettingsGroup(this)">
    <div class="settings-group-icon" style="background:..."><i class="fas fa-..." style="color:..."></i></div>
    <span class="settings-group-label">Nombre del grupo</span>
    <i class="fas fa-chevron-right settings-group-arrow"></i>
  </div>
  <div class="settings-group-body">
    <!-- .setting-item items -->
  </div>
</div>
```

## Colores de iconos por grupo
- Cuenta: fondo `#1a2540`, ícono `#4c6ef5` (azul)
- Reproducción: fondo `#1a1e40`, ícono `#7c6ef5` (violeta)
- Idioma: fondo `#1a2a20`, ícono `#4dc47c` (verde)
- Control Parental: fondo `#2a1a1a`, ícono `#e55555` (rojo)
- Notificaciones: fondo `#2a2210`, ícono `#f5a623` (naranja)

## Advertencia en uber-theme.css
El bloque `.settings-group` en uber-theme.css DEBE estar vacío (solo comentario).
Si tiene `background: transparent !important; border: none !important`, destruye los estilos de las cards.

**Why:** El usuario quería folders/secciones colapsables como en iOS Settings / DramaBox.
**How to apply:** `toggleSettingsGroup(toggleEl)` alterna la clase `.open` en el `.settings-group`.
