import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import countryFlagAr from "../../../assets/images/png/eg.png";
import countryFlagEn from "../../../assets/images/png/en.png";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const LanguageSwitch = ({ languageText }) => {
  const { i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  const dispatch = useDispatch();

  const fireLoader = () => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 800);
  };

  useEffect(() => {
    fireLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  // reload page before change language
  // const handleLanguageChange = (lang) => {
  //   localStorage.setItem("i18nextLng", lang); // Save the language selection
  //   window.location.reload(); // Reload the page
  // };

  return (
    <div className="choose-lang">
      {i18n.language === "en" && (
        <span
          className="flex gap-1 cursor-pointer"
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            }),
              //handleLanguageChange("ar");
              i18n.changeLanguage("ar");
          }}
        >
          {languageText} <img src={countryFlagAr} alt="logo" />
        </span>
      )}

      {i18n.language === "ar" && (
        <span
          className="flex gap-1 cursor-pointer"
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            }),
              //handleLanguageChange("en");
              i18n.changeLanguage("en");
          }}
        >
          {languageText} <img src={countryFlagEn} alt="logo" />
        </span>
      )}
    </div>
  );
};

export default LanguageSwitch;
