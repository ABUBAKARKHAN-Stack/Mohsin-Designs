import en from "./en";

const dictionaries: Record<string, any> = {
  en
};

export function uiT(
  lang: string | null | undefined, // Keeping signature for minimal breakage during transition
  key: string
) {
  const keys = key.split(".");
  let value = dictionaries.en;

  for (const k of keys) {
    value = value?.[k];
  }

  return value || null;
}
