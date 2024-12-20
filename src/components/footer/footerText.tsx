import React from "react";
import packageJson from "../../../package.json";

interface Props {}

const style = "text-center";
export const FooterText: React.FC<Props> = (props) => {
  return (
    <footer>
      <div className={style}>
        <small>
          <p>
            {
              "If you found any issues or just to suggest new featues, please post a new issue in this "
            }
            <a
              href="https://github.com/ijash/o-ring-finder/issues"
              target="_blank"
              rel="noreferrer"
            >
              issue page
            </a>
          </p>
          <p>All contributors are welcomed</p>
          <p>Version {packageJson.version}</p>
        </small>
      </div>
    </footer>
  );
};
