import { useTranslation } from "react-i18next";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import FireLoader from "../../../../utils/loader/fire-loader";
import ResetPassForm from "./reset-pass-form";
import "./reset-password.scss";

const ResetPassword = () => {
  const { t } = useTranslation();
  FireLoader();

  return (
    <div id="forgot_page" className="">
      <div className="">
        <div className="flex justify-center">
          <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[30%] min-h-[calc(100vh-113px)] flex items-center">
            <Card className="mt-3 w-full shadow-none rounded-[12px]">
              <CardBody>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  {t("reset_password")}
                </Typography>
                <div className="text-[#4C4C4D] mb-5 text-sm text-center">
                  {t("reset_subtitle")}
                </div>
                <ResetPassForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
    // <div id="reset_page" className="auth_content_bx">
    //   <div className="data_bx">
    //     <AuthHeader />

    //     <div className="content_bx">
    //       <div className="mb-[30px]">
    //         <SectionTitle
    //           title={t("reset_password")}
    //           subTitle={
    //             <>
    //               {t("reset_subtitle1")} <br /> {t("you_can")}
    //               <Link to="/auth/login" className="color">
    //                 {t("login_here")}
    //               </Link>
    //             </>
    //           }
    //         />
    //       </div>

    //       <ResetPassForm />
    //     </div>

    //     <span></span>
    //   </div>

    //   <PageBanner
    //     className="reset_bg"
    //     bannerTitle={t("reset_banner_title")}
    //     bannerSubTitle={t("reset_banner_subtitle")}
    //   />
    // </div>
  );
};

export default ResetPassword;
