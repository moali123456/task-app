import { useTranslation } from "react-i18next";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import FireLoader from "../../../../utils/loader/fire-loader";
import RegisterForm from "./register-form";
import "./register.scss";

const Register = () => {
  const { t } = useTranslation();
  FireLoader();

  return (
    <div id="register_page" className="">
      <div className="">
        <div className="flex justify-center">
          <div className="w-[50%] min-h-[calc(100vh-82px)] flex items-center">
            <Card className="mt-8 w-full shadow-none rounded-[12px]">
              <CardBody>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  {t("sign_up")}
                </Typography>
                <div className="text-[#4C4C4D] mb-5 text-sm text-center">
                  {t("signup_title")}
                </div>
                <RegisterForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
