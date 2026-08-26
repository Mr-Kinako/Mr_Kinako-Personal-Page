import { Fragment } from "react";
import { NavLink } from "react-router";
import { useTranslation } from "@/i18n";
import cn from "classnames";
import s from "./NavContainer.module.scss";

export const NavContainer = () => {
  const { t } = useTranslation();

  const NAV_LINKS = [
    { to: "/goals", text: t("nav.goals") },
    { to: "/", text: t("nav.home"), end: true },
    { to: "/media", text: t("nav.media") },
  ];

  return (
    <nav className={cn(s.navigationContainer)}>
      <div className={s.navBubble}>
        {NAV_LINKS.map(({ to, text, end }, index) => (
          <Fragment key={to}>
            {index > 0 && <span className={s.separator} />}

            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => cn(s.link, { [s.active]: isActive })}
            >
              {text}
            </NavLink>
          </Fragment>
        ))}
      </div>
    </nav>
  );
};
