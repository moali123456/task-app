import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { EyeIcon as EyeSolid } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { ROOMS_FAVOURITES } from "../../../../constants/END_POINTS";
import { BASE_HEADERS } from "../../../../constants/app-constants";
import { toast } from "react-toastify";
import "./item-card.scss";
import { Link } from "react-router-dom";

const ItemCard = ({
  cardImg,
  imgClass,
  itemPrice,
  cardLabel,
  insideData,
  outsideData,
  itemName,
  itemLocation,
  roomLink,
  roomId,
}) => {
  const { t, i18n } = useTranslation();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [isLiked, setIsLiked] = useState(true);

  const handleFavIcon = async () => {
    setIsLiked(false);

    if (!isLogged) {
      // alert("Not logged in");
      toast.error(t("not_loged_msg"));
      return;
    }

    try {
      const response = await axios.post(
        ROOMS_FAVOURITES.addFav,
        { roomId },
        BASE_HEADERS
      );

      toast.success(response?.data?.message || t("add_successfuly"));
      console.log("Room added to favorites:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || t("wrong_message"));
    }
  };

  const deleteFavRoom = async () => {
    setIsLiked(true);

    try {
      const response = await axios.delete(ROOMS_FAVOURITES.deleteFav(roomId), {
        ...BASE_HEADERS,
        data: { roomId },
      });

      toast.success(response?.data?.message || t("remove_successfuly"));
      console.log("Room added to favorites:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || t("wrong_message"));
    }
  };
  return (
    <div id="item_card">
      <div className="relative overflow-hidden img-bx">
        {/* card label show price */}
        {cardLabel && (
          <span
            className="absolute top-0 end-0 text-white text-sm bg-[#FF498B] py-1.5 px-3.5"
            style={{
              borderRadius:
                i18n.language === "ar" ? "1rem 0 1rem 0" : "0 1rem 0 1rem",
            }}
          >
            <span className="font-normal">${itemPrice}</span> {""}{" "}
            <span className="font-extralight">{t("card_item.per_night")}</span>
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
          <div className="flex">
            {/* Heart Icon (Visible Initially) */}
            {isLiked && (
              <div
                onClick={() => handleFavIcon()}
                className="cursor-pointer transition-all duration-200"
              >
                <HeartSolid className="h-7 w-7 text-white cursor-pointer transition-all duration-200" />
              </div>
            )}

            {/* Beaker Icon (Hidden Initially) */}
            {!isLiked && (
              <div
                onClick={() => deleteFavRoom()}
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

export default ItemCard;
