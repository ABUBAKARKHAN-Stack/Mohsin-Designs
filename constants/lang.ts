export const SUPPORTED_LANGS = ["en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];