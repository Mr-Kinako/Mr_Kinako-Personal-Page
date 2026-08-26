import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Overlay } from "@/components/Overlay";
import { useTranslation } from "@/i18n";
import styles from "./Media.module.scss";

const imageModules = import.meta.glob<{ default: string }>("@/assets/media/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const mediaList = Object.entries(imageModules).map(([_, module], index) => ({
  id: index + 1,
  src: module.default,
}));

export const Media = () => {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <main className={styles.mediaContainer}>
        <h2 className={styles.pageTitle}>{t("media.title")}</h2>

        <div className={styles.contentWindow}>
          <div className={styles.masonryGrid}>
            {mediaList.map((item) => (
              <div key={item.id} className={styles.card} onClick={() => setActiveSrc(item.src)}>
                <img
                  src={item.src}
                  alt={`Media asset ${item.id}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Единый оверлей для полноэкранного просмотра */}
        <Overlay isOpen={Boolean(activeSrc)} onClose={() => setActiveSrc(null)} showCloseButton>
          {activeSrc && (
            <img
              src={activeSrc}
              alt="Full size view"
              decoding="async"
              onClick={() => setActiveSrc(null)}
              draggable={false}
              className={styles.overlayImage}
            />
          )}
        </Overlay>
      </main>

      <Footer />
    </>
  );
};
