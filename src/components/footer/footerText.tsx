import React from "react";

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
        </small>
      </div>
    </footer>
  );
};
