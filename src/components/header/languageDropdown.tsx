import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation("global");

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    // <div className="dropdown position-absolute top-0 end-0">
    <div className="dropdown  d-flex">
      <button
        className="btn btn-primary btn-sm dropdown-toggle "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <small>{t("langSelect.display")}</small>
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            className={`dropdown-item ${
              i18n.language === "en" ? "active" : ""
            }`}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item ${
              i18n.language === "id" ? "active" : ""
            }`}
            onClick={() => changeLanguage("id")}
          >
            Indonesian
          </button>
        </li>
      </ul>
    </div>
  );
}
