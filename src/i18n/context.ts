import { createContext } from "react";
import type { Lang } from "./index";

export type Params = Record<string, string | number>;

export interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, params?: Params) => string;
  tList: (key: string) => string[];
}

export const I18nContext = createContext<I18nContextType | null>(null);
