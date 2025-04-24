import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Typography,
  IconButton,
  Tooltip,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { EyeIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import { ROOMS_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";
import axios from "axios";
import Images from "../../../../assets/Images/Images";
import MainPagination from "../../shared/main-pagination/main-pagination";
import DetailsModal from "./details-modal";
import DeleteModal from "../../shared/delete-modal/delete-modal";
import { toast } from "react-toastify";
import "./rooms-page.scss";

const RoomsAdminPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleOpenDetails = (roomId = null) => {
    setSelectedRoom(roomId);
    setOpenDetails(!openDetails);
  };

  const handleOpenDelete = (roomId = null) => {
    setSelectedRoom(roomId);
    setOpenDelete(!openDelete);
  };

  // get all rooms
  const getRoomsList = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ROOMS_ADMIN_URLS.getAll}?page=${page}&size=${itemsPerPage}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRoomsList(response.data?.data?.rooms || []);
      setTotalCount(response.data?.data?.totalCount || 0);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  // delete room
  const handleDeleteRoom = async () => {
    try {
      const response = await axios.delete(
        ROOMS_ADMIN_URLS.deleteRoom(selectedRoom),
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(t("room_deleted_successfuly"));
      // Reload rooms list after successful deletion
      await getRoomsList(currentPage);
      // Close the delete modal
      setOpenDelete(false);
      // Clear the selected room
      setSelectedRoom(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getRoomsList(currentPage);
  }, [currentPage]);

  const TABLE_HEAD = [
    t("room_number"),
    t("image"),
    t("price"),
    t("discount"),
    t("capacity"),
    t("facilities"),
    "",
  ];

  return (
    <div id="admin_rooms">
      <div className="">
        {/* page title */}
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-[#1F263E]"
            >
              {t("rooms_page_title")}
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#8b8b8b]"
            >
              {t("rooms_page_sub_title")}
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
              className="flex items-center gap-3 bg-[#203FC7] cursor-pointer h-10"
              size="sm"
              onClick={() => navigate("/dashboard/add-room")}
            >
              {t("add_new_room")}
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
                          color="blue-gray"
                          className="font-semibold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roomsList?.length > 0 ? (
                    roomsList?.map((room, index) => (
                      <tr key={index}>
                        {/* room num */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              //color="blue-gray"
                              className="font-bold text-[#263238]"
                            >
                              {room?.roomNumber}
                            </Typography>
                          </div>
                        </td>

                        {/* room image */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <img
                            className="w-21 h-15 rounded-xl object-cover"
                            src={room?.images[0] || Images.defaultImage}
                            alt="Room"
                            loading="lazy"
                          />
                        </td>

                        {/* room price */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Typography
                            variant="small"
                            className="font-medium text-[#263238]"
                          >
                            {room?.price}$
                          </Typography>
                        </td>

                        {/* room discount */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Typography
                            variant="small"
                            className="font-medium text-[#263238]"
                          >
                            {room?.discount}%
                          </Typography>
                        </td>

                        {/* room capacity */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Typography
                            variant="small"
                            className="font-medium text-[#263238]"
                          >
                            {room?.capacity} ({t("person")})
                          </Typography>
                        </td>

                        {/* room facility */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <span className="flex gap-[6px] flex-wrap max-w-80">
                            {room.facilities.map((facility, index) => (
                              <span
                                className="bg-[#dedede] rounded-full px-3 py-1 text-xs"
                                key={index}
                              >
                                {facility.name}
                              </span>
                            ))}
                          </span>
                        </td>

                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Tooltip content="Edit User">
                            <Menu placement="bottom-end">
                              <MenuHandler>
                                <IconButton
                                  variant="text"
                                  className="cursor-pointer outline-0"
                                >
                                  <EllipsisVerticalIcon className="size-6" />
                                </IconButton>
                              </MenuHandler>
                              <MenuList className="border border-[#eceff1]">
                                <MenuItem
                                  className="flex gap-1"
                                  onClick={() => handleOpenDetails(room?._id)}
                                >
                                  <EyeIcon className="size-4 text-[#8b8b8b]" />
                                  {t("view")}
                                </MenuItem>
                                <hr className="my-1 border-[#e0e0e0] hover:shadow-none outline-0" />
                                <MenuItem
                                  className="flex gap-1"
                                  onClick={() =>
                                    navigate(
                                      `/dashboard/update-room/${room?._id}`
                                    )
                                  }
                                >
                                  <PencilIcon className="size-4 text-[#8b8b8b]" />
                                  {t("edit")}
                                </MenuItem>
                                <hr className="my-1 border-[#e0e0e0] hover:shadow-none outline-0" />
                                <MenuItem
                                  className="flex gap-1"
                                  onClick={() => handleOpenDelete(room?._id)}
                                >
                                  <TrashIcon className="size-4 text-[#8b8b8b]" />
                                  {t("delete")}
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Tooltip>
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
      {/*  */}

      {/* details modal */}
      <DetailsModal
        open={openDetails}
        handleOpen={handleOpenDetails}
        roomId={selectedRoom}
      />

      {/* delete modal */}
      <DeleteModal
        open={openDelete}
        handleOpen={handleOpenDelete}
        roomId={selectedRoom}
        onSubmit={handleDeleteRoom}
        confirmText={t("delete_room_confirm")}
      />
    </div>
  );
};

export default RoomsAdminPage;
