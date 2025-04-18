import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
  Typography,
  Carousel,
  Chip,
} from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import {
  ROOMS_ADMIN_URLS,
  BASE_HEADERS,
} from "../../../../constants/ADMIN_END_POINTS";
import SkeletonOne from "../../../landing-page/shared/skeleton/skeleton-one";
import Images from "../../../../assets/Images/Images";

const DetailsModal = ({ open, handleOpen, roomId }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState();
  const [facilitiesList, setFacilitiesList] = useState();
  const [imagesList, setImagesList] = useState([]);

  // get room details
  const getRoom = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        ROOMS_ADMIN_URLS.getRoomDetails(id),
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
    if (roomId) {
      getRoom(roomId);
    }
  }, [roomId]);

  return (
    <Dialog
      open={open}
      size="md"
      handler={handleOpen}
      //dismiss={{ outsidePress: false }}
      className="details_modal"
      overlayProps={{ className: "dialog-backdrop" }}
    >
      <DialogHeader className="justify-end pb-0">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
          className="cursor-pointer"
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
      </DialogHeader>

      {/* body */}
      <DialogBody className="pt-0">
        {loading ? (
          <div className="pt-5">
            <SkeletonOne />
          </div>
        ) : (
          <>
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="flex gap-1.5 items-end"
              >
                {t("room_number")} :
                <span className="text-[#9b9b9b] text-base font-bold">
                  ({room?.roomNumber})
                </span>
              </Typography>
            </div>

            {/* gallery */}
            <div className="pt-3 carsoul-bx">
              <Carousel transition={{ duration: 0.5 }} className="rounded-xl">
                {imagesList?.length > 0 ? (
                  imagesList?.map((image, index) => (
                    <img
                      src={image}
                      alt="pic"
                      key={index}
                      className="w-full h-64 object-cover"
                    />
                  ))
                ) : (
                  <img src={Images.defaultImage} alt="pic" key="default" />
                )}
              </Carousel>
            </div>

            {/* facilites */}
            <div className="mt-4">
              <div className="text-lg font-semibold mb-3">
                {t("facilities")}
              </div>

              {facilitiesList?.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  {facilitiesList?.map((facility, index) => (
                    <Chip variant="ghost" value={facility.name} key={index} />
                  ))}
                </div>
              ) : (
                "no data"
              )}
            </div>

            {/* data */}
            <div className="mt-5">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <div className="text-md font-semibold mb-1">{t("price")}</div>
                  <div className="flex gap-1.5 items-end font-semibold text-[#1f00ab]">
                    <CurrencyDollarIcon className="text-[#b8b8b8] size-7" />
                    <span>{room?.price}$</span>
                  </div>
                </div>
                {/*  */}

                <div className="col-span-12 md:col-span-4">
                  <div className="text-md font-semibold mb-1">
                    {t("capacity")}
                  </div>
                  <div className="flex gap-1.5 items-end font-semibold text-[#1f00ab]">
                    <UserGroupIcon className="text-[#b8b8b8] size-7" />
                    <span>{room?.capacity}</span>
                  </div>
                </div>
                {/*  */}

                <div className="col-span-12 md:col-span-4">
                  <div className="text-md font-semibold mb-1">
                    {t("discount")}
                  </div>
                  <div className="flex gap-1.5 items-end font-semibold text-[#1f00ab]">
                    <ArrowTrendingDownIcon className="text-[#b8b8b8] size-7" />
                    <span>{room?.discount}%</span>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </>
        )}
      </DialogBody>

      {/* footer */}
      <DialogFooter className="flex justify-end gap-2">
        <Button variant="outlined" onClick={handleOpen} size="md" className="cursor-pointer">
          {t("close")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DetailsModal;
