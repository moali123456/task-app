import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Images from "../../../../assets/Images/Images";
import LanguageSwitch from "../../../shared/language-switch/language-switch";
import "./auth-header.scss";

const AuthHeader = () => {
  const { i18n } = useTranslation();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, []);

  return (
    <div className="flex items-center justify-between bg-[#fa9319] rounded-lg py-1.5 ps-3 pe-1.5">
      <div className="logo_bx">
        <Link to="/">
          <img src={Images.logo_2_png} alt="pic" className="w-44" />
        </Link>
      </div>

      <div className="language_bx">
        <div className="choose_lang">
          {/* {i18n.language === "en" && <LanguageSwitch languageText="عربي" />}
            {i18n.language === "ar" && <LanguageSwitch languageText="english" />} */}
          {i18n.language === "en" && <LanguageSwitch />}
          {i18n.language === "ar" && <LanguageSwitch />}
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
