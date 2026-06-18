---
name: Lock mode Netflix style
description: Contenido bloqueado muestra badge rojo sin blur, estilo Netflix.
---

## Carousel cards (.locked-overlay)
- Overlay semi-transparente `rgba(0,0,0,0.42)`, sin blur
- Badge rojo `#e50914` con texto "PRÓXIMAMENTE" arriba izquierda
- `.locked-icon` tiene `display: none`
- `.release-date` tiene `display: none`

## Hero (featuredHeroPlay button cuando isLocked)
- Botón muestra "Próximamente" con `background: rgba(255,255,255,0.08)`
- Borde suave `rgba(255,255,255,0.22)`
- Cursor `default`, onclick null

**Why:** El usuario quería que el contenido bloqueado se vea como Netflix — imagen visible, badge sutil, sin el blur intenso que ocultaba el poster.
**How to apply:** La clase `.locked-overlay` aplica automáticamente a los contenidos con `isLocked: true`.
