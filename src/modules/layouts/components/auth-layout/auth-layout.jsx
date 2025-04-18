import { Outlet } from "react-router-dom";
import AuthPageTitle from "../../../../utils/page-titles/auth-page-title";
import MainLoader from "../../../shared/loaders/main-loader";
import FireLoader from "../../../../utils/loader/fire-loader";
import AuthHeader from "../../../auth/shared/auth-header/auth-header";
import "./auth-layout.scss";

const AuthLayout = () => {
  AuthPageTitle();
  FireLoader();

  return (
    <div id="auth_layout" className="bg-[#f7f7f8] min-h-dvh p-3">
      <MainLoader />

      <AuthHeader />
      
      <Outlet />
    </div>
  );
};

export default AuthLayout;
