import { useTranslation } from "react-i18next";
import AuthHeader from "../../shared/auth-header/auth-header";
import PageBanner from "../../shared/page-banner/page-banner";
import SectionTitle from "../../shared/section-title/section-title";
import { Link } from "react-router-dom";
import ResetPassForm from "./reset-pass-form";
import "./reset-password.scss";

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <div id="reset_page" className="auth_content_bx">
      <div className="data_bx">
        <AuthHeader />

        <div className="content_bx">
          <div className="mb-[30px]">
            <SectionTitle
              title={t("reset_password")}
              subTitle={
                <>
                  {t("reset_subtitle1")} <br /> {t("you_can")}
                  <Link to="/auth/login" className="color">
                    {t("login_here")}
                  </Link>
                </>
              }
            />
          </div>

          <ResetPassForm />
        </div>

        <span></span>
      </div>

      <PageBanner
        className="reset_bg"
        bannerTitle={t("reset_banner_title")}
        bannerSubTitle={t("reset_banner_subtitle")}
      />
    </div>
  );
};

export default ResetPassword;
