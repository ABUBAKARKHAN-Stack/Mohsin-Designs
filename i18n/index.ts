import en from "./en";
import es from "./es";
import ur from "./ur";
import ar from "./ar";

const dictionaries: Record<string, any> = {
  en,
  es,
  ur,
  ar
};

export function uiT(
  lang: string,
  key: string,
  fallback = "en"
) {
  const keys = key.split(".");
  let value = dictionaries[lang] || dictionaries[fallback];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || null;
}
