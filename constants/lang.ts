export const SUPPORTED_LANGS = ["en", "ur", "es", "ar"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];