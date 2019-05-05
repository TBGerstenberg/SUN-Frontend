/**
 * File to load the configuration of i18next module, which is used for translations
 */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import BackendServices from "i18next-xhr-backend";
import common_de from "./locales/de/common.json";
import common_en from "./locales/en/common.json";

const options = {
  interpolation: {
    escapeValue: false // not needed for react, since interpolation is done by react itself
  },
  debug: true,
  // Load translation files
  resources: {
    de: {
      common: common_de
    },
    en: {
      common: common_en
    }
  },
  // Fallback in case the default user language could not be found
  fallbackLng: "en",

  // Namespace to be loaded
  ns: ["common"],
  defaultNS: "common",

  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default"
  }
};

// Initialize the i18n package with the options configured above, register a "changelanguage" hook
// in case the language shall be changed from a  UI component.
i18n
  .use(LanguageDetector)
  .use(BackendServices)
  .init(options);

export default i18n;
