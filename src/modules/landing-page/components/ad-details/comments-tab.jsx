import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Images from "../../../../assets/Images/Images";
import SkeletonOne from "../../shared/skeleton/skeleton-one";
import { ROOM_COMMENTS } from "../../../../constants/END_POINTS";
import DeleteModal from "../../shared/modals/delete-modal";
import UpdateCommentModal from "../../shared/modals/update-comment-modal";
import { useDispatch, useSelector } from "react-redux";
import { setRoomCommentsData } from "../../../../redux/roomCommentsSlice";
import { toast } from "react-toastify";

const CommentsTab = ({ roomId }) => {
  const { t } = useTranslation();
  const [commentData, setCommentData] = useState();
  const [loadingComments, setLoadingComments] = useState(false);
  // delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  // update modal
  const [openUpdate, setOpenUpdate] = useState();
  const [selectedComment, setSelectedComment] = useState(null);
  const dispatch = useDispatch();
  const { roomCommentsData } = useSelector((state) => state.comments);

  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;
  // show delete comment icon
  const loggedUserId = token ? jwtDecode(token)?._id : null; // Extract user ID
  const isLogged = useSelector((state) => state.auth.isLogged);

  const handleOpenDelete = (commentId = null) => {
    setSelectedCommentId(commentId);
    setOpenDelete(!openDelete);
  };

  const handleOpenUpdate = (comment = null) => {
    setSelectedComment(comment);
    setOpenUpdate(!openUpdate);
  };

  // get comments
  const getComments = async () => {
    if (!roomId) {
      console.error("Invalid roomId:", roomId);
      return;  // Exit the function if roomId is invalid
    }
    try {
      setLoadingComments(true);
      const response = await axios.get(ROOM_COMMENTS.getAllComments(roomId), {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setCommentData(response?.data?.data?.roomComments || []);
      console.log("comments:", response?.data?.data?.roomComments);

      const comments = response.data?.data?.roomComments || [];

      dispatch(setRoomCommentsData(comments));

      console.log("comments data:", comments);
    } catch (error) {
      console.error("Error fetching room reviews:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  // delete comment
  const handleDeleteComment = async () => {
    if (!selectedCommentId) return;
    try {
      await axios.delete(`${ROOM_COMMENTS.deleteComment(selectedCommentId)}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        data: { roomId },
      });

      setCommentData((prev) =>
        prev.filter((comment) => comment._id !== selectedCommentId)
      );
      getComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      handleOpenDelete();
    }
  };

  const handleUpdateComment = async (data) => {
    if (!selectedComment?._id) return; // Ensure comment ID exists

    try {
      await axios.patch(
        `${ROOM_COMMENTS.updateComment(selectedComment._id)}`,
        { comment: data.comment }, // Send updated comment in body
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      getComments();
      toast.success(t("comment_updated"), { position: "top-center" });
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error(error.response?.data?.message || t("error_msg"), {
        position: "top-center",
      });
    } finally {
      handleOpenUpdate();
    }
  };

  console.log("roomId:", roomId);
  useEffect(() => {
    getComments();
  }, [roomId]);

  // Re-run when comments change
  useEffect(() => {
    setCommentData(roomCommentsData);
  }, [roomCommentsData]);

  return (
    <div className="w-full md:w-full lg:w-[100%] ms-0 md:ms-0 lg:ms-0 rounded-2xl border border-[#E5E5E5] border-solid py-0 px-0">
      {isLogged ? (
        <>
          {commentData?.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12 lg:col-span-7">
                  <List>
                    {loadingComments ? (
                      <SkeletonOne />
                    ) : (
                      <>
                        {commentData?.map((comment) => (
                          <div key={comment._id} className="w-full list_item">
                            <ListItem className="relative">
                              <ListItemPrefix className="!me-3 mr-0">
                                <Avatar
                                  variant="circular"
                                  alt="candice"
                                  src={comment?.user?.profileImage}
                                />
                              </ListItemPrefix>
                              <div>
                                <Typography variant="h6" color="blue-gray">
                                  {comment?.user?.userName}
                                </Typography>
                                <Typography
                                  color="gray"
                                  className="font-normal"
                                >
                                  {comment?.comment}
                                </Typography>
                                <div className="text-sm flex gap-1 items-end mt-1 text-[#919191]">
                                  <CalendarDaysIcon className="size-6" />{" "}
                                  {dayjs(comment?.createdAt).format("D-M-YYYY")}
                                </div>
                                <div className="absolute end-3 top-3">
                                  {comment?.user?._id === loggedUserId && (
                                    <div className="flex gap-2">
                                      <Button
                                        className="p-0 text-red-500 hover:text-red-700 cursor-pointer bg-[#ffeaeb] size-8 flex justify-center items-center rounded-full"
                                        onClick={() =>
                                          handleOpenDelete(comment?._id)
                                        }
                                      >
                                        <TrashIcon className="w-5 h-5" />
                                      </Button>
                                      <Button
                                        className="p-0 text-[#7e8592] hover:text-red-700 cursor-pointer bg-[#f4f5f7] size-8 flex justify-center items-center rounded-full"
                                        onClick={() =>
                                          handleOpenUpdate(comment)
                                        }
                                      >
                                        <PencilIcon className="w-5 h-5" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </ListItem>
                          </div>
                        ))}
                      </>
                    )}
                  </List>
                </div>

                <div className="lg:col-span-5 hidden md:hidden lg:block">
                  <div className="p-3 h-full flex justify-center items-center">
                    <img
                      className="w-[80%]"
                      src={Images.add_comment}
                      alt="pic"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img className="w-48" src={Images.empty_1} alt="pic" />
              <p className="mb-3">{t("no_comments")}</p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <img className="w-48" src={Images.empty_1} alt="pic" />
          <p className="mb-3">{t("comment_not_login")}</p>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        open={openDelete}
        handleOpen={handleOpenDelete}
        onConfirm={handleDeleteComment}
      />

      {/* Update Comment Modal */}
      <UpdateCommentModal
        open={openUpdate}
        handleOpen={handleOpenUpdate}
        onConfirm={handleUpdateComment}
        selectedComment={selectedComment}
      />
    </div>
  );
};

export default CommentsTab;
