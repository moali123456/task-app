import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import MainLoader from "../../../shared/loaders/main-loader";
import FireLoader from "../../../../utils/loader/fire-loader";
import LandingPageTitle from "../../../../utils/page-titles/landing-page-title";
import { MenuBar } from "../../../landing-page/shared/menu-bar/menu-bar";
import FooterSection from "../../../landing-page/shared/footer-section/footer-section";
import "./landing-page-layout.scss";

const LandingPageLayout = () => {
  const { t } = useTranslation();
  LandingPageTitle();
  FireLoader();

  return (
    <>
      {/* loader */}
      <MainLoader />

      {/* header menu */}
      <MenuBar />

      {/* routes */}
      <Outlet />
      
      {/* footer */}
      <FooterSection />
    </>
  );
};

export default LandingPageLayout;
