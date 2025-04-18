import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const AdminPageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        document.title = t("dashboard_page");
        break;
      case "*":
        document.title = t("not_found_page");
        break;
      default:
        document.title = "Staycation";
    }
  }, [location.pathname]);

};

export default AdminPageTitle;
