// Sin la barra final: VITE_APP_URL suele venir como "http://host:5175/" y
// al armar `${APP_URL}/login` quedaba "//login".
const APP_URL_RAW = (import.meta.env.VITE_APP_URL as string | undefined) ?? "";

export const APP_URL = APP_URL_RAW.replace(/\/+$/, "");
export const LOGIN_URL = `${APP_URL}/login`;
