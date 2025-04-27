import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Typography,
  Card,
  CardBody,
  Chip,
  Switch,
} from "@material-tailwind/react";
import {
  UserIcon,
  PhotoIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";
import { BASE_IMG_URL } from "../../../../constants/app-constants";
import axios from "axios";
import Images from "../../../../assets/Images/Images";
import MainPagination from "../../shared/main-pagination/main-pagination";
import { toast } from "react-toastify";
import "./users-page.scss";

const UsersPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // get all users
  const getUsersList = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${USERS_GUEST_URLS.getAllUsers}?pageNumber=${page}&pageSize=${itemsPerPage}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsersList(response.data?.data || []);
      setTotalCount(response.data?.totalNumberOfRecords || 0);
      console.log(response.data?.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  // toggle actine user
  const handleToggleActive = async (id) => {
    try {
      const response = await axios.put(
        USERS_GUEST_URLS.toggleActive(id),
        {},
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      //toast.success(t("room_deleted_successfuly"));
      getUsersList(currentPage); // refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getUsersList(currentPage);
  }, [currentPage]);

  //   const TABLE_HEAD = [
  //     t("user_name_label"),
  //     t("status"),
  //     t("image"),
  //     t("phone_number"),
  //     t("email"),
  //     "",
  //   ];

  const TABLE_HEAD = [
    <>
      <UserIcon className="inline-block size-5 me-1" />
      {t("user_name_label")}
    </>,
    <>
      <InformationCircleIcon className="inline-block size-5 me-1" />
      {t("status")}
    </>,
    <>
      <PhotoIcon className="inline-block size-5 me-1" />
      {t("image")}
    </>,
    <>
      <DevicePhoneMobileIcon className="inline-block size-5 me-1" />
      {t("phone_number")}
    </>,
    <>
      <EnvelopeIcon className="inline-block size-5 me-1" />
      {t("email")}
    </>,
    "",
  ];

  return (
    <div id="users_page">
      <Card className="">
        <CardBody>
          <div className="">
            {/* page title */}
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-[#1F263E]"
                >
                  {t("users_details")}
                </Typography>
                <Typography
                  color="gray"
                  className="mt-1 font-normal text-[#8b8b8b]"
                >
                  {t("page_sub_title")}
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                {/* <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div> */}
                <Button
                  className="flex items-center gap-3 bg-[#FF9500] cursor-pointer h-10"
                  size="sm"
                  onClick={() => navigate("/dashboard/add-manager")}
                >
                  {t("add_new_manager")}
                </Button>
              </div>
            </div>
            {/*  */}

            {loading ? (
              <div className="mt-3">
                <SkeletonOne />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto table-bx">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-b-[#e0e0e0] border-t-[#e0e0e0] bg-[#E2E5EB] p-4"
                          >
                            <Typography
                              variant="small"
                              //color="blue-gray"
                              className="font-semibold leading-none opacity-70 text-[#000]"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {usersList?.length > 0 ? (
                        usersList?.map((user) => (
                          <tr key={user?.id}>
                            {/* user name */}
                            <td className="p-4 border-b border-[#e0e0e0]">
                              <div className="flex items-center gap-3">
                                <span
                                  //color="blue-gray"
                                  className="font-bold text-[#263238]"
                                >
                                  {user?.userName}
                                </span>
                              </div>
                            </td>

                            {/* room status */}
                            <td className="p-4 border-b border-[#e0e0e0]">
                              <span className="font-medium text-[#263238]">
                                {user?.isActivated ? (
                                  <Chip
                                    className="w-fit font-medium"
                                    color="green"
                                    value={t("active")}
                                  />
                                ) : (
                                  <Chip
                                    className="w-fit font-medium"
                                    color="red"
                                    value={t("not_active")}
                                  />
                                )}
                              </span>
                            </td>

                            {/* room image */}
                            <td className="p-4 border-b border-[#e0e0e0]">
                              <div className="">
                                <img
                                  className="size-12 rounded-full"
                                  //src={`${BASE_IMG_URL}/${user?.imagePath}`}
                                  src={
                                    user?.imagePath
                                      ? `${BASE_IMG_URL}/${user?.imagePath}`
                                      : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                  }
                                />
                              </div>
                            </td>

                            {/* phone number */}
                            <td className="p-4 border-b border-[#e0e0e0]">
                              <span className="font-medium text-[#263238]">
                                {user?.phoneNumber}
                              </span>
                            </td>

                            {/* email */}
                            <td className="p-4 border-b border-[#e0e0e0]">
                              <span className="font-medium text-[#263238]">
                                {user?.email}
                              </span>
                            </td>

                            {/* active */}
                            <td className="p-4 border-b border-[#e0e0e0]">
                              {/* <Switch className="bg-[#00c951]" /> */}
                              <Switch
                                color={user?.isActivated ? "green" : "red"}
                                className="bg-[#fb2c36]"
                                circleProps={{ className: "border-[#fb2c36]" }}
                                checked={user?.isActivated}
                                onChange={() => handleToggleActive(user?.id)}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={TABLE_HEAD.length}
                            className="text-center p-4"
                          >
                            {t("no_data")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* pagination */}
                {totalPages > 1 && (
                  <>
                    <MainPagination
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </CardBody>
      </Card>

      {/*  */}
    </div>
  );
};

export default UsersPage;
