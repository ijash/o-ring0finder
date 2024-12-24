import React from "react";
import { names } from "components/common";
import { useTranslation } from "react-i18next";

interface Props {}

const style = "text-center";
export const FooterText: React.FC<Props> = (props) => {
  const { t } = useTranslation("global");
  return (
    <footer>
      <div className={style}>
        <small>
          <p>
            {t("footer.issueDesc")}
            <a
              href="https://github.com/ijash/o-ring-finder/issues"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.issueLinkName")}
            </a>
          </p>
          <p>{t("footer.contribDesc")}</p>
          <p>
            {t("footer.version")} {names.version}
          </p>
        </small>
      </div>
    </footer>
  );
};
