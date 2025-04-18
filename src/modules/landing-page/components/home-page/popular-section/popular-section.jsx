import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemCard from "../../../shared/item-card/item-card";
import SkeletonOne from "../../../shared/skeleton/skeleton-one";
import Images from "../../../../../assets/Images/Images";
import { getAllRooms } from "../../../../../networking/rooms.services";
import "./popular-section.scss";

const PopularSection = () => {
  const { t } = useTranslation();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage] = useState(1);
  const itemsPerPage = 5;

  // get all rooms
  // const getRoomsList = async (page) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `${ROOMS_URLS.getAll}?page=${page}&size=${itemsPerPage}`,
  //       BASE_HEADERS
  //     );
  //     setRoomsList(response.data?.data?.rooms || []);
  //     setTotalCount(response.data?.data?.totalCount || 0);
  //   } catch (error) {
  //     console.error("Error fetching rooms:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // get all rooms
  async function getRoomsList(page) {
    try {
      setLoading(true);
      const response = await getAllRooms(page, itemsPerPage);
      setRoomsList(response.data?.data?.rooms || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRoomsList(currentPage);
  }, [currentPage]);

  return (
    <div id="popular_section">
      <div className="container_bx pt-16 pb-6">
        <div className="flex justify-between mb-4 items-baseline">
          <h1 className="text-[#152C5B] text-2xl font-medium">
            {t("home_page.popular_section_title")}
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
            <div className="grid grid-flow-row md:grid-flow-col lg:grid-flow-col grid-rows-4 gap-4">
              {roomsList?.length > 0
                ? roomsList?.map((room, index) => (
                    <div
                      key={index}
                      className={`${
                        index === 0
                          ? "col-span-2 row-span-2 md:row-span-4 lg:row-span-4 h-full"
                          : "col-span-2 row-span-2 md:row-span-2 lg:row-span-2"
                      }`}
                    >
                      <div className="">
                        <ItemCard
                          cardImg={room?.images[0] || Images.room_default}
                          imgClass={`${
                            index === 0
                              ? "h-[210px] md:h-[436px] lg:h-[436px]"
                              : "h-[210px]"
                          }`}
                          itemPrice={room?.price}
                          cardLabel={true}
                          insideData={true}
                          outsideData={false}
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

        {/* <div className="grid grid-flow-col grid-rows-4 gap-4">
          <div className="row-span-4 h-full">
            <ItemCard
              cardImg={Images.popular_1}
              imgClass="h-[436px]"
              itemPrice="45"
              cardLabel={true}
              insideData={true}
              outsideData={false}
              itemName="item name"
              itemLocation="item location"
            />
          </div>
          <div className="col-span-2 row-span-2">
            <div className="row-span-4 h-full">
              <ItemCard
                cardImg={Images.popular_2}
                imgClass="h-[210px]"
                itemPrice="22"
                cardLabel={true}
                insideData={true}
                outsideData={false}
                itemName="item name"
                itemLocation="item location"
              />
            </div>
          </div>
          <div className="col-span-2 row-span-2">
            <div className="row-span-4 h-full">
              <ItemCard
                cardImg={Images.popular_3}
                imgClass="h-[210px]"
                itemPrice="22"
                cardLabel={true}
                insideData={true}
                outsideData={false}
                itemName="item name"
                itemLocation="item location"
              />
            </div>
          </div>
          <div className="col-span-2 row-span-2">
            <div className="row-span-4 h-full">
              <ItemCard
                cardImg={Images.popular_4}
                imgClass="h-[210px]"
                itemPrice="22"
                cardLabel={true}
                insideData={true}
                outsideData={false}
                itemName="item name"
                itemLocation="item location"
              />
            </div>
          </div>
          <div className="col-span-2 row-span-2">
            <div className="row-span-4 h-full">
              <div className="row-span-4 h-full">
                <ItemCard
                  cardImg={Images.popular_5}
                  imgClass="h-[210px]"
                  itemPrice="22"
                  cardLabel={true}
                  insideData={true}
                  outsideData={false}
                  itemName="item name"
                  itemLocation="item location"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PopularSection;
