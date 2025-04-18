import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AdsCard from "../../../shared/ads-card/ads-card";
import Images from "../../../../../assets/Images/Images";
import { Link } from "react-router-dom";
import SkeletonOne from "../../../shared/skeleton/skeleton-one";
import { ADS_ROOMS, BASE_HEADERS } from "../../../../../constants/END_POINTS";
import "./ads-section.scss";

const AdsSection = () => {
  const { t } = useTranslation();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all rooms
  const getRoomsList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ADS_ROOMS.getAllAds, BASE_HEADERS);
      setRoomsList(response.data?.data?.ads || []);
      console.log(response.data?.data?.ads);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoomsList();
  }, []);

  return (
    <div id="ads_section">
      <div className="container_bx pt-3 pb-6">
        <div className="flex justify-between mb-4 items-baseline">
          <h1 className="text-[#152C5B] text-2xl font-medium">
            {t("home_page.ads")}
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
              {roomsList?.length > 0
                ? roomsList.slice(0, 4)?.map((room, index) => (
                    <div
                      key={index}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <div className="">
                        <AdsCard
                          cardImg={room?.room?.images[0] || Images.room_default}
                          imgClass="h-[200px]"
                          itemDiscount={room?.room?.discount}
                          cardLabel={true}
                          insideData={false}
                          outsideData={true}
                          itemName={room?.room?.roomNumber}
                          itemLocation="item location"
                          roomLink={`/ad-details/${room?._id}`}
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
      </div>
    </div>
  );
};

export default AdsSection;
