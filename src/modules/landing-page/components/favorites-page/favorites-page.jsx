import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";
import PageTitle from "../../shared/page-title/page-title";
import ItemCard from "../../shared/item-card/item-card";
import Images from "../../../../assets/Images/Images";
import { ROOMS_FAVOURITES } from "../../../../constants/END_POINTS";
import { BASE_HEADERS } from "../../../../constants/app-constants";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import "./favorites-page.scss";

const FavoritesPage = () => {
  const { t } = useTranslation();
  const [roomsList, setRoomsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  // get all favorites
  const getRoomsList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ROOMS_FAVOURITES.getAllFav}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setRoomsList(response.data?.data?.favoriteRooms[0]?.rooms || []);
      //console.log(response.data?.data?.favoriteRooms[0]?.rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      getRoomsList();
    }
  }, [isLogged]);

  return (
    <div id="favorites_page">
      <div className="container_bx">
        {/* page title */}
        <PageTitle
          roomName={t("your_favorites")}
          //roomLocation="Bogor, Indonesia"
          roomLink="/favorites"
          linkText={t("favorites")}
        />

        <h1 className="text-[#152C5B] text-[21px] font-semibold mt-8">
          {t("your_rooms")}
        </h1>

        {loading ? (
          <div className="mt-5">
            <SkeletonOne />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 mt-5">
            {/* card item */}
            {roomsList.length > 0
              ? roomsList.map((room, index) => (
                  <div
                    key={index}
                    className="col-span-12 md:col-span-6 lg:col-span-3 mb-5"
                  >
                    <ItemCard
                      cardImg={room?.images[0] || Images.room_default}
                      imgClass="h-[200px]"
                      itemPrice={room.price}
                      cardLabel={true}
                      insideData={true}
                      outsideData={false}
                      itemName={room?.roomNumber}
                      itemLocation="item location"
                      roomLink={`/room-details/${room?._id}`}
                      roomId={room?._id}
                      refreshRooms={getRoomsList}
                    />
                  </div>
                ))
              : "No data available"}
            {/*  */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
