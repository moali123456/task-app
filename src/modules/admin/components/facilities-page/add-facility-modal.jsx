import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
  Spinner,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ROOMS_FACILITIES_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";
import { toast } from "react-toastify";
import Images from "../../../../assets/Images/Images";

const AddFacilityModal = ({ open, handleOpen, reloadFacilities }) => {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        ROOMS_FACILITIES_ADMIN_URLS.addFacility,
        data,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        response?.data?.message || t("facility_added_successfully")
      );
      reset();
      handleOpen();
      reloadFacilities();
    } catch (error) {
      toast.error(error.response?.data?.message || t("some_thing_wrong"));
    }
  };

  const handleClose = () => {
    reset();
    handleOpen();
  };

  return (
    <Dialog
      id="addFacility"
      open={open}
      size="md"
      handler={handleOpen}
      dismiss={{ outsidePress: false }}
      className="details_modal"
      overlayProps={{ className: "dialog-backdrop" }}
    >
      <DialogHeader className="justify-between">
        {t("add_facility")}
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleClose}
          className="cursor-pointer"
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
        <DialogBody className="pt-0">
          {/* facility name */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-12 mt-4">
              <label htmlFor="name">{t("facility_name")}</label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  placeholder={t("facility_name")}
                  className="!border !border-transparent bg-[#f5f6f8] text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("name", {
                    required: t("facility_name_required"),
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/*  */}
        </DialogBody>

        {/* footer */}
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outlined"
            onClick={handleClose}
            className="cursor-pointer text-sm"
          >
            <span>{t("cancle")}</span>
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            className="cursor-pointer bg-[#203FC7] text-sm font-medium flex gap-1.5"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                {t("add")} <Spinner className="h-5 w-5" color="white" />
              </>
            ) : (
              <>{t("add")}</>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default AddFacilityModal;
