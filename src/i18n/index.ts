import { ru } from "./translations/ru";
import { en } from "./translations/en";
import type { Locale, TranslationSchema } from "./types";

export const translations: Record<Locale, TranslationSchema> = {
   ru,
   en,
};

export { type Locale, type TranslationSchema };
export { I18nProvider } from "./I18nProvider";
export { useTranslation } from "./useTranslation";
