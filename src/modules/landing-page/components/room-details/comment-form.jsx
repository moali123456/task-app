import { useTranslation } from "react-i18next";
import { Textarea, Button, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { ROOM_COMMENTS, BASE_HEADERS } from "../../../../constants/END_POINTS";
import { useForm } from "react-hook-form";
import { setRoomCommentsData } from "../../../../redux/roomCommentsSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CommentForm = ({ roomId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const comments = useSelector((state) => state.comments.roomCommentsData);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // add comment
  const onSubmit = async (data) => {
    if (!isLogged) {
      toast.error(t("not_logged_msg"), { position: "top-center" });
      reset();
      return;
    }
  
    try {
      // Send new comment to API
      const response = await axios.post(
        ROOM_COMMENTS.addComment,
        { roomId, comment: data.comment },
        {
          headers: {
            Authorization: `${JSON.parse(localStorage?.getItem("infooooo"))?.token}`,
          },
        }
      );
  
      // Optimistically update UI
      dispatch(setRoomCommentsData([...comments, response.data?.data]));
  
      toast.success(t("comment_submitted_msg"), { position: "top-center" });
  
      // Fetch updated comments
      const updatedComments = await axios.get(ROOM_COMMENTS.getAllComments(roomId), BASE_HEADERS);
      dispatch(setRoomCommentsData(updatedComments.data?.data?.roomComments || []));
  
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      toast.error(error.response?.data?.message || t("error_msg"), { position: "top-center" });
    } finally {
      reset();
    }
  };
  
  return (
    <>
      <h3 className="text-[#152C5B] text-lg font-semibold mb-6">
        {t("add_your_comment")}
      </h3>

      <div className="ps-0 md:ps-2 lg:ps-2">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Textarea
            id="comment"
            name="comment"
            placeholder={t("email_placeholder")}
            autoComplete="email"
            className="!border !border-[#E5E5E5] bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
            labelProps={{
              className: "hidden",
            }}
            {...register("comment", {
              required: t("comment_required"),
            })}
          />
          {errors.comment && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
              {errors.comment.message}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-between items-center mt-6">
            <Button
              type="submit"
              className="bg-[#3252DF] cursor-pointer capitalize font-normal text-base py-2 px-10 flex gap-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  {t("add_comment")} <Spinner className="h-6 w-6" color="white" />
                </>
              ) : (
                <>{t("add_comment")}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
