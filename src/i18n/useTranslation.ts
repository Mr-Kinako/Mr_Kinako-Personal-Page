import { useI18n } from "./I18nProvider";

type NestedKeyOf<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${NestedKeyOf<T[K]>}` | K
    : K
  : never;

type TranslationKey = NestedKeyOf<import("./types").TranslationSchema>;

export function useTranslation() {
  const { t, locale, setLocale } = useI18n();

  function tString(key: TranslationKey | string, vars?: Record<string, string | number>): string {
    const keys = key.split(".");
    let value: unknown = t;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    let result = typeof value === "string" ? value : key;

    if (vars) {
      Object.entries(vars).forEach(([varKey, varValue]) => {
        result = result.replace(new RegExp(`{{${varKey}}}`, "g"), String(varValue));
      });
    }

    return result;
  }

  return { t: tString, locale, setLocale };
}
