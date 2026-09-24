// A dónde llevan "Iniciar sesión" y "Empezar": la app, que vive en otro
// dominio que el sitio público.
//
// Sin el respaldo, una compilación sin VITE_APP_URL dejaba APP_URL vacío y
// `${APP_URL}/login` apuntaba al propio sitio (guildcore.pro/login), que no
// existe. En desarrollo, VITE_APP_URL manda y apunta al servidor local.
//
// Sin la barra final: VITE_APP_URL suele venir como "http://host:5175/" y
// al armar `${APP_URL}/login` quedaba "//login".
const APP_URL_RAW = (import.meta.env.VITE_APP_URL as string | undefined) || "https://app.guildcore.pro";

export const APP_URL = APP_URL_RAW.replace(/\/+$/, "");
export const LOGIN_URL = `${APP_URL}/login`;
