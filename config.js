// ─────────────────────────────────────────────────────────────
//  CONEXIÓN A FIREBASE
//  Pega aquí los datos de tu proyecto. Vienen de:
//  Firebase → Configuración del proyecto → Tus apps → Configuración del SDK
//  Los pasos completos están en LEEME.md
// ─────────────────────────────────────────────────────────────

export const firebaseConfig = {
  apiKey:            "AIzaSyDNwCNdWEZpVSnO8MXb9ta4diWKlTOwy7Y",
  authDomain:        "tabla-15321.firebaseapp.com",
  projectId:         "tabla-15321",
  storageBucket:     "tabla-15321.firebasestorage.app",
  messagingSenderId: "288826334447",
  appId:             "1:288826334447:web:bf5b37ab5cec98a0f64f1a",
};

// Datos de la iglesia que aparecen en la presentación.
export const iglesia = {
  nombre:    "HACIENDAS DEL CARIBE",
  distrito:  "Distrito VII",
  asociacion:"Asociación Norte de Quintana Roo",
};

// Cuántas fotos buscar como máximo en cada carpeta de /fotos/.
// Nombra tus archivos 1.jpg, 2.jpg, 3.jpg… sin saltarte números.
export const maxFotosPorCarpeta = 12;
