import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritesData } from "../../../../redux/favoritesSlice";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { EyeIcon as EyeSolid } from "@heroicons/react/24/solid";
import { ROOMS_FAVOURITES } from "../../../../constants/END_POINTS";
import { BASE_HEADERS } from "../../../../constants/app-constants";
import { toast } from "react-toastify";
import "./ads-card.scss";
import { Link } from "react-router-dom";

const AdsCard = ({
  cardImg,
  imgClass,
  itemDiscount,
  cardLabel,
  insideData,
  outsideData,
  itemName,
  itemLocation,
  roomLink,
  roomId,
  refreshRooms,
}) => {
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoritesData);

  // add to favorites
  const handleFavIcon = async () => {
    if (isLogged) {
      setIsLiked(true);
    }

    if (!isLogged) {
      // alert("Not logged in");
      toast.error(t("not_logged_msg"));
      return;
    }

    try {
      const response = await axios.post(
        ROOMS_FAVOURITES.addFav,
        { roomId },
        BASE_HEADERS
      );

      toast.success(response?.data?.message || t("add_successfuly"), {position: "top-center",});
      console.log("Room added to favorites:", response.data);
      // Fetch updated favorites list
     const updatedFavorites = await axios.get(ROOMS_FAVOURITES.getAllFav, BASE_HEADERS);
     dispatch(setFavoritesData(updatedFavorites.data?.data?.favoriteRooms[0]?.rooms || []));
    } catch (error) {
      toast.error(error.response?.data?.message || t("wrong_message"), {position: "top-center",});
    }
  };

  // delete from favorites
  const deleteFavRoom = async () => {
    setIsLiked(false);

    try {
      const response = await axios.delete(ROOMS_FAVOURITES.deleteFav(roomId), {
        ...BASE_HEADERS,
        data: { roomId },
      });

      toast.success(response?.data?.message || t("remove_successfuly"), {position: "top-center",});
      console.log("Room removed from favorites:", response.data);
      // Call the refresh function to reload the favorite rooms
      if (refreshRooms) {
        refreshRooms();
      }
      // Fetch updated favorites list
     const updatedFavorites = await axios.get(ROOMS_FAVOURITES.getAllFav, BASE_HEADERS);
     dispatch(setFavoritesData(updatedFavorites.data?.data?.favoriteRooms[0]?.rooms || []));
    } catch (error) {
      toast.error(error.response?.data?.message || t("wrong_message"), {position: "top-center",});
    }
  };

  // check room in favorites
  useEffect(() => {
    if (favorites && Array.isArray(favorites)) {
      setIsLiked(favorites.some((favRoom) => favRoom._id === roomId));
    }
  }, [favorites, roomId]);

  return (
    <div id="item_card">
      <div className="relative overflow-hidden img-bx">
        {/* card label show price */}
        {cardLabel && (
          <span
            className="absolute top-0 end-0 text-white text-sm bg-[#FF498B] py-1.5 px-9"
            style={{
              borderRadius:
                i18n.language === "ar" ? "1rem 0 1rem 0" : "0 1rem 0 1rem",
            }}
          >
            <span className="font-normal">{itemDiscount}%</span> {""}{" "}
            <span className="font-normal">Off</span>
          </span>
        )}

        {/* show name & location inside card */}
        {insideData && (
          <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full ps-5 pb-4 rounded-2xl data-holder flex items-start justify-end flex-col gap-0">
            <h3 className="text-white text-[17px] font-normal">{itemName}</h3>
            <p className="text-white text-sm font-extralight">{itemLocation}</p>
          </div>
        )}

        {/* hover items */}
        <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full rounded-2xl flex items-center justify-center gap-2 hover-card">
          {/* Heart Icons for Add/Remove */}
          <div className="flex">
            {!isLiked && (
              <div
                onClick={handleFavIcon}
                className="cursor-pointer transition-all duration-200"
              >
                <HeartSolid className="h-7 w-7 text-white cursor-pointer transition-all duration-200" />
              </div>
            )}

            {isLiked && (
              <div
                onClick={deleteFavRoom}
                className="cursor-pointer transition-all duration-200"
              >
                <HeartSolid className="h-7 w-7 text-red-500 cursor-pointer transition-all duration-200" />
              </div>
            )}
          </div>

          <Link
            to={roomLink}
            onClick={() => {
              window.scroll({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <EyeSolid className="h-7 w-7 text-white cursor-pointer transition-all duration-200" />
          </Link>
        </div>

        {/* card image */}
        <img
          src={cardImg}
          className={`w-full rounded-2xl object-cover object-center ${imgClass}`}
          alt="pic"
        />
      </div>

      {/* show name & location outside card */}
      {outsideData && (
        <div className="mt-2">
          <h3 className="text-[#152C5B] text-[17px] font-medium capitalize">
            {itemName}
          </h3>
          <p className="text-[#B0B0B0] text-sm font-extralight capitalize">
            {itemLocation}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdsCard;
