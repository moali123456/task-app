import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import SkeletonOne from "../../../landing-page/shared/skeleton/skeleton-one";
import axios from "axios";
import { ADS_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";
import Images from "../../../../assets/Images/Images";
import MainPagination from "../../shared/main-pagination/main-pagination";
import AddAdsModal from "./add-ads-modal";
import UpdateAdsModal from "./update-ads-modal";
import DeleteModal from "../../shared/delete-modal/delete-modal";
import { toast } from "react-toastify";
import "./ads-page.scss";

const AdsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adsList, setAdsList] = useState([]);
  const [openAddAds, setOpenAddAds] = useState(false);
  const [openUpdateAds, setOpenUpdateAds] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAds, setSelectedAds] = useState(null);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  // open add modal
  const handleOpenAddAds = () => {
    setOpenAddAds(!openAddAds);
  };
  // open update modal
  const handleOpenUpdateAds = (adsId = null) => {
    setSelectedAds(adsId);
    setOpenUpdateAds(!selectedAds);
    console.log(adsId);
  };
  // open delete modal
  const handleOpenDelete = (adsId = null) => {
    setSelectedAds(adsId);
    setOpenDelete(!openDelete);
  };

  // get all facilities
  const getALLAds = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ADS_ADMIN_URLS.getAllAds, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setAdsList(response.data.data.ads);
      console.log(response.data.data.ads);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  // delete room
  const handleDeleteRoom = async () => {
    try {
      const response = await axios.delete(
        ADS_ADMIN_URLS.deleteAds(selectedAds),
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(t("ads_deleted_successfuly"));
      // Reload rooms list after successful deletion
      await getALLAds(currentPage);
      // Close the delete modal
      setOpenDelete(false);
      // Clear the selected room
      setSelectedAds(null);
    } catch (error) {
      toast.error(error.response?.data?.message || t("some_thing_wrong"));
    }
  };

  useEffect(() => {
    getALLAds();
  }, []);

  const TABLE_HEAD = [
    t("room_number"),
    t("image"),
    t("price"),
    t("discount"),
    t("capacity"),
    t("active"),
    "",
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adsList.length / itemsPerPage);

  return (
    <div id="ads_page">
      <div className="">
        {/* page title */}
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-[#1F263E]"
            >
              {t("ads_page_title")}
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#8b8b8b]"
            >
              {t("ads_page_sub_title")}
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
              onClick={() => handleOpenAddAds()}
            >
              {t("add_new_ad")}
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
                  {currentItems?.length > 0 ? (
                    currentItems?.map((room, index) => (
                      <tr key={index}>
                        {/* room num */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              //color="blue-gray"
                              className="font-bold text-[#263238]"
                            >
                              {room?.room?.roomNumber}
                            </Typography>
                          </div>
                        </td>

                        {/* room image */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <img
                            className="w-21 h-15 rounded-xl object-cover"
                            src={room?.room?.images[0] || Images.defaultImage}
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
                            {room?.room?.price}$
                          </Typography>
                        </td>

                        {/* room discount */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Typography
                            variant="small"
                            className="font-medium text-[#263238]"
                          >
                            {room?.room?.discount}%
                          </Typography>
                        </td>

                        {/* room capacity */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Typography
                            variant="small"
                            className="font-medium text-[#263238]"
                          >
                            {room?.room?.capacity} ({t("person")})
                          </Typography>
                        </td>

                        {/* room status */}
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Typography
                            variant="small"
                            className="font-medium text-[#263238]"
                          >
                            {room?.isActive ? t("active") : t("not_active")}
                          </Typography>
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
                                {/* <MenuItem
                                  className="flex gap-1"
                                  onClick={() => handleOpenDetails(room?._id)}
                                >
                                  <EyeIcon className="size-4 text-[#8b8b8b]" />
                                  {t("view")}
                                </MenuItem>
                                <hr className="my-1 border-[#e0e0e0] hover:shadow-none outline-0" /> */}
                                <MenuItem
                                  className="flex gap-1"
                                  onClick={() =>
                                    handleOpenUpdateAds(room?._id)
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
              <MainPagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>

      {/* add modal */}
      <AddAdsModal
        open={openAddAds}
        handleOpen={handleOpenAddAds}
        reloadAds={getALLAds}
      />

      {/* update modal */}
      <UpdateAdsModal
        open={openUpdateAds}
        handleOpen={handleOpenUpdateAds}
        reloadAds={getALLAds}
        adsId={selectedAds}
      />

      {/* delete modal */}
      <DeleteModal
        open={openDelete}
        handleOpen={handleOpenDelete}
        adsId={selectedAds}
        onSubmit={handleDeleteRoom}
        confirmText={t("delete_ads_confirm")}
      />

    </div>
  );
};

export default AdsPage;
