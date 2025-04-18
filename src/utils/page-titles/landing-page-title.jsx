import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const LandingPageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Staycation";
        break;
      case "*":
        document.title = t("not_found_page");
        break;
      default:
        document.title = "Staycation";
    }
  }, [location.pathname]);

};

export default LandingPageTitle;
