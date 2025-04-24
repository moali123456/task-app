import { useTranslation } from "react-i18next";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import FireLoader from "../../../../utils/loader/fire-loader";
import ForgotForm from "./forgot-form";
import "./forgot-password.scss";

const ForgotPassword = () => {
  const { t } = useTranslation();
  FireLoader();

  return (
    <div id="forgot_page" className="">
      <div className="">
        <div className="flex justify-center">
          <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[30%] min-h-[calc(100vh-113px)] flex items-center">
            <Card className="w-full shadow-none rounded-[12px]">
              <CardBody>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  {t("forget_password")}
                </Typography>
                <div className="text-[#4C4C4D] mb-5 text-sm text-center">
                  {t("forget_password_subtitle")}
                </div>
                <ForgotForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
    // <div id="forgot_page" className="auth_content_bx">
    //   <div className="data_bx">
    //     <AuthHeader />

    //     <div className="content_bx">
    //       <div className="mb-[30px]">
    //         <SectionTitle
    //           title={t("forgot_password_text")}
    //           subTitle={
    //             <>
    //               {t("forgot_subtitle1")} <br /> {t("you_can")}
    //               <Link to="/auth/login" className="color">
    //                 {t("login_here")}
    //               </Link>
    //             </>
    //           }
    //         />
    //       </div>

    //       <div className="">
    //         <ForgotForm />
    //       </div>
    //     </div>

    //     <span></span>
    //   </div>
    //   <PageBanner
    //     className="forgot_bg"
    //     bannerTitle={t("forgot_banner_title")}
    //     bannerSubTitle={t("forgot_banner_subtitle")}
    //   />
    // </div>
  );
};

export default ForgotPassword;
