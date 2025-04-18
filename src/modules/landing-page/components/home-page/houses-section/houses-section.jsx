import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ItemCard from "../../../shared/item-card/item-card";
import Images from "../../../../../assets/Images/Images";
import { Link } from "react-router-dom";
import SkeletonOne from "../../../shared/skeleton/skeleton-one";
//import { getAllRooms } from "../../../../../networking/rooms.services";
import { ROOMS_URLS, BASE_HEADERS } from "../../../../../constants/END_POINTS";
import "./houses-section.scss";

const HousesSection = () => {
  const { t } = useTranslation();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage] = useState(1);
  const itemsPerPage = 4;

  // get all rooms
  const getRoomsList = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ROOMS_URLS.getAll}?page=${page}&size=${itemsPerPage}`,
        BASE_HEADERS
      );
      setRoomsList(response.data?.data?.rooms || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoomsList(currentPage);
  }, [currentPage]);

  return (
    <div id="houses_section">
      <div className="container_bx pt-6 pb-5">
        <div className="flex justify-between mb-4 items-baseline">
          <h1 className="text-[#152C5B] text-2xl font-medium">
            {t("home_page.houses_section_title")}
          </h1>

          <Link
            to="/explore-rooms"
            className="text-[#E74C3C] font-semibold"
            onClick={() => {
              window.scroll({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            {t("more")}
          </Link>
        </div>

        {loading ? (
          <SkeletonOne />
        ) : (
          <>
            <div className="grid grid-cols-12 gap-4">
              {roomsList.length > 0
                ? roomsList.map((room, index) => (
                    <div
                      key={index}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <div className="">
                        <ItemCard
                          cardImg={room?.images[0] || Images.room_default}
                          imgClass="h-[200px]"
                          itemPrice={room?.price}
                          cardLabel={true}
                          insideData={false}
                          outsideData={true}
                          itemName={room?.roomNumber}
                          itemLocation="item location"
                          roomLink={`/room-details/${room?._id}`}
                          roomId={room?._id}
                        />
                      </div>
                    </div>
                  ))
                : "nodata"}
            </div>
          </>
        )}
        {/*  */}

        {/* <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ItemCard
              cardImg={Images.popular_1}
              imgClass="h-[200px]"
              itemPrice="45"
              cardLabel={true}
              insideData={false}
              outsideData={true}
              itemName="item name"
              itemLocation="item location"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ItemCard
              cardImg={Images.popular_2}
              imgClass="h-[200px]"
              itemPrice="45"
              cardLabel={false}
              insideData={false}
              outsideData={true}
              itemName="item name"
              itemLocation="item location"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ItemCard
              cardImg={Images.popular_3}
              imgClass="h-[200px]"
              itemPrice="45"
              cardLabel={false}
              insideData={false}
              outsideData={true}
              itemName="item name"
              itemLocation="item location"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ItemCard
              cardImg={Images.popular_4}
              imgClass="h-[200px]"
              itemPrice="45"
              cardLabel={false}
              insideData={false}
              outsideData={true}
              itemName="item name"
              itemLocation="item location"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HousesSection;
