import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import Images from "../../../../assets/Images/Images";
import { useForm } from "react-hook-form";

const DeleteModal = ({ open, handleOpen, onSubmit, confirmText }) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  
  return (
    <Dialog
      open={open}
      size="md"
      handler={handleOpen}
      //dismiss={{ outsidePress: false }}
      className="details_modal"
      overlayProps={{ className: "dialog-backdrop" }}
    >
      <DialogHeader></DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* body */}
        <DialogBody className="text-center font-medium text-lg">
          {confirmText}
          <div className="flex justify-center pt-5">
            <div className="bg-[#ffeaeb] py-6 px-6 rounded-full">
              <img className="w-[80px]" src={Images.trash_img} alt="pic" />
            </div>
          </div>
        </DialogBody>

        {/* footer */}
        <DialogFooter className="flex justify-center gap-2">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="cursor-pointer text-sm bg-[#ffeaeb]"
          >
            <span>{t("cancle")}</span>
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            className="cursor-pointer bg-red-700 text-sm font-medium flex gap-1.5"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                {t("delete")} <Spinner className="h-5 w-5" color="white" />
              </>
            ) : (
              <>{t("delete")}</>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default DeleteModal;
