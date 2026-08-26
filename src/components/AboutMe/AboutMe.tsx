import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n";
import cn from "classnames";
import s from "./AboutMe.module.scss";

interface AboutMeProps {
  isOpen: boolean;
}

export const AboutMe = ({ isOpen }: AboutMeProps) => {
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
  const [isSpoiler, setIsSpoiler] = useState<boolean>(true);
  const { t } = useTranslation();

  const InfoMap: Record<string, string> = {
    hello: t("aboutMe.hello"),
    names: t("aboutMe.names"),
    moreInfo: t("aboutMe.moreInfo"),
    spoiler: t("aboutMe.spoiler"),
  };

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  const handleSpoiler = () => {
    if (isSpoiler) setIsSpoiler((prev) => !prev);
  };

  return (
    <>
      <section
        className={cn(s.aboutMe, {
          [s.aboutMeOpen]: isOpen,
          [s.aboutMeClose]: !isOpen,
        })}
        onAnimationEnd={handleAnimationEnd}
      >
        <h2 className={s.aboutMe_header}>{t("aboutMe.header")}</h2>

        <div className={s.aboutMe_contentContainer}>
          <span>{InfoMap.hello}</span>
          <br />

          <span>{InfoMap.names}</span>
          <br />
          <br />

          <span>{InfoMap.moreInfo}</span>
          <br />
          <br />

          <div className={`${s.spoiler} ${!isSpoiler ? s.visible : null}`} onClick={handleSpoiler}>
            <span className={`${s.spoilerText} ${!isSpoiler ? s.visible : null}`}>
              {InfoMap.spoiler}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
