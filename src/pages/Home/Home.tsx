import { AboutMe } from "@/components/AboutMe";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/i18n";
import styles from "./Home.module.scss";

export const Home = () => {
  const [isActiveAboutMe, setIsActiveAboutMe] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();

  function toggleAboutMe() {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsActiveAboutMe((prev) => !prev);

    setTimeout(() => {
      setIsAnimating(false);
    }, 420);
  }

  return (
    <>
      <main className={styles.home}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Mr_Kinako</h1>

          <p className={styles.subtitle}>{t("home.welcome")}</p>
        </section>

        <div className={styles.openAboutMe}>
          <button onClick={toggleAboutMe} disabled={isAnimating}>
            {t("home.aboutMeButton")}
          </button>
        </div>

        <AboutMe isOpen={isActiveAboutMe} />
      </main>

      <Footer />
    </>
  );
};
