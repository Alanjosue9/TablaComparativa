// ─────────────────────────────────────────────────────────────
//  CONEXIÓN A FIREBASE
//  Pega aquí los datos de tu proyecto. Vienen de:
//  Firebase → Configuración del proyecto → Tus apps → Configuración del SDK
//  Los pasos completos están en LEEME.md
// ─────────────────────────────────────────────────────────────

export const firebaseConfig = {
  apiKey:            "PEGA_AQUI_TU_API_KEY",
  authDomain:        "PEGA_AQUI.firebaseapp.com",
  projectId:         "PEGA_AQUI_TU_PROJECT_ID",
  storageBucket:     "PEGA_AQUI.appspot.com",
  messagingSenderId: "PEGA_AQUI",
  appId:             "PEGA_AQUI",
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
