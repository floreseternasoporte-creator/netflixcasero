---
name: Mini multilingual system
description: Sistema i18n completo para la sección Mini — arquitectura, helpers, y campos de Firebase.
---

## Sistema de traducción Mini (ES/EN solamente, como DramaBox)

### Arquitectura

- `MINI_TRANSLATIONS` — diccionario `{ es: {...}, en: {...} }` con todas las claves UI
- `t(key)` — helper que devuelve string en `currentLanguage`
- `applyMiniTranslations()` — aplica `t(key)` a todos los `[data-i18n]` del DOM
- `getLocalizedMiniTitle(mini)` — `titleEn` → `titleEs` → `spanishTitle` → `title`
- `getLocalizedMiniPoster(mini)` — `posterEn` → `posterEs` → `posterOriginal` → `poster`
- `getLocalizedMiniDesc(mini)` — `descriptionEn` → `descriptionEs` → `description`
- `isMiniAdmin()` — chequea `currentFirebaseUser.email === MINI_ADMIN_EMAIL`

### Cuándo llamar applyMiniTranslations()
- `showMiniSection()` — al abrir la sección Mini
- `handleLanguageChange(lang)` — al cambiar idioma en settings
- `openMiniUpload()` — al abrir el modal de subida
- `openMiniEdit(id)` — al abrir el modal de edición
- `DOMContentLoaded` — con setTimeout 300ms para asegurar que el DOM esté listo

### Campos de Firebase por item Mini
- `title` — título idioma original
- `titleEs` — título español
- `titleEn` — título inglés
- `spanishTitle` — alias de titleEs (backwards compat)
- `description` / `descriptionEs` — descripción español
- `descriptionEn` — descripción inglés
- `poster` / `posterOriginal` — portada idioma original
- `posterEs` — portada español
- `posterEn` — portada inglés

### Upload modal
- Step 1: 3 pickers de portada — `miniCoverInputOrig` (required), `miniCoverInputEs`, `miniCoverInputEn`
- Step 2: `miniTitleInput` (orig), `miniTitleEsInput`, `miniTitleEnInput`, `miniDescInput` (ES), `miniDescEnInput`
- `handleMiniCoverUpload(input, coverType)` — coverType: 'orig'|'es'|'en'
- `miniUploadData` contiene: `coverUrl`, `coverUrlOrig`, `coverUrlEs`, `coverUrlEn`

### Admin edit modal
- `#miniEditModal` — bottom sheet con 3 poster thumbs + todos los campos bilingüe
- `openMiniEdit(miniId)` — carga datos de Firebase y popula el form
- `saveMiniEdit()` — hace update parcial en Firebase, llama renderMiniGrid + renderMiniCarousel
- `deleteMini()` — elimina el item y cierra el modal
- `handleMiniEditCover(input, type)` — sube a Cloudinary y actualiza `_miniEditPosters[type]`

### Inicialización del idioma
- `currentLanguage` se inicializa desde `localStorage.getItem('atenis_language') || 'es'` (línea ~7875)
- Settings al cargarse: sincroniza `settings.language` con `atenis_language` en localStorage y actualiza `currentLanguage`
- El selector en settings: `#interfaceLanguage` — solo ES/EN (removido PT)

**Why:** DramaBox sirve el mismo contenido en múltiples idiomas sin duplicar los episodios, solo cambia titulo/portada/descripción según preferencia del usuario.
