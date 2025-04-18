import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import UserAdminDropdown from "./user-admin-dropdown";
import axios from "axios";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";
import { setUserProfileData } from "../../../../redux/profileSlice";
import LanguageSwitch from "../../../shared/language-switch/language-switch";
import "./main-topbar.scss";

const MainTopbar = ({ onIconClick }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { userProfileData } = useSelector((state) => state.profile);
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  // get user profile info
  const userProfileInfo = async () => {
    try {
      const response = await axios.get(
        USERS_GUEST_URLS.userInfo(
          `${JSON.parse(localStorage.getItem("infooooo")).user._id}`
        ),
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response");
      dispatch(setUserProfileData(response.data.data.user));
      console.log("User data:", response.data.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    userProfileInfo();
  }, [i18n.language]);

  return (
    <div
      id="topbar"
      className="bg-[#F8F9FB] rounded-2xl px-4 py-4 w-full flex items-center justify-between"
    >
      <Bars3BottomLeftIcon
        className="size-6 cursor-pointer"
        onClick={onIconClick}
      />

      {/*  */}
      <div className="flex gap-3">
        <UserAdminDropdown
          imagePath={
            userProfileData?.profileImage ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          }
          userName={userProfileData?.userName || ""}
        />

        <LanguageSwitch />
      </div>
    </div>
  );
};

export default MainTopbar;
