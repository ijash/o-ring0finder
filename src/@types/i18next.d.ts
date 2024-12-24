import lang_en from "src/locales/en/globals.json";
import lang_id from "src/locales/id/globals.json";
import fallback from "src/locales/en/globals.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "global";
    resources: {
      global: typeof lang_en | typeof lang_id | typeof fallback;
    };
  }
}
