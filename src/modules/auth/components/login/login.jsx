import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import LoginForm from "./login-form";
import FireLoader from "../../../../utils/loader/fire-loader";
import "./login.scss";

const Login = () => {
  const { t } = useTranslation();
  FireLoader();

  return (
    <div id="login_page" className="">
      <div className="">
        <div className="flex justify-center">
          <div className="w-[30%] min-h-[calc(100vh-82px)] flex items-center">
            <Card className="mt-2 w-full shadow-none rounded-[12px]">
              <CardBody>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  {t("login")}
                </Typography>
                <div className="text-[#4C4C4D] mb-5 text-sm text-center">
                  {t("login_subtitle")}
                </div>
                <LoginForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
