import React from "react";
import LanguageDropdown from "./languageDropdown";
import { useTranslation } from "react-i18next";
export function NavBar() {
  const { t } = useTranslation("global");
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds a smooth scrolling effect
    });
  };
  return (
    <nav className="navbar bg-primary shadow-sm sticky-top">
      <div className="container">
        <h2
          className=" ms-2 "
          style={{
            color: "#1375AC",
            textShadow: "#54b2e9 1px 1px 0",
            cursor: "pointer",
          }}
          onClick={handleScrollToTop}
        >
          {t("header.title")}
        </h2>
        <LanguageDropdown />
      </div>
    </nav>
  );
}
