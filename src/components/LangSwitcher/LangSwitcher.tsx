import { useTranslation } from "@/i18n/useTranslation";
import styles from "./LangSwitcher.module.scss";

export function LangSwitcher() {
  const { locale, setLocale } = useTranslation();

  const toggle = () => {
    setLocale(locale === "ru" ? "en" : "ru");
  };

  return (
    <button
      className={styles.switcher}
      onClick={toggle}
      title={`Current language: ${locale}.`}
      aria-label={`Current language: ${locale}. Click to switch.`}
    >
      <span className={locale === "ru" ? styles.active : ""}>RU</span>
      <span className={styles.divider}>/</span>
      <span className={locale === "en" ? styles.active : ""}>EN</span>
    </button>
  );
}
