import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  PencilIcon,
  DocumentTextIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import dayjs from "dayjs";
import PageTitle from "../../shared/page-title/page-title";
import { ROOM_BOOKING, BASE_HEADERS } from "../../../../constants/END_POINTS";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import Images from "../../../../assets/Images/Images";
import BookingDetailsModal from "./book-modal";
import "./my-booking.scss";
import { Link } from "react-router-dom";

const MyBooking = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [book, setBook] = useState([]);
  const [bookData, setBookData] = useState({});
  // modal
  const [openModal, setOpenModal] = useState(false);
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  // get book details
  const getBookDetails = async (id) => {
    try {
      setBookLoading(true);
      const response = await axios.get(ROOM_BOOKING.getBookDetails(id), {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setBookData(response?.data?.data?.booking);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setBookLoading(false);
    }
  };
  const handleModalOpen = (id) => {
    setOpenModal(!openModal);
    getBookDetails(id);
  };

  // get my booking
  const getBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ROOM_BOOKING.getAllBooking, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setBook(response?.data?.data?.myBooking);
      console.log(response?.data?.data?.myBooking);
    } catch (error) {
      console.error("Error fetching room:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div id="booking_page" className="pb-7">
      <div className="container_bx">
        {/* page title */}
        <div className="relative pb-5">
          <PageTitle
            roomName={t("my_booking")}
            //roomLocation={t("room_location")}
            roomLink="/my-booking"
            linkText={t("my_booking")}
          />
        </div>

        <div className="bg-[#f3f4f6] px-5 pt-5 pb-3.5 rounded-lg mb-6">
          {loading ? (
            <SkeletonOne />
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {book?.length > 0 ? (
                <>
                  {book?.map((item) => (
                    <div
                      key={item._id}
                      className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4"
                    >
                      <Card className="mb-2 w-full">
                        <CardBody>
                          <div className="flex relative">
                            <div className="pe-14">
                              <div className="flex gap-2.5 items-center mb-2">
                                <Typography
                                  variant="h5"
                                  color="blue-gray"
                                  className=""
                                >
                                  {item?.totalPrice}
                                </Typography>
                                <span className="bg-[#f0fdf4] text-[#008236] capitalize text-sm font-normal rounded-full py-0.5 px-2.5 border border-[#008236]">
                                  {item?.status}
                                </span>
                              </div>

                              <Typography>
                                <span className="flex flex-wrap gap-1 items-center mt-4.5">
                                  {/* <span className="font-medium">
                                  {t("date")}:
                                </span> */}
                                  <span className="flex gap-1 items-center text-sm text-[#6a7282] whitespace-nowrap">
                                    <CalendarDaysIcon className="size-4" />{" "}
                                    {dayjs(item?.startDate).format("D-M-YYYY")}
                                  </span>
                                  <ArrowsRightLeftIcon className="size-3.5 text-[#6a7282]" />
                                  <span className="flex gap-1 items-center text-sm text-[#6a7282] whitespace-nowrap">
                                    <CalendarDaysIcon className="size-4" />{" "}
                                    {dayjs(item?.endDate).format("D-M-YYYY")}
                                  </span>
                                </span>
                              </Typography>
                            </div>

                            <div className="size-12 flex items-center justify-center rounded-full absolute top-0 end-0 bg-[#e3e3e3]">
                              <img
                                className="size-6"
                                src={Images.defaultImage}
                                alt="pic"
                              />
                            </div>
                          </div>
                        </CardBody>

                        <CardFooter className="p-0 border-t border-[#ebe6e7] flex w-full">
                          <Link
                            to="/payment"
                            className="flex-1 flex gap-1.5 text-center justify-center items-center py-4 px-4 border-e border-[#ebe6e7] cursor-pointer"
                          >
                            <PencilIcon className="w-5 text-[#99a1af]" />{" "}
                            {t("checkout")}
                          </Link>
                          <div
                            className="flex-1 flex gap-1.5 text-center justify-center items-center py-4 px-4 cursor-pointer"
                            onClick={() => handleModalOpen(item?._id)}
                          >
                            <DocumentTextIcon className="w-5 text-[#99a1af]" />{" "}
                            {t("details")}
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </>
              ) : (
                "nodata"
              )}
            </div>
          )}
        </div>
        {/*  */}
      </div>

      {/* booking details modal */}
      <BookingDetailsModal
        open={openModal}
        onClose={handleModalOpen}
        data={bookData}
        bookLoading={bookLoading}
      />
    </div>
  );
};

export default MyBooking;
