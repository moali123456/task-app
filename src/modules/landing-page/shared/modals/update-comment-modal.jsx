import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const UpdateCommentModal = ({
  open,
  handleOpen,
  onConfirm,
  selectedComment,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // update comment
  const onSubmit = async (data) => {
    await onConfirm(data);
  };

  return (
    <Dialog
      open={open}
      size="sm"
      handler={handleOpen}
      dismiss={{ outsidePress: false }}
      className="delete_modal"
      overlayProps={{ className: "dialog-backdrop" }}
    >
      <DialogHeader className="flex justify-between">
        <div className="">{t("update_comment")}</div>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          className="cursor-pointer"
          onClick={() => {
            handleOpen();
            reset();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>

      {/* body */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <DialogBody className="text-center font-medium text-lg">
          <Textarea
            id="comment"
            name="comment"
            placeholder={t("email_placeholder")}
            autoComplete="email"
            defaultValue={selectedComment?.comment}
            className="!border !border-[#E5E5E5] bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
            labelProps={{
              className: "hidden",
            }}
            {...register("comment", {
              required: t("comment_required"),
            })}
          />
          {errors.comment && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[300] text-start">
              {errors.comment.message}
            </p>
          )}
        </DialogBody>

        {/* footer */}
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleOpen();
              reset();
            }}
            className="cursor-pointer text-sm bg-[#ffeaeb]"
          >
            <span>{t("cancle")}</span>
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            className="cursor-pointer bg-[#3252DF] text-sm font-medium flex gap-1.5"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                {t("update")} <Spinner className="h-5 w-5" color="white" />
              </>
            ) : (
              <>{t("update")}</>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default UpdateCommentModal;
