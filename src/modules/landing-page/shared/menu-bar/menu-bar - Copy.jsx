import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  //   Menu,
  //   MenuHandler,
  //   MenuList,
  //   MenuItem,
} from "@material-tailwind/react";
import {
  //ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import {
//   Bars4Icon,
//   GlobeAmericasIcon,
//   NewspaperIcon,
//   PhoneIcon,
//   RectangleGroupIcon,
//   SquaresPlusIcon,
//   SunIcon,
//   TagIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
import UserDropdown from "../user-dropdown/user-dropdown";
import Images from "../../../../assets/Images/Images";
import { useDispatch, useSelector } from "react-redux";
import LanguageSwitch from "../../../shared/language-switch/language-switch";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUserProfileData } from "../../../../redux/profileSlice";
import { setFavoritesData } from "../../../../redux/favoritesSlice";
import {
  USERS_GUEST_URLS,
  ROOMS_FAVOURITES,
} from "../../../../constants/END_POINTS";
import { BASE_HEADERS } from "../../../../constants/app-constants";
import "./menu-bar.scss";

// const navListMenuItems = [
//   {
//     title: "Products",
//     description: "Find the perfect solution for your needs.",
//     icon: SquaresPlusIcon,
//   },
//   {
//     title: "About Us",
//     description: "Meet and learn about our dedication",
//     icon: UserGroupIcon,
//   },
//   {
//     title: "Blog",
//     description: "Find the perfect solution for your needs.",
//     icon: Bars4Icon,
//   },
//   {
//     title: "Services",
//     description: "Learn how we can help you achieve your goals.",
//     icon: SunIcon,
//   },
//   {
//     title: "Support",
//     description: "Reach out to us for assistance or inquiries",
//     icon: GlobeAmericasIcon,
//   },
//   {
//     title: "Contact",
//     description: "Find the perfect solution for your needs.",
//     icon: PhoneIcon,
//   },
//   {
//     title: "News",
//     description: "Read insightful articles, tips, and expert opinions.",
//     icon: NewspaperIcon,
//   },
//   {
//     title: "Products",
//     description: "Find the perfect solution for your needs.",
//     icon: RectangleGroupIcon,
//   },
//   {
//     title: "Special Offers",
//     description: "Explore limited-time deals and bundles",
//     icon: TagIcon,
//   },
// ];

// function NavListMenu() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const renderItems = navListMenuItems.map(
//     ({ icon, title, description }, key) => (
//       <a href="#" key={key}>
//         <MenuItem className="flex items-center gap-3 rounded-lg">
//           <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
//             {" "}
//             {React.createElement(icon, {
//               strokeWidth: 2,
//               className: "h-6 text-gray-900 w-6",
//             })}
//           </div>
//           <div>
//             <Typography
//               variant="h6"
//               color="blue-gray"
//               className="flex items-center text-sm font-bold"
//             >
//               {title}
//             </Typography>
//             <Typography
//               variant="paragraph"
//               className="text-xs !font-medium text-blue-gray-500"
//             >
//               {description}
//             </Typography>
//           </div>
//         </MenuItem>
//       </a>
//     ),
//   );

//   return (
//     <React.Fragment>
//       <Menu
//         open={isMenuOpen}
//         handler={setIsMenuOpen}
//         offset={{ mainAxis: 20 }}
//         placement="bottom"
//         //allowHover={true}
//       >
//         <MenuHandler>
//           <Typography as="div" variant="small" className="font-medium">
//             <ListItem
//               className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
//               selected={isMenuOpen || isMobileMenuOpen}
//               onClick={() => setIsMobileMenuOpen((cur) => !cur)}
//             >
//               Resources
//               <ChevronDownIcon
//                 strokeWidth={2.5}
//                 className={`hidden h-3 w-3 transition-transform lg:block ${
//                   isMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//               <ChevronDownIcon
//                 strokeWidth={2.5}
//                 className={`block h-3 w-3 transition-transform lg:hidden ${
//                   isMobileMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </ListItem>
//           </Typography>
//         </MenuHandler>
//         <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-amber-300 w-[100%] border-[#aaa]">
//           <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
//             {renderItems}
//           </ul>
//         </MenuList>
//       </Menu>
//       <div className="block lg:hidden">
//         <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
//       </div>
//     </React.Fragment>
//   );
// }

function NavList() {
  const { t } = useTranslation();
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 justify-end">
      <ListItem className="flex items-center gap-2 py-2 pr-4 text-[#3252DF] text-[16px]">
        <Link className="font-medium" to="/">
          {t("home")}
        </Link>
      </ListItem>

      <ListItem className="flex items-center gap-2 py-2 pr-4 text-[#152C5B] text-[16px] font-medium">
        <Link to="/explore-rooms" className="font-medium">
          {t("explore")}
        </Link>
      </ListItem>

      {isLogged ? (
        <>
          <ListItem className="flex items-center gap-2 py-2 pr-4 text-[#152C5B] text-[16px]">
            <Link to="/" className="font-medium">
              {t("reviews")}
            </Link>
          </ListItem>

          <ListItem className="flex items-center gap-2 py-2 pr-4 text-[#152C5B] text-[16px]">
            <Link to="/favorites" className="font-medium">
              {t("favorites")}
            </Link>
          </ListItem>
        </>
      ) : (
        ""
      )}
    </List>
  );
}

export function MenuBar() {
  const [openNav, setOpenNav] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const { userProfileData } = useSelector((state) => state.profile);

  // get user profile info
  const userProfileInfo = async () => {
    try {
      const response = await axios.get(
        USERS_GUEST_URLS.userInfo(
          `${JSON.parse(localStorage.getItem("infooooo")).user._id}`
        ),
        {
          headers: {
            Authorization: `${
              JSON.parse(localStorage.getItem("infooooo")).token
            }`,
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

  // get favorites
  const getRoomsList = async () => {
    try {
      const response = await axios.get(
        `${ROOMS_FAVOURITES.getAllFav}`,
        BASE_HEADERS
      );

      const rooms = response.data?.data?.favoriteRooms[0]?.rooms || [];

      dispatch(setFavoritesData(rooms));

      console.log("favorites data:", rooms);
      console.log("favorites num:", rooms.length || 0);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      userProfileInfo();
      getRoomsList();
    }
  }, [i18n.language, isLogged]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div>
      <Navbar
        id="menu_bar"
        className="mx-auto max-w-full py-2 border-b-[#e5e5e5] shadow-none w-full rounded-none container_bx"
      >
        <div className="flex items-center justify-between text-black">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-black"
          >
            <img src={Images.colorLogo} alt="logo" />
          </Typography>

          <div className="flex gap-3 items-center">
            <div className="hidden lg:block">
              <NavList />
            </div>

            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden bg-amber-500 cursor-pointer"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>

            {/* {isLogged ? ("sss"):("aaa")} */}
            {isLogged ? (
              <UserDropdown
                imagePath={
                  userProfileData?.profileImage ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                }
                userName={userProfileData?.userName || ""}
              />
            ) : (
              <div className="flex gap-2">
                <Link to="/auth/register">
                  <Button
                    variant="filled"
                    className="bg-[#3252DF] cursor-pointer font-light text-sm py-2 px-4.5 capitalize"
                  >
                    {t("register")}
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button
                    variant="filled"
                    className="bg-[#3252DF] cursor-pointer font-light text-sm py-2 px-4.5 capitalize"
                  >
                    {t("login_now")}
                  </Button>
                </Link>
              </div>
            )}

            <div className="ms-1">
              <LanguageSwitch />
            </div>
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </div>
  );
}
