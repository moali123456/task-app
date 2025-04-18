import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import axios from "axios";
import Images from "../../../../assets/Images/Images";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import { ROOM_REVIEWS } from "../../../../constants/END_POINTS";
import { useDispatch, useSelector } from "react-redux";
import { setRoomReviewData } from "../../../../redux/roomReviewSlice";

const ReviewsTab = ({ roomId }) => {
  const { t } = useTranslation();
  const [reviewData, setReviewData] = useState();
  const [loadingReviews, setLoadingReviews] = useState(false);
  const dispatch = useDispatch();
  const { roomReviewData } = useSelector((state) => state.reviews);
  // token
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;
  const isLogged = useSelector((state) => state.auth.isLogged);

  // get reviews
  const getReviews = async () => {
    if (!roomId) {
      console.error("Invalid roomId:", roomId);
      return;  // Exit the function if roomId is invalid
    }
    try {
      setLoadingReviews(true);
      const response = await axios.get(ROOM_REVIEWS.getAllReviews(roomId), {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setReviewData(response?.data?.data?.roomReviews || []);
      console.log("Reviews:", response?.data?.data?.roomReviews);

      const reviews = response.data?.data?.roomReviews || [];

      dispatch(setRoomReviewData(reviews));

      console.log("reviews data:", reviews);
    } catch (error) {
      console.error("Error fetching room reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [roomId]);

  // Re-run when reviews change
  useEffect(() => {
    setReviewData(roomReviewData);
  }, [roomReviewData]);

  return (
    <div className="w-full md:w-full lg:w-[100%] rounded-2xl border border-[#E5E5E5] border-solid py-0 px-0">
      {isLogged ? (
        <>
          {reviewData?.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12 lg:col-span-6">
                  <List>
                    {loadingReviews ? (
                      <SkeletonOne />
                    ) : (
                      <>
                        {reviewData?.map((review) => (
                          <div key={review._id} className="w-full list_item">
                            <ListItem>
                              <ListItemPrefix className="!me-3 mr-0">
                                <Avatar
                                  variant="circular"
                                  alt={review?.user?.userName}
                                  src={
                                    review?.user?.profileImage ||
                                    Images.default_avatar
                                  } // Fallback image
                                />
                              </ListItemPrefix>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  {review?.user?.userName}
                                </Typography>

                                <Rating
                                  className="about_rate"
                                  value={review?.rating}
                                  unratedColor="amber"
                                  ratedColor="amber"
                                  readonly
                                />

                                <Typography
                                  color="gray"
                                  className="font-normal"
                                >
                                  {review?.review}
                                </Typography>

                                <div className="text-sm flex gap-1 items-end mt-1 text-[#919191]">
                                  <CalendarDaysIcon className="size-6" />
                                  {dayjs(review?.createdAt).format("D-M-YYYY")}
                                </div>
                              </div>
                            </ListItem>
                          </div>
                        ))}
                      </>
                    )}
                  </List>
                </div>

                <div className="lg:col-span-6 hidden md:hidden lg:block">
                  <div className="p-3 h-full flex justify-center items-center">
                    <img
                      className="w-[75%]"
                      src={Images.add_review}
                      alt="pic"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img className="w-48" src={Images.empty_1} alt="pic" />
              <p className="mb-3">{t("no_reviews")}</p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <img className="w-48" src={Images.empty_1} alt="pic" />
          <p className="mb-3">{t("review_not_login")}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
