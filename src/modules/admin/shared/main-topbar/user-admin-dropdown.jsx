import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import LogOut from "../../../shared/logout/logout";

const UserAdminDropdown = ({ imagePath, userName }) => {
  const { t } = useTranslation();

  return (
    <Menu placement="top-end" allowHover>
      <MenuHandler>
        <div>
          <Avatar
            variant="circular"
            alt="profile"
            className="cursor-pointer object-top !size-9.5"
            src={imagePath}
          />
        </div>
      </MenuHandler>
      <MenuList className="border-[#eceff1]">
        <MenuItem className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
              fill="#90A4AE"
            />
          </svg>

          <Typography variant="small" className="font-medium text-[#152C5B]">
            {t("welcome")}: {userName}
          </Typography>
        </MenuItem>

        {/* <MenuItem>
          <Link to="/favorites" className="flex items-center gap-2">
            <div className="size-6 text-[#90A4AE]">
              <HeartIcon />
            </div>

            <Typography variant="small" className="font-medium text-[#152C5B]">
              {t("my_favorites")}
            </Typography>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/my-booking" className="flex items-center gap-2">
            <div className="size-6 text-[#90A4AE]">
              <ClipboardDocumentListIcon />
            </div>

            <Typography variant="small" className="font-medium text-[#152C5B]">
              {t("my_booking")}
            </Typography>
          </Link>
        </MenuItem> */}

        <hr className="my-2 border-[#eceff1]" />
        <MenuItem className="pb-0 pt-1">
          <Typography
            variant="small"
            className="font-medium text-[#152C5B] w-full"
          >
            <LogOut
              logoutContent={{
                text: t("logout"),
                photo: (
                  <ArrowRightStartOnRectangleIcon className="size-6 text-[#90A4AE]" />
                ),
              }}
            />
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserAdminDropdown;
