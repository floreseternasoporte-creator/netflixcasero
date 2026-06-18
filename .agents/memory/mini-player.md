---
name: Mini player DramaBox
description: La sección Mini usa un player vertical dedicado, NO el series detail modal.
---

## Arquitectura
- `#miniSection` = grid de tarjetas portrait 9:16 (pantalla de catálogo)
- `#miniPlayer` = player vertical full-screen estilo DramaBox/TikTok (pantalla de reproducción)
- `miniDatabase` = objeto con las minis cargadas desde Firebase `miniDramas/`

## Flujo de navegación
1. Usuario va a sección Mini → `showMiniSection()` → muestra `#miniSection`
2. Toca una card → `showMiniPlayer(miniId, 0)` → oculta bottom nav, abre `#miniPlayer`
3. Usuario cierra → `closeMiniPlayer()` → muestra bottom nav

## Funciones clave del mini player
- `showMiniPlayer(miniId, epIdx)` — abre el player con la mini y episodio inicial
- `_playMiniEp(idx)` — carga y reproduce un episodio específico
- `toggleMiniPlay()` — pausa/reanuda
- `nextMiniEpisode()` / `prevMiniEpisode()` — navegación entre episodios
- `toggleMiniEpsSheet()` / `closeMiniEpsSheet()` — bottom sheet de lista de episodios
- `seekMiniProgress(e)` — seek en la barra de progreso
- `toggleMiniLike()` — botón de like

**Why:** El usuario quería exactamente el estilo DramaBox — player vertical con controles laterales y episodios en bottom sheet, diferente al player horizontal de películas/series.

**How to apply:** Para nuevas funciones del mini player, usar las funciones `_playMiniEp` y las variables `_miniPlayerMini`, `_miniPlayerEpIdx`. Para cambios visuales, editar las clases CSS `.mini-player-*`.
