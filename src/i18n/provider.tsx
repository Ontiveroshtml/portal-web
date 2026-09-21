import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nContext, type Params } from "./context";
import { detectLanguage, STORAGE_KEY, t, tList, type Lang } from "./index";
import { setApiLanguage } from "../lib/api";

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute("content", content);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin localStorage el idioma solo dura la sesión.
    }
  }, []);

  // Idioma del documento, título y metadatos para SEO / vista previa al compartir.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t(lang, "meta.title");
    setMeta('meta[name="description"]', t(lang, "meta.description"));
    setMeta('meta[property="og:title"]', t(lang, "meta.title"));
    setMeta('meta[property="og:description"]', t(lang, "meta.ogDescription"));
    setApiLanguage(lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: string, params?: Params) => t(lang, key, params),
      tList: (key: string) => tList(lang, key),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
