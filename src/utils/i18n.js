import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import En from "../../public/local/en.json";
import Ar from "../../public/local/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: En,
      },
      ar: {
        translations: Ar,
      },
    },
    fallbackLng: "en",
    debug: false,
    lng: localStorage.getItem("i18nextLng") || "en",
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
