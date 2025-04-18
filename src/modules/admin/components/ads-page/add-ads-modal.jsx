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
  Select,
  Option,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ADS_ADMIN_URLS } from "../../../../constants/ADMIN_END_POINTS";
import { toast } from "react-toastify";
import Images from "../../../../assets/Images/Images";
import RoomsSelect from "../../shared/rooms-select/rooms-select";

const AddAdsModal = ({ open, handleOpen, reloadAds }) => {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage?.getItem("infooooo"))?.token;

  const {
    register,
    control,
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
            ADS_ADMIN_URLS.addAds,
          data,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(
          response?.data?.message || t("ads_deleted_successfuly")
        );
        reset();
        handleOpen();
        reloadAds();
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
      id="addAds"
      open={open}
      size="md"
      handler={handleOpen}
      dismiss={{ outsidePress: false }}
      className="details_modal"
      overlayProps={{ className: "dialog-backdrop" }}
    >
      <DialogHeader className="justify-between">
        {t("add_new_ad")}
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
          {/* Room name */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-12 mt-4">
              <label htmlFor="room">{t("room_number")}</label>

              <RoomsSelect control={control} errors={errors} t={t} />
            </div>
          </div>
          {/*  */}

          {/* room discount */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-12 mt-4">
              <label htmlFor="discount">{t("discount")}</label>
              <div className="mt-2">
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  inputMode="numeric"
                  placeholder={t("discount")}
                  className="!border !border-transparent bg-[#f5f6f8] text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("discount", {
                    required: t("discount_required"),
                  })}
                />
                {errors.discount && (
                  <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                    {errors.discount.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/*  */}

          {/* room status */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-12 mt-4">
              <label htmlFor="isActive">{t("active")}</label>
              <div className="mt-2 status-select">
                <Controller
                  control={control}
                  name="isActive"
                  rules={{
                    validate: (value) =>
                      value === true || value === false || t("status_required"),
                  }}
                  render={({ field }) => (
                    <Select
                      id="isActive"
                      size="lg"
                      value={
                        field.value === true
                          ? "active"
                          : field.value === false
                          ? "not_active"
                          : ""
                      }
                      onChange={(val) => {
                        const boolVal = val === "active";
                        field.onChange(boolVal);
                      }}
                      className="!border !border-transparent bg-[#f5f6f8] text-gray-900 placeholder:text-gray-500 focus:!border-gray-900"
                      labelProps={{ className: "hidden" }}
                    >
                      <Option value="active">{t("active")}</Option>
                      <Option value="not_active">{t("not_active")}</Option>
                    </Select>
                  )}
                />
                {errors.isActive && (
                  <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                    {errors.isActive.message}
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

export default AddAdsModal;
