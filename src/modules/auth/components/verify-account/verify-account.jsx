import { useTranslation } from "react-i18next";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import VerifyForm from "./verify-form";
import FireLoader from "../../../../utils/loader/fire-loader";
import "./verify-account.scss";

const VerifyAccount = () => {
  const { t } = useTranslation();
  FireLoader();

  return (
    <div id="verify_page" className="">
      <div className="">
        <div className="flex justify-center">
          <div className="w-[90%] sm:w-[80%] md:w-[50%] lg:w-[30%] min-h-[calc(100vh-113px)] flex items-center">
            <Card className="mt-2 w-full shadow-none rounded-[12px]">
              <CardBody>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  {t("verify_account")}
                </Typography>
                <div className="text-[#4C4C4D] mb-5 text-sm text-center">
                  {t("verify_subtitle")}
                </div>
                <VerifyForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
