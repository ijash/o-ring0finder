import { IconLanguage } from "components/common";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { i18n } = useTranslation("global");

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
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
        <IconLanguage />

        {/* <small>{t("langSelect.display")}</small> */}
      </button>
      <ul className="dropdown-menu dropdown-menu-end ">
        <li>
          <button
            className={`dropdown-item ${
              i18n.language === "en" ? "disabled" : ""
            }`}
            onClick={() => changeLanguage("en")}
          >
            🇬🇧 English
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item ${
              i18n.language === "id" ? "disabled" : ""
            }`}
            onClick={() => changeLanguage("id")}
          >
            🇮🇩 Indonesia
          </button>
        </li>
      </ul>
    </div>
  );
}
