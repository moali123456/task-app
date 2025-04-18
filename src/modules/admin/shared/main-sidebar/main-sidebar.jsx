import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-tailwind/react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Images from "../../../../assets/Images/Images";
import { logout } from "../../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./main-sidebar.scss";

const MainSidebar = ({ sideBarCollapsed, setSideBarCollapsed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );

  return (
    <div
      className={`h-full fixed ${sideBarCollapsed ? "closed" : "opened"}`}
      id="side_bar"
    >
      <Sidebar
        //customBreakPoint="800px" onBreakPoint={setBroken}
        collapsed={sideBarCollapsed}
        transitionDuration={500}
        className={`min-h-full main-sidebar ${
          sideBarCollapsed ? "sidebar-collapsed" : "w-60 min-w-60"
        }`}
      >
        <Menu className="h-screen bg-[#203FC7]">
          <div
            className={`sidebar-logo bg-[#9caeff] ${
              sideBarCollapsed ? "ps-4 py-2 h-[60px]" : "ps-5 py-4"
            }`}
          >
            {/* <div className="sidebar-logo p-4 bg-[#0022bd]"> */}
            <img
              src={sideBarCollapsed ? Images.small_logo : Images.colorLogo}
              className={`${sideBarCollapsed ? "h-11" : ""}`}
              alt="pic"
            />
          </div>
          {/* <MenuItem
            icon={<img src={Images.home_icon} className="w-5.5" alt="pic" />}
            className="text-white text-[15px]"
          >
            {t("home")}
          </MenuItem> */}

          {/* home */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("home")}
              className="bg-[#203FC7] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={
                    <img src={Images.home_icon} className="w-5.5" alt="pic" />
                  }
                  className="text-white text-[15px]"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<img src={Images.home_icon} className="w-5.5" alt="pic" />}
              className="text-white text-[15px]"
              onClick={() => navigate("/dashboard")}
            >
              {t("home")}
            </MenuItem>
          )}

          {/* rooms */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("rooms")}
              className="bg-[#203FC7] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={
                    <img src={Images.catug_icon} className="w-5" alt="pic" />
                  }
                  className="text-white text-[15px]"
                  onClick={() => navigate("/dashboard/admin-rooms")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<img src={Images.catug_icon} className="w-5" alt="pic" />}
              className="text-white text-[15px]"
              onClick={() => navigate("/dashboard/admin-rooms")}
            >
              {t("rooms")}
            </MenuItem>
          )}

          {/* ads */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("ads")}
              className="bg-[#203FC7] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={<img src={Images.ads_icon} className="w-7" alt="pic" />}
                  className="text-white text-[15px]"
                  onClick={() => navigate("/dashboard/ads")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<img src={Images.ads_icon} className="w-7" alt="pic" />}
              className="text-white text-[15px]"
              onClick={() => navigate("/dashboard/ads")}
            >
              {t("ads")}
            </MenuItem>
          )}

          {/* booking */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("facilities")}
              className="bg-[#203FC7] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={
                    <img src={Images.date_icon} className="w-5" alt="pic" />
                  }
                  className="text-white text-[15px]"
                  onClick={() => navigate("/dashboard/facilities")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<img src={Images.date_icon} className="w-5" alt="pic" />}
              className="text-white text-[15px]"
              onClick={() => navigate("/dashboard/facilities")}
            >
              {t("facilities")}
            </MenuItem>
          )}

          {/* password */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("change_password")}
              className="bg-[#203FC7] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={
                    <img src={Images.lockIcon} className="w-5.5" alt="pic" />
                  }
                  className="text-white text-[15px]"
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<img src={Images.lockIcon} className="w-5.5" alt="pic" />}
              className="text-white text-[15px]"
            >
              {t("change_password")}
            </MenuItem>
          )}

          {/* logout */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("logout")}
              className="bg-[#203FC7] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={
                    <img src={Images.logout_icon} className="w-5.5" alt="pic" />
                  }
                  className="text-white text-[15px]"
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={
                <img src={Images.logout_icon} className="w-5.5" alt="pic" />
              }
              className="text-white text-[15px]"
              onClick={() => dispatch(logout())}
            >
              {t("logout")}
            </MenuItem>
          )}
        </Menu>
      </Sidebar>

      {/* <button
        className="sb-button absolute start-60 top-8"
        onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
      >
        Collapse
      </button> */}
    </div>
  );
};

export default MainSidebar;
