import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Images from "../../../../assets/Images/Images";
import PageTitle from "../../shared/page-title/page-title";
import RateForm from "./rate-form";
import CommentForm from "./comment-form";
import AboutTabs from "./about-tabs";
// lightbox
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
// datepicker
import Booking from "../../shared/booking/booking";
//
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import { getRoomDetails } from "../../../../networking/rooms.services";
import "./room-details.scss";

const RoomDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  // gallery
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [room, setRoom] = useState();
  const [facilitiesList, setFacilitiesList] = useState();

  // Array of image sources
  //const imageList = [Images.room_pic_1, Images.room_pic_2, Images.room_pic_3];

  async function getRoom(id) {
    //if (!id) return;
    try {
      setLoading(true);
      const response = await getRoomDetails(id);
      setImagesList(response?.data?.data?.room?.images || []);
      setFacilitiesList(response?.data?.data?.room?.facilities);
      setRoom(response?.data?.data?.room);

      //setRoomsList(response.data?.data?.rooms || []);
    } catch (error) {
      console.error("Error fetching room:", error);
    } finally {
      setLoading(false);
    }
  }

  // booking
  const handelBookSubmit = async () => {
    setFormSubmitted(true); // Mark form as submitted

    if (!value.startDate || !value.endDate || numberValue <= 0) {
      return; // Stop submission if validation fails
    }

    // Format dates to "YYYY-MM-DD"
    const formattedStartDate = new Date(value.startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(value.endDate).toISOString().split("T")[0];

    const bookingData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      roomId,
      totalPrice: totalDiscountPrice,
    };

    // navigate(btnLink || "/explore-rooms");
    navigate(btnLink);
    console.log(bookingData);
  };

  useEffect(() => {
    getRoom(id);
  }, [id]);

  return (
    <div id="details_page">
      <div className="container_bx">
        {/* page title */}
        <PageTitle
          roomName={t("room_name")}
          roomLocation={t("room_location")}
          roomLink="/room-details"
          linkText={t("room_details")}
        />

        {loading ? (
          <SkeletonOne />
        ) : (
          <>
            {/* Images Box */}
            {imagesList?.length > 0 ? (
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
            )}
          </>
        )}

        {/* Lightbox Component */}
        <Lightbox
          open={isGalleryOpen}
          close={() => setIsGalleryOpen(false)}
          index={photoIndex}
          slides={imagesList.map((src) => ({ src }))}
          plugins={[Counter, Zoom]}
        />

        {/* details bx */}
        <div className="details-bx pb-8">
          <div className="grid grid-cols-12 gap-4">
            {/*  */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7">
              <p className="text-[#919191] font-light pe-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas at est at turpis lacinia tempus. Mauris elit felis,
                volutpat ac elit eu, sodales luctus turpis. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Cras augue dui, facilisis vel molestie id, vestibulum et
                dui. Proin maximus ante eget arcu euismod gravida. Aenean
                aliquet maximus ex eget vehicula. In mattis commodo faucibus.{" "}
                <br />
                Nam et tristique neque, id varius eros. Integer vel maximus
                enim. Quisque varius orci magna, vitae laoreet lorem tincidunt
                sed. Sed fermentum quam sed lacus molestie bibendum. Nam in nunc
                sit amet libero aliquet gravida eget in nisl. Ut ornare felis
                ipsum, a consectetur augue eleifend at. Nunc tempor, tellus nec
                fermentum dictum, est orci porttitor eros, dapibus cursus est
                felis non arcu. Maecenas non mollis sem. Aenean ut egestas
                felis, ut mattis felis. Donec dui neque, hendrerit at tellus id,
                iaculis lobortis diam. Nulla lacus sem, tempus ac nulla vitae,
                bibendum interdum nisl. Vivamus iaculis tortor vel felis
                vestibulum, non lobortis erat convallis. Mauris sollicitudin
                pulvinar ligula, eu lobortis diam luctus eu. Cras accumsan
                rutrum metus in suscipit. Nulla felis purus, semper quis sem
                tincidunt, mollis cursus mi. Pellentesque dictum fermentum leo
                eget interdum. Pellentesque gravida purus eu ultrices pharetra.{" "}
              </p>

              <div className="room-options pt-5">
                <div className="grid grid-cols-12 gap-4">
                  {/* room item */}
                  {facilitiesList?.map((facility) => (
                    <div
                      key={facility?._id}
                      className="col-span-6 md:col-span-6 lg:col-span-3"
                    >
                      <div className="flex flex-col gap-1.5">
                        <img className="w-[38px]" src={Images.bedroom_icon} />
                        <div className="flex gap-1 items-baseline">
                          {/* <span className="text-[#152C5B] text-sm font-semibold">
                              5
                            </span> */}
                          <span className="text-[#919191] text-sm font-light">
                            {facility?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.bedroom_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          5
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          bedroom
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.livingroom_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          1
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          living room
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.bathroom_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          3
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          bathroom
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.diningroom_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          1
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          dining room
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.wifi_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          10
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          mbp/s
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.ic_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          7
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          unit ready
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.kulkas_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          2
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          refigrator
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-6 lg:col-span-3">
                    <div className="flex flex-col gap-1.5">
                      <img className="w-[38px]" src={Images.tv_icon} />
                      <div className="flex gap-1 items-baseline">
                        <span className="text-[#152C5B] text-sm font-semibold">
                          4
                        </span>
                        <span className="text-[#919191] text-sm font-light">
                          television
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* booking card */}
            <div className="col-span-12 md:col-span-5 lg:col-span-5">
              <div className="rounded-2xl border border-[#E5E5E5] border-solid pt-13 px-10 pb-13 w-full min-h-full flex flex-col justify-center">
                <h2 className="text-[#152C5B] text-[20px] font-semibold">
                  {t("home_page.start_booking")}
                </h2>

                <div className="mt-3">
                  <span className="text-[#1ABC9C] text-3xl font-semibold">
                    ${room?.price}
                  </span>
                  <span className="text-[#B0B0B0] text-3xl font-extralight ps-2">
                    {t("per_night")}
                  </span>
                </div>

                <p className="mt-2 text-[#FF1612]">
                  {t("discount")} {room?.discount}% {t("off")}
                </p>

                {/* booking */}
                <div className="mt-10">
                  <Booking
                    buttonText={t("continue_book")}
                    price={room?.price}
                    discount={room?.discount}
                    payment={true}
                    btnClass="text-center"
                    roomId={id}
                    btnLink="/explore-rooms"
                    handelBookSubmit={handelBookSubmit}
                  />
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>

        {/* forms */}
        <div className="rounded-2xl border border-[#E5E5E5] border-solid py-6 px-8 mb-10 mt-4">
          <div className="grid grid-cols-12 gap-8">
            {/* rate form */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6 border-e-0 border-[#E5E5E5] md:border-e lg:border-e border-b md:border-b-0 lg:border-b-0">
              <RateForm roomId={id} />
            </div>

            {/* comment form */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <CommentForm roomId={id} />
            </div>
          </div>
        </div>
        {/*  */}

        {/* About tabs */}
        <div className="mb-10">
          <AboutTabs roomId={id} />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default RoomDetails;
