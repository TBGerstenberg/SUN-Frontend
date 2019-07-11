/**
 * File to load the configuration of i18next module, which is used for translations
 */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import common_de from "./locales/de/common.json";
import common_en from "./locales/en/common.json";

/**
 * Loaded on startup. this file loads the language-specific files containg the texts
 * of the application (exclusing user generated content) and configures react-i18next
 * to use these files.
 */
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
  useSuspense: true,
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default"
  }
};

// Initialize the i18n package with the options configured above, register a "changelanguage" hook
// in case the language shall be changed from a  UI component.
i18n.use(LanguageDetector).init(options);

export default i18n;
