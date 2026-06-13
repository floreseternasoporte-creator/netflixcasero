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
// ║    'movie'      →  Película larga                                    ║
// ║    'series'     →  Serie con varios episodios                        ║
// ║    'shortfilm'  →  Cortometraje (un solo episodio)                   ║
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
// ║  VIDEOS (videoUrl / trailer):                                        ║
// ║    Sube el video a Dropbox y copia el enlace "Compartir".            ║
// ║    La plataforma convierte el enlace automáticamente.                ║
// ║                                                                      ║
// ╚══════════════════════════════════════════════════════════════════════╝


// ════════════════════════════════════════════════════════════════════════
//  PLANTILLA — PELÍCULA
//  Copia este bloque (sin los /* */) y pégalo dentro de seriesDatabase
// ════════════════════════════════════════════════════════════════════════
/*
'id-de-la-pelicula': {                        // ← ID único, sin espacios ni tildes
  id: 'id-de-la-pelicula',
  title: 'Título de la Película',             // ← título como aparece en la plataforma
  spanishTitle: 'Título en Español',          // ← si el título es en otro idioma
  searchAliases: ['Título', 'alias'],         // ← palabras clave para la búsqueda
  type: 'movie',
  year: '2026',                               // ← año de estreno
  genre: 'Acción',                            // ← género (ver lista arriba)
  duration: '1h 30min',
  rating: 'PG-13',                            // ← 'G' · 'PG' · 'PG-13' · 'R'
  poster: 'https://url-de-tu-imagen.jpg',     // ← URL del póster (imgbb.com)
  trailer: 'https://dropbox.com/...',         // ← URL del trailer (opcional, '' si no hay)
  description: 'Descripción de la película.',
  director: 'Nombre del Director',
  cast: 'Actor 1, Actor 2',
  isFeatured: true,                           // ← true = aparece en el slider de inicio
  isTrending: true,                           // ← true = aparece en Tendencias
  isLocked: false,                            // ← false = disponible ya · true = bloqueada
  releaseDate: '2026-12-25T00:00:00-05:00',   // ← fecha de estreno (solo si isLocked: true)
  episodes: [
    {
      id: 1,
      title: 'Título de la Película',
      duration: '1h 30min',
      description: 'Descripción breve.',
      thumbnail: 'https://url-de-tu-imagen.jpg',
      videoUrl: 'https://dropbox.com/...'     // ← URL del video en Dropbox
    }
  ]
},
*/


// ════════════════════════════════════════════════════════════════════════
//  PLANTILLA — SERIE  (múltiples episodios)
// ════════════════════════════════════════════════════════════════════════
/*
'id-de-la-serie': {
  id: 'id-de-la-serie',
  title: 'Nombre de la Serie',
  spanishTitle: 'Nombre de la Serie',
  searchAliases: ['Nombre de la Serie', 'alias'],
  type: 'series',
  year: '2026',
  genre: 'Drama',
  duration: '45 min',                         // ← duración promedio por episodio
  rating: 'PG-13',
  poster: 'https://url-de-tu-imagen.jpg',
  trailer: '',
  description: 'Descripción de la serie.',
  director: 'Nombre del Director',
  cast: 'Actor 1, Actor 2',
  isFeatured: true,
  isTrending: true,
  isLocked: false,
  releaseDate: '2026-12-25T00:00:00-05:00',   // ← quita esta línea si isLocked: false
  episodes: [
    {
      id: 1,
      title: 'Episodio 1 — Título',
      duration: '45 min',
      description: 'Descripción del episodio 1.',
      thumbnail: 'https://url-thumbnail-ep1.jpg',
      videoUrl: 'https://dropbox.com/...'
    },
    {
      id: 2,
      title: 'Episodio 2 — Título',
      duration: '45 min',
      description: 'Descripción del episodio 2.',
      thumbnail: 'https://url-thumbnail-ep2.jpg',
      videoUrl: 'https://dropbox.com/...'
    }
    // ← agrega más episodios copiando el bloque de arriba
  ]
},
*/


// ════════════════════════════════════════════════════════════════════════
//  PLANTILLA — CORTOMETRAJE  (video único, con opción de dobla)
// ════════════════════════════════════════════════════════════════════════
/*
'id-del-corto': {
  id: 'id-del-corto',
  title: 'Título del Corto',
  spanishTitle: 'Título en Español',
  searchAliases: ['Título del Corto', 'alias'],
  type: 'shortfilm',
  year: '2026',
  genre: 'Aventura',
  duration: '10 min',
  rating: 'PG',
  poster: 'https://url-de-tu-imagen.jpg',
  trailer: 'https://dropbox.com/...',
  description: 'Descripción del cortometraje.',
  director: 'Nombre del Director',
  cast: 'Actor Principal',
  isFeatured: true,
  isTrending: true,
  isLocked: false,
  releaseDate: '2026-12-25T00:00:00-05:00',   // ← quita esta línea si isLocked: false
  // OPCIONAL — si tiene audio en español además del original:
  audioTracks: {
    'original': 'https://dropbox.com/...',    // ← audio/video en idioma original
    'es': 'https://dropbox.com/...'           // ← audio/video doblado al español
  },
  currentAudioTrack: 'original',
  episodes: [
    {
      id: 1,
      title: 'Título del Corto',
      duration: '10 min',
      description: 'Descripción del corto.',
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

  'kikyo-no-kioku': {
    id: 'kikyo-no-kioku',
    title: '桔梗の記憶',
    spanishTitle: 'El recuerdo de Kikyo',
    searchAliases: ['El recuerdo de Kikyo', 'Kikyo no Kioku', 'Kikyō no Kioku', '桔梗の記憶'],
    type: 'shortfilm',
    year: '2026',
    genre: 'Aventura',
    duration: '6 min',
    rating: 'PG',
    poster: 'https://i.ibb.co/sv5zLgLz/86A43203-D12D-47A9-92C1-136C77FFE5B9.jpg',
    trailer: 'https://www.dropbox.com/scl/fi/ooqwpaj7nj866v3p7xv0f/copy_DDCCB366-2F7E-437C-A608-1D52481B44F2.mov?rlkey=w0ffh728736z8ev1qqk60rez1&st=3gdwhjhl&dl=0',
    description: 'Kikyo es una sacerdotisa serena y valiente marcada por sus recuerdos, su deber espiritual y una aventura breve que revela la fuerza tranquila que guarda en su corazón.',
    director: 'Atenis',
    cast: 'Kikyo',
    isFeatured: true,
    isTrending: true,
    isLocked: false,
    audioTracks: {
      'original': 'https://www.dropbox.com/scl/fi/1oaobidv1634c7p4dn4ji/copy_43FDE436-0897-424D-8609-CA358390FBC2.MOV?rlkey=vdyfek1upqr9l30rygn1o2061&st=iqe64xh7&dl=0',
      'es': 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663203786467/tduZKVzDpXhovFOU.mp4'
    },
    currentAudioTrack: 'original',
    episodes: [
      {
        id: 1,
        title: '桔梗の記憶',
        duration: '6 min',
        description: 'Un cortometraje de aventura sobre Kikyo, sus recuerdos y la calma fortaleza que la acompaña.',
        thumbnail: 'https://i.ibb.co/sv5zLgLz/86A43203-D12D-47A9-92C1-136C77FFE5B9.jpg',
        videoUrl: 'https://www.dropbox.com/scl/fi/1oaobidv1634c7p4dn4ji/copy_43FDE436-0897-424D-8609-CA358390FBC2.MOV?rlkey=vdyfek1upqr9l30rygn1o2061&st=iqe64xh7&dl=0'
      }
    ]
  },

  'los-gemelos': {
    id: 'los-gemelos',
    title: 'Los Gemelos',
    spanishTitle: 'Los Gemelos',
    searchAliases: ['Los Gemelos', 'Los gemelos', 'gemelos'],
    type: 'series',
    year: '2026',
    genre: 'Suspenso',
    duration: '6 min',
    rating: 'PG-13',
    poster: 'https://i.ibb.co/36Vqmn4/IMG-2939.jpg',
    trailer: '',
    description: 'Una serie de suspenso que te mantendrá al borde de tu asiento. Dos hermanos, un secreto que cambiará todo.',
    director: 'Atenis',
    cast: 'Darel Narayan',
    isFeatured: true,
    isTrending: true,
    isLocked: true,
    releaseDate: '2026-08-17T00:00:00-05:00',
    episodes: [
      {
        id: 1,
        title: 'Episodio 1',
        duration: '6 min',
        description: 'Primer episodio de Los Gemelos.',
        thumbnail: 'https://i.ibb.co/36Vqmn4/IMG-2939.jpg',
        videoUrl: ''
      },
      {
        id: 2,
        title: 'Episodio 2',
        duration: '6 min',
        description: 'Segundo episodio de Los Gemelos.',
        thumbnail: 'https://i.ibb.co/36Vqmn4/IMG-2939.jpg',
        videoUrl: ''
      },
      {
        id: 3,
        title: 'Episodio 3',
        duration: '6 min',
        description: 'Tercer episodio de Los Gemelos.',
        thumbnail: 'https://i.ibb.co/36Vqmn4/IMG-2939.jpg',
        videoUrl: ''
      }
    ]
  }

};
