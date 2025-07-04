import { useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-tailwind/react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Images from "../../../../assets/Images/Images";
import { logout } from "../../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UsersIcon,
  UserGroupIcon,
  Squares2X2Icon,
  QueueListIcon,
  PowerIcon,
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
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
  const { userProfileData } = useSelector((state) => state.profile);
  const userRole = userProfileData?.group?.name;

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
        <Menu className="h-screen bg-[#fff]">
          <div
            className={`sidebar-logo bg-[#fff] ${
              sideBarCollapsed ? "ps-4 py-2 h-[60px]" : "ps-5 py-4"
            }`}
          >
            {/* <div className="sidebar-logo p-4 bg-[#0022bd]"> */}
            <img
              src={sideBarCollapsed ? Images.small_logo : Images.logo_3_png}
              className={`${sideBarCollapsed ? "h-11" : "w-48"}`}
              alt="pic"
            />
          </div>

          {/* {userRole === "Manager" && (
            <div className="">
              {userProfileData?.userName} {userRole}
            </div>
          )} */}

          {/* home */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("home")}
              className="bg-[#FF9500] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={<HomeIcon className="text-[#8E92BC] w-6.5" />}
                  className="text-[#8E92BC] text-[15px]"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<HomeIcon className="text-[#8E92BC] w-6.5" />}
              className="text-[#8E92BC] font-medium text-[17px] menu-item active"
              onClick={() => navigate("/dashboard")}
            >
              {t("home")}
            </MenuItem>
          )}

          {/* users */}
          {userRole === "Manager" && (
            <>
              {sideBarCollapsed ? (
                <Tooltip
                  content={t("users")}
                  className="bg-[#FF9500] font-light"
                  placement={currentLang === "ar" ? "left" : "right"}
                >
                  <div>
                    <MenuItem
                      icon={<UserGroupIcon className="text-[#8E92BC] w-6.5" />}
                      className="text-[#8E92BC] text-[15px]"
                      onClick={() => navigate("/dashboard/users")}
                    />
                  </div>
                </Tooltip>
              ) : (
                <MenuItem
                  icon={<UserGroupIcon className="text-[#8E92BC] w-6.5" />}
                  className="text-[#8E92BC] font-medium text-[17px] menu-item"
                  onClick={() => navigate("/dashboard/users")}
                >
                  {t("users")}
                </MenuItem>
              )}
            </>
          )}

          {/* projects */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("projects")}
              className="bg-[#FF9500] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={<Squares2X2Icon className="text-[#8E92BC] w-6.5" />}
                  className="text-[#8E92BC] text-[15px]"
                  onClick={() => navigate("/dashboard/projects")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<Squares2X2Icon className="text-[#8E92BC] w-6.5" />}
              className="text-[#8E92BC] font-medium text-[17px] menu-item"
              onClick={() => navigate("/dashboard/projects")}
            >
              {t("projects")}
            </MenuItem>
          )}

          {/* tasks */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("tasks")}
              className="bg-[#FF9500] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={<QueueListIcon className="text-[#8E92BC] w-6.5" />}
                  className="text-[#8E92BC] text-[15px]"
                  onClick={() => navigate("/dashboard/tasks")}
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={<QueueListIcon className="text-[#8E92BC] w-6.5" />}
              className="text-[#8E92BC] font-medium text-[17px] menu-item"
              onClick={() => navigate("/dashboard/tasks")}
            >
              {t("tasks")}
            </MenuItem>
          )}

          {/* logout */}
          {sideBarCollapsed ? (
            <Tooltip
              content={t("logout")}
              className="bg-[#FF9500] font-light"
              placement={currentLang === "ar" ? "left" : "right"}
            >
              <div>
                <MenuItem
                  icon={
                    <ArrowRightStartOnRectangleIcon className="text-[#8E92BC] w-6.5" />
                  }
                  className="text-[#8E92BC] text-[15px]"
                />
              </div>
            </Tooltip>
          ) : (
            <MenuItem
              icon={
                <ArrowRightStartOnRectangleIcon className="text-[#8E92BC] w-6.5" />
              }
              className="text-[#8E92BC] font-medium text-[17px] menu-item"
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
