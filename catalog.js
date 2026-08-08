// ╔══════════════════════════════════════════════════════════════════════╗
// ║       CATÁLOGO DE ATENIS — ARCHIVO CENTRAL DE CONTENIDO             ║
// ╠══════════════════════════════════════════════════════════════════════╣
// ║                                                                      ║
// ║  INSTRUCCIONES PARA AGREGAR CONTENIDO                                ║
// ║  ─────────────────────────────────────────────────────────────────   ║
// ║  1. Copia la plantilla que corresponda (más abajo)                   ║
// ║  2. Pégala DENTRO de seriesDatabase, antes del último "}"            ║
// ║  3. Asegúrate de poner una COMA después del ítem anterior            ║
// ║  4. Rellena todos los campos marcados con  ←                         ║
// ║                                                                      ║
// ║  El contenido con  isFeatured: true  aparece automáticamente         ║
// ║  en el slider de inicio Y en la sección Tendencias de la app.        ║
// ║                                                                      ║
// ║  TIPOS (type):                                                       ║
// ║    'mini'  →  Mini drama / cortometraje                              ║
// ║                                                                      ║
// ║  GÉNEROS (genre):                                                    ║
// ║    Acción · Suspenso · Drama · Romance · Aventura · Terror           ║
// ║    Anime · Comedia · Documental · Fantasía · Ciencia Ficción         ║
// ║    Se pueden combinar: 'Acción, Suspenso'                            ║
// ║                                                                      ║
// ║  BLOQUEO (isLocked / releaseDate):                                   ║
// ║    isLocked: true   →  muestra "Próximamente" con cuenta regresiva   ║
// ║    isLocked: false  →  disponible para reproducir ahora mismo        ║
// ║    releaseDate      →  fecha en que se desbloquea automáticamente    ║
// ║    Formato de fecha: 'AAAA-MM-DDTHH:MM:SS-05:00'                    ║
// ║    Ejemplo:           '2026-12-25T00:00:00-05:00'                    ║
// ║                                                                      ║
// ║  IMÁGENES (poster / thumbnail):                                      ║
// ║    Sube la imagen gratis en  https://imgbb.com                       ║
// ║    Copia el enlace directo que termina en .jpg o .png                ║
// ║                                                                      ║
// ║  VIDEOS (videoUrl):                                                  ║
// ║    Sube el video a Dropbox y copia el enlace "Compartir".            ║
// ║    La plataforma convierte el enlace automáticamente.                ║
// ║                                                                      ║
// ╚══════════════════════════════════════════════════════════════════════╝


// ════════════════════════════════════════════════════════════════════════
//  PLANTILLA — MINI  (video único)
//  Copia este bloque (sin los /* */) y pégalo dentro de seriesDatabase
// ════════════════════════════════════════════════════════════════════════
/*
'id-del-mini': {                              // ← ID único, sin espacios ni tildes
  id: 'id-del-mini',
  title: 'Título del Mini',                   // ← título como aparece en la plataforma
  spanishTitle: 'Título en Español',          // ← si el título es en otro idioma
  searchAliases: ['Título del Mini', 'alias'],// ← palabras clave para la búsqueda
  type: 'mini',
  year: '2026',                               // ← año de estreno
  genre: 'Aventura',                          // ← género (ver lista arriba)
  duration: '10 min',
  rating: 'PG',                              // ← 'G' · 'PG' · 'PG-13' · 'R'
  poster: 'https://url-de-tu-imagen.jpg',    // ← URL del póster (imgbb.com)
  description: 'Descripción del mini.',
  director: 'Nombre del Director',
  cast: 'Actor Principal',
  isFeatured: true,                           // ← true = aparece en el slider de inicio
  isTrending: true,                           // ← true = aparece en Tendencias
  isLocked: false,                            // ← false = disponible ya · true = bloqueado
  releaseDate: '2026-12-25T00:00:00-05:00',   // ← fecha de estreno (solo si isLocked: true)
  titleFont: 'elegant',                       // ← 'elegant' · 'drama' · 'modern' · 'brush' · 'artistic'
  episodes: [
    {
      id: 1,
      title: 'Título del Mini',
      duration: '10 min',
      description: 'Descripción del mini.',
      thumbnail: 'https://url-de-tu-imagen.jpg',
      videoUrl: 'https://dropbox.com/...'
    }
  ]
},
*/


// ════════════════════════════════════════════════════════════════════════
//  CONTENIDO ACTIVO  —  agrega nuevos títulos aquí abajo ↓
// ════════════════════════════════════════════════════════════════════════

const seriesDatabase = {

  // El contenido se administra desde Firebase (panel admin).
  // Estas entradas mantienen la app usable si Firebase está lento, vacío o sin conexión.
  'demo-atardecer': {
    id: 'demo-atardecer',
    title: 'Atardecer Azul',
    spanishTitle: 'Atardecer Azul',
    searchAliases: ['atardecer azul', 'drama', 'demo'],
    type: 'mini',
    year: '2026',
    genre: 'Drama, Romance',
    duration: '8 min',
    rating: 'PG',
    poster: 'attached_assets/IMG_3384_1782282604463.jpeg',
    description: 'Una historia corta sobre decisiones, segundas oportunidades y un secreto que cambia una noche tranquila.',
    director: 'Atenis Studio',
    cast: 'Elenco Atenis',
    isFeatured: true,
    isTrending: true,
    isLocked: false,
    titleFont: 'elegant',
    episodes: [
      {
        id: 1,
        title: 'Atardecer Azul',
        duration: '8 min',
        description: 'Episodio de muestra disponible como respaldo visual del catálogo.',
        thumbnail: 'attached_assets/IMG_3384_1782282604463.jpeg',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
      }
    ]
  },

  'demo-sombras': {
    id: 'demo-sombras',
    title: 'Sombras del Pasillo',
    spanishTitle: 'Sombras del Pasillo',
    searchAliases: ['sombras', 'terror', 'suspenso', 'demo'],
    type: 'mini',
    year: '2026',
    genre: 'Terror, Suspenso',
    duration: '6 min',
    rating: 'PG-13',
    poster: 'attached_assets/IMG_3385_1782282604463.jpeg',
    description: 'Un suspenso breve en el que cada puerta abierta revela algo que no debería estar ahí.',
    director: 'Atenis Studio',
    cast: 'Elenco Atenis',
    isFeatured: true,
    isTrending: true,
    isLocked: false,
    titleFont: 'drama',
    episodes: [
      {
        id: 1,
        title: 'Sombras del Pasillo',
        duration: '6 min',
        description: 'Episodio de muestra disponible como respaldo visual del catálogo.',
        thumbnail: 'attached_assets/IMG_3385_1782282604463.jpeg',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
      }
    ]
  },

  'demo-aventura': {
    id: 'demo-aventura',
    title: 'Ruta Secreta',
    spanishTitle: 'Ruta Secreta',
    searchAliases: ['ruta secreta', 'aventura', 'anime', 'demo'],
    type: 'mini',
    year: '2026',
    genre: 'Anime, Aventura',
    duration: '7 min',
    rating: 'G',
    poster: 'attached_assets/IMG_3387_1782282604463.jpeg',
    description: 'Una aventura ligera sobre un mapa imposible, una amistad inesperada y un destino oculto.',
    director: 'Atenis Studio',
    cast: 'Elenco Atenis',
    isFeatured: false,
    isTrending: true,
    isLocked: false,
    titleFont: 'modern',
    episodes: [
      {
        id: 1,
        title: 'Ruta Secreta',
        duration: '7 min',
        description: 'Episodio de muestra disponible como respaldo visual del catálogo.',
        thumbnail: 'attached_assets/IMG_3387_1782282604463.jpeg',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
      }
    ]
  }

};
