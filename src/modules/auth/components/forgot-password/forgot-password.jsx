import { useTranslation } from "react-i18next";
import AuthHeader from "../../shared/auth-header/auth-header";
import PageBanner from "../../shared/page-banner/page-banner";
import SectionTitle from "../../shared/section-title/section-title";
import { Link } from "react-router-dom";
import ForgotForm from "./forgot-form";
import "./forgot-password.scss";

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div id="forgot_page" className="auth_content_bx">
      <div className="data_bx">
        <AuthHeader />

        <div className="content_bx">
          <div className="mb-[30px]">
            <SectionTitle
              title={t("forgot_password_text")}
              subTitle={
                <>
                  {t("forgot_subtitle1")} <br /> {t("you_can")}
                  <Link to="/auth/login" className="color">
                    {t("login_here")}
                  </Link>
                </>
              }
            />
          </div>

          <div className="">
            <ForgotForm />
          </div>
        </div>

        <span></span>
      </div>
      <PageBanner
        className="forgot_bg"
        bannerTitle={t("forgot_banner_title")}
        bannerSubTitle={t("forgot_banner_subtitle")}
      />
    </div>
  );
};

export default ForgotPassword;
