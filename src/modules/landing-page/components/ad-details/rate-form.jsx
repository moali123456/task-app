//import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Textarea,
  Button,
  Spinner,
  Rating,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { ROOM_REVIEWS, BASE_HEADERS } from "../../../../constants/END_POINTS";
import { setRoomReviewData } from "../../../../redux/roomReviewSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const RateForm = ({ roomId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const reviews = useSelector((state) => state.reviews.roomReviewData);
  //const [rated, setRated] = useState(4);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: 4, // Default rating value
      message: "",
    },
  });

  // add review
  const onSubmit = async (data) => {
    if (!isLogged) {
      toast.error(t("not_logged_msg"), { position: "top-center" });
      return;
    }

    console.log(data);

    try {
      const response = await axios.post(
        ROOM_REVIEWS.addReview,
        { roomId, rating: data.rating, review: data.review }, // Payload
        {
          headers: {
            Authorization: `${JSON.parse(localStorage?.getItem("infooooo"))?.token}`,
          },
        }
      );

      // Optimistically update UI
      dispatch(setRoomReviewData([...reviews, response.data?.data]));
  
      toast.success(t("review_submitted_msg"), { position: "top-center" });
  
      // Fetch updated comments
      const updatedReviews = await axios.get(ROOM_REVIEWS.getAllReviews(roomId), BASE_HEADERS);
      dispatch(setRoomReviewData(updatedReviews.data?.data?.roomReviews || []));
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      toast.error(error.response?.data?.message || t("error_msg"), { position: "top-center" });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h3 className="text-[#152C5B] text-lg font-semibold mb-2">
          {t("rate")}
        </h3>

        {/* Rating Input Inside the Form */}
        <div className="flex items-center gap-2 mb-5">
          <Controller
            name="rating"
            control={control}
            rules={{ required: t("rating_required") }}
            render={({ field }) => (
              <>
                <Rating
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  unratedColor="amber"
                  ratedColor="amber"
                />
                <Typography
                  color="blue-gray"
                  className="font-semibold text-[#919191] text-sm"
                >
                  {field.value}.0
                </Typography>
              </>
            )}
          />
        </div>
        {errors.rating && (
          <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
            {errors.rating.message}
          </p>
        )}

        <h3 className="text-[#152C5B] text-lg font-semibold mb-2">
          {t("message")}
        </h3>

        {/* Message Input Inside the Form */}
        <div className="pe-0 md:pe-10 lg:pe-10 pb-5 md:pb-0 lg:pb-0">
          <Textarea
            id="review"
            name="review"
            placeholder={t("email_placeholder")}
            autoComplete="email"
            className="!border !border-[#E5E5E5] bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
            labelProps={{
              className: "hidden",
            }}
            {...register("review", {
              required: t("message_required"),
            })}
          />
          {errors.review && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
              {errors.review.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-6">
          <Button
            type="submit"
            className="bg-[#3252DF] cursor-pointer capitalize font-normal text-base py-2 px-10 flex gap-3 mb-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                {t("rate")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("rate")}</>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RateForm;
