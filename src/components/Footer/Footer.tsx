import { useTranslation } from "@/i18n";
import styles from "./Footer.module.scss";

const years: string = `${new Date().getFullYear()}`;
const ownerNickname: string = "Mr_Kinako";

export const Footer = () => {
  const { t } = useTranslation();

  const githubLink: string = "https://github.com/Mr-Kinako/Mr_Kinako-Page_Card";
  const rel: string = "noreferrer";

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {years} {ownerNickname}
      </p>

      <p className={styles.madeWith}>
        {t("footer.madeWith").replace("🥭", "").trim()}{" "}
        <span className={styles.mangoIcon} aria-label="mango">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.mangoSvg}
          >
            {/* Лист */}
            <path
              d="M20 4C20 4 18 2 16 2C14 2 12 4 12 4C12 4 14 6 16 6C18 6 20 4 20 4Z"
              fill="var(--mango-leaf, #4ade80)"
            />
            <path
              d="M16 6C16 6 15 3 13 2"
              stroke="var(--mango-leaf-stem, #22c55e)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Тело манго */}
            <path
              d="M8 12C8 12 6 16 6 20C6 26 10 30 16 30C22 30 26 26 26 20C26 16 24 12 24 12C24 12 20 8 16 8C12 8 8 12 8 12Z"
              fill="var(--mango-body, #fbbf24)"
            />
            {/* Градиентный блик */}
            <ellipse
              cx="12"
              cy="16"
              rx="3"
              ry="5"
              fill="var(--mango-highlight, #fde68a)"
              opacity="0.6"
            />
            {/* Тень/контур */}
            <path
              d="M8 12C8 12 6 16 6 20C6 26 10 30 16 30C22 30 26 26 26 20C26 16 24 12 24 12C24 12 20 8 16 8C12 8 8 12 8 12Z"
              stroke="var(--mango-outline, #d97706)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </span>
      </p>

      <p className={styles.license}>
        {t("footer.license")} •{" "}
        <a className={styles.sourceCode} href={githubLink} target="_blank" rel={rel}>
          {t("footer.sourceCode")}
        </a>
      </p>
    </footer>
  );
};
