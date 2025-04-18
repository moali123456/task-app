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
import {
  EllipsisVerticalIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import SkeletonOne from "../../../landing-page/shared/skeleton/skeleton-one";
import { ROOMS_FACILITIES_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";
import axios from "axios";
import MainPagination from "../../shared/main-pagination/main-pagination";
import AddFacilityModal from "./add-facility-modal";
import UpdateFacilityModal from "./update-facility-modal";
import DeleteModal from "../../shared/delete-modal/delete-modal";
import { toast } from "react-toastify";
import "./facilities-page.scss";

const FacilitiesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [openAddFacility, setOpenAddFacility] = useState(false);
  const [openUpdateFacility, setOpenUpdateFacility] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // open add modal
  const handleOpenAddFacilities = () => {
    setOpenAddFacility(!openAddFacility);
  };
  // open update modal
  const handleOpenUpdateFacilities = (facilityId = null) => {
    setSelectedFacility(facilityId);
    setOpenUpdateFacility(!openUpdateFacility);
    console.log(facilityId);
  };
  // open delete modal
  const handleOpenDelete = (facilityId = null) => {
    setSelectedFacility(facilityId);
    setOpenDelete(!openDelete);
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  // get all facilities
  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        ROOMS_FACILITIES_ADMIN_URLS.getAllFacilities,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFacilitiesList(response.data.data.facilities);
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
        ROOMS_FACILITIES_ADMIN_URLS.deleteFacility(selectedFacility),
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(t("facility_deleted_successfuly"));
      // Reload rooms list after successful deletion
      await fetchFacilities(currentPage);
      // Close the delete modal
      setOpenDelete(false);
      // Clear the selected room
      setSelectedFacility(null);
    } catch (error) {
      toast.error(error.response?.data?.message || t("some_thing_wrong"));
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const TABLE_HEAD = [t("name"), t("created_at"), ""];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facilitiesList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(facilitiesList.length / itemsPerPage);

  return (
    <div id="facilities_room">
      <div className="">
        {/* Page title */}
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-[#1F263E]"
            >
              {t("facilities_page_title")}
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-[#8b8b8b]"
            >
              {t("facilities_page_sub_title")}
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button
              className="flex items-center gap-3 bg-[#203FC7] cursor-pointer h-10"
              size="sm"
              onClick={() => handleOpenAddFacilities()}
            >
              {t("add_new_facility")}
            </Button>
          </div>
        </div>

        {/* Content */}
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
                    currentItems.map((facility, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              className="font-bold text-[#263238]"
                            >
                              {facility?.name}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <span className="flex gap-1.5 items-start">
                            <CalendarDaysIcon className="size-5 text-[#ababab]" />
                            <Typography
                              variant="small"
                              className="font-medium text-[#263238]"
                            >
                              {dayjs(facility?.createdAt).format("D-M-YYYY")}
                            </Typography>
                          </span>
                        </td>
                        <td className="p-4 border-b border-[#e0e0e0]">
                          <Tooltip content="Edit Facility">
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
                                  onClick={() =>
                                    handleOpenUpdateFacilities(facility?._id)
                                  }
                                >
                                  <PencilIcon className="size-4 text-[#8b8b8b]" />
                                  {t("edit")}
                                </MenuItem>
                                <hr className="my-1 border-[#e0e0e0]" />
                                <MenuItem
                                  className="flex gap-1"
                                  onClick={() =>
                                    handleOpenDelete(facility?._id)
                                  }
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
      <AddFacilityModal
        open={openAddFacility}
        handleOpen={handleOpenAddFacilities}
        reloadFacilities={fetchFacilities}
      />

      {/* update modal */}
      <UpdateFacilityModal
        open={openUpdateFacility}
        handleOpen={handleOpenUpdateFacilities}
        reloadFacilities={fetchFacilities}
        facilityId={selectedFacility}
      />

      {/* delete modal */}
      <DeleteModal
        open={openDelete}
        handleOpen={handleOpenDelete}
        facilityId={selectedFacility}
        onSubmit={handleDeleteRoom}
        confirmText={t("delete_facility_confirm")}
      />
    </div>
  );
};

export default FacilitiesPage;
