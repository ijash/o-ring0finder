import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.scss";

import { I18nextProvider } from "react-i18next";

import App from "./App";

import i18next from "locales/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next()}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
