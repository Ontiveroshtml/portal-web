import { messages as en } from "./locales/en";
import { messages as es } from "./locales/es";
import { messages as ja } from "./locales/ja";
import { messages as ru } from "./locales/ru";

// Idiomas de la landing. El backend ya usa estos mismos, así que el usuario
// los ve en la app y en la web con el mismo código.
export const LANGUAGES = ["en", "es", "ja", "ru"] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Lang = "es";
export const STORAGE_KEY = "gc-portal-lang";

// Datos de cada idioma para el selector. Sin banderas: en Windows los emoji
// de bandera se ven como letras sueltas.
export const LANGUAGE_OPTIONS: Record<Lang, { code: Lang; name: string; short: string }> = {
  es: { code: "es", name: "Español", short: "ES" },
  en: { code: "en", name: "English", short: "EN" },
  ja: { code: "ja", name: "日本語", short: "JA" },
  ru: { code: "ru", name: "Русский", short: "RU" },
};

// Etiqueta BCP 47 para formatear números y fechas de las pantallas de ejemplo.
export const LOCALE_TAG: Record<Lang, string> = {
  es: "es-ES",
  en: "en-US",
  ja: "ja-JP",
  ru: "ru-RU",
};

export interface Messages {
  [key: string]: unknown;
}

const LOCALES: Record<Lang, Messages> = { en, es, ja, ru };

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

/** Idioma guardado, o el del navegador, o el por defecto. */
export function detectLanguage(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // localStorage puede estar bloqueado (modo privado): se ignora.
  }
  for (const candidate of navigator.languages ?? [navigator.language]) {
    const base = candidate?.toLowerCase().split("-")[0];
    if (isLang(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

function lookup(locale: Messages, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, k) => (acc as Record<string, unknown> | undefined)?.[k], locale);
}

/** Busca una clave anidada (p. ej. "hero.title") y reemplaza {{param}}. */
export function t(lang: Lang, key: string, params?: Record<string, string | number>): string {
  let value = lookup(LOCALES[lang], key);
  if (typeof value !== "string") value = lookup(LOCALES[DEFAULT_LANGUAGE], key);
  if (typeof value !== "string") {
    if (import.meta.env.DEV) console.warn(`Missing translation key: ${key} (lang: ${lang})`);
    return key;
  }
  return value.replace(/\{\{(\w+)\}\}/g, (_, k: string) => String(params?.[k] ?? ""));
}

/** Igual que `t`, para claves que son listas de textos. */
export function tList(lang: Lang, key: string): string[] {
  let value = lookup(LOCALES[lang], key);
  if (!Array.isArray(value)) value = lookup(LOCALES[DEFAULT_LANGUAGE], key);
  return Array.isArray(value) ? (value as string[]) : [];
}
