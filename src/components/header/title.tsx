import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { names } from "components/common";
import { useTranslation } from "react-i18next";

interface TitleProps {}

export const Title: React.FC<TitleProps> = () => {
  const { t } = useTranslation("global");
  const title = t("header.title");

  return (
    <div className="position-relative text-center">
      <HelmetProvider>
        <Helmet>
          <title>{t("meta.title")}</title>
          <meta
            name={t("meta.title")}
            content={t("meta.description", { author: names.author.name })}
          />
        </Helmet>
      </HelmetProvider>

      <h1 className="h1 mt-3">{title}</h1>
      <p>
        <small>
          {t("header.description")}
          <a href={names.author.url} target="_blank" rel="noreferrer">
            {" "}
            {names.author.name}
          </a>
        </small>
      </p>
    </div>
  );
};
