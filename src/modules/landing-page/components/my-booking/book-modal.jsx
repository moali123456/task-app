import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import dayjs from "dayjs";
import { ROOMS_URLS, BASE_HEADERS } from "../../../../constants/END_POINTS";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import Images from "../../../../assets/Images/Images";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { useNavigate } from "react-router-dom";

const BookingDetailsModal = ({ open, onClose, data, bookLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [room, setRoom] = useState();
  const [facilitiesList, setFacilitiesList] = useState();

  // get room details
  const getRoom = async () => {
    try {
      setLoading(true);
      const roomId = data?.room?._id;
      const response = await axios.get(
        ROOMS_URLS.getRoomDetails(roomId),
        BASE_HEADERS
      );
      setImagesList(response?.data?.data?.room?.images || []);
      setFacilitiesList(response?.data?.data?.room?.facilities);
      setRoom(response?.data?.data?.room);
    } catch (error) {
      console.error("Error fetching room:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && data?.room?._id) {
      getRoom();
    }
  }, [open, data?.room?._id]);

  useEffect(() => {
    if (!open) {
      setRoom(null);
      setImagesList([]);
      setFacilitiesList([]);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="xxl"
      className="overflow-x-hidden"
    >
      {bookLoading ? (
        <div className="container_bx pt-[81px]">
          <div className="px-[14px]">
            <SkeletonOne />
          </div>
        </div>
      ) : (
        <>
          <DialogHeader>
            <div className="ps-[10%] w-full">
              <div className="flex justify-between">
                <div>Booking Details</div>
                <IconButton
                  color="blue-gray"
                  size="sm"
                  variant="text"
                  onClick={onClose}
                  className="cursor-pointer outline-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>
            </div>
          </DialogHeader>

          <DialogBody>
            <div className="container_bx">
              {/* {data?.totalPrice ? (
            <>
              <p className="text-lg font-semibold">
                Total Price: {data.totalPrice}
              </p>
            </>
          ) : (
            <p>Loading details...</p>
          )} */}

              {loading ? (
                <SkeletonOne />
              ) : (
                <>
                  <p className="text-lg font-semibold">
                    <span className="text-[#919191] font-light">
                      {t("room_name")}:{" "}
                    </span>
                    {room?.roomNumber}
                  </p>

                  <div className="pt-4 md:pt-4 pb-10">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Images Box */}
                      <div className="col-span-12 md:col-span-5 lg:col-span-5">
                        <img
                          src={imagesList[0]}
                          alt="pic"
                          className="w-full rounded-2xl object-cover min-h-[420px] max-h-[420px]"
                          loading="lazy"
                        />
                      </div>

                      {/*  ROOM DATA */}
                      <div className="col-span-12 md:col-span-7 lg:col-span-7">
                        <div className="rounded-2xl border border-[#E5E5E5] border-solid pt-13 px-10 pb-13 w-full min-h-full flex flex-col justify-center">
                          {/* room price */}
                          <div className="mt-1">
                            <span className="text-[#1ABC9C] text-3xl font-semibold">
                              ${room?.price}
                            </span>
                            <span className="text-[#B0B0B0] text-3xl font-extralight ps-2">
                              {t("per_night")}
                            </span>
                          </div>

                          {/* discount */}
                          <p className="mt-2 text-[#FF1612]">
                            {t("discount")} {room?.discount}% {t("off")}
                          </p>

                          {/* total price */}
                          <div className="flex gap-2 mt-2">
                            <span className="text-[#919191] font-light flex gap-1 items-center">
                              <CurrencyDollarIcon className="size-5" />
                              {t("booking_total_price")}:
                            </span>
                            <div className="text-[#152C5B] font-medium">
                              {data?.totalPrice}$
                            </div>
                          </div>

                          {/* start date */}
                          <div className="flex gap-2 mt-4">
                            <span className="text-[#919191] font-light flex gap-1 items-center">
                              <CalendarDaysIcon className="size-5" />
                              {t("booking_start_date")}:
                            </span>
                            <div className="flex gap-1.5 items-center">
                              <span className="text-[#152C5B] font-medium">
                                {dayjs(data?.startDate).format("D-M-YYYY")}
                              </span>
                            </div>
                          </div>

                          {/* end date */}
                          <div className="flex gap-2 mt-2">
                            <span className="text-[#919191] font-light flex gap-1 items-center">
                              <CalendarDaysIcon className="size-5" />
                              {t("booking_end_date")}:
                            </span>
                            <div className="flex gap-1.5 items-center">
                              <span className="text-[#152C5B] font-medium">
                                {dayjs(data?.endDate).format("D-M-YYYY")}
                              </span>
                            </div>
                          </div>

                          {/* status */}
                          <div className="mt-6">
                            <span className="bg-[#f0fdf4] text-[#008236] capitalize text-base font-normal rounded-full py-1 px-4 border border-[#008236]">
                              {data?.status}
                            </span>
                          </div>
                          {/*  */}

                          {/* room link */}
                          <Button
                            variant="filled"
                            type="submit"
                            className="mt-7 bg-[#3252DF] cursor-pointer capitalize font-normal text-base py-2 px-10 w-fit"
                            onClick={() => navigate(`/room-details/${data?.room?._id}`)}
                          >
                            {t("room_details")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {imagesList?.length > 0 ? (
                <div className="images-bx pt-4 md:pt-4 pb-10">
                  <div className="grid grid-flow-col grid-cols-12 grid-rows-3 md:grid-rows-4 lg:grid-rows-4 gap-3">
                    {imagesList?.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer ${
                          index === 0
                            ? "col-span-12 md:col-span-7 lg:col-span-7 row-span-2 md:row-span-4 lg:row-span-4"
                            : "col-span-6 md:col-span-5 lg:col-span-5 row-span-1 md:row-span-2 lg:row-span-2"
                        }`}
                        onClick={() => {
                          setPhotoIndex(index);
                          setIsGalleryOpen(true);
                        }}
                      >
                        <img
                          className={`w-full rounded-2xl object-cover ${
                            index === 0
                              ? "h-[340px] sm:h-[340px] md:h-[440px] lg:h-[440px]"
                              : "h-[164px] sm:h-[164px] md:h-[214px] lg:h-[214px]"
                          }`}
                          src={image}
                          alt={`Room ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-12 lg:col-span-3">
                    <img
                      className="size-full"
                      src={Images?.defaultImage}
                      alt="pic"
                    />
                  </div>
                </div>
              )} */}

                  {/* details bx */}
                  {/* <div className="details-bx pb-8">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-7 lg:col-span-7">
                        <div className="room-options pt-5">
                          <div className="grid grid-cols-12 gap-4">
                            {facilitiesList?.map((facility) => (
                              <div
                                key={facility?._id}
                                className="col-span-6 md:col-span-6 lg:col-span-3"
                              >
                                <div className="flex flex-col gap-1.5">
                                  <img
                                    className="w-[38px]"
                                    src={Images.bedroom_icon}
                                  />
                                  <div className="flex gap-1 items-baseline">
                                    <span className="text-[#919191] text-sm font-light">
                                      {facility?.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              )}
            </div>
          </DialogBody>
        </>
      )}

      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="mr-1 outline-0 cursor-pointer"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={onClose}
          className="outline-0 cursor-pointer"
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default BookingDetailsModal;
