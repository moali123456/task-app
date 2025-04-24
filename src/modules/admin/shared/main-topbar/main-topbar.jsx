import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import UserAdminDropdown from "./user-admin-dropdown";
import { BASE_IMG_URL } from "../../../../constants/app-constants";
import { handelUserProfileInfo } from "../../../../utils/auth-utils/auth-utils";
import LanguageSwitch from "../../../shared/language-switch/language-switch";
import "./main-topbar.scss";

const MainTopbar = ({ onIconClick }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { userProfileData } = useSelector((state) => state.profile);

  useEffect(() => {
    handelUserProfileInfo(dispatch);
  }, [i18n.language]);

  return (
    <Card
      id="topbar"
      className="bg-[#fff] rounded-lg px-4 py-4 w-full flex flex-row items-center justify-between"
    >
      <Bars3BottomLeftIcon
        className="size-6 cursor-pointer"
        onClick={onIconClick}
      />

      {/*  */}
      <div className="flex gap-3">
        <UserAdminDropdown
          imagePath={
            userProfileData?.imagePath
              ? `${BASE_IMG_URL}/${userProfileData.imagePath}`
              : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          }
          userName={userProfileData?.userName || ""}
        />

        <LanguageSwitch />
      </div>
    </Card>
  );
};

export default MainTopbar;
