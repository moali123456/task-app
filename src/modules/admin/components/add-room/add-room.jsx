import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import UploadFile from "../../../shared/upload-file/upload-file";
import {
  ROOMS_ADMIN_URLS,
  BASE_HEADERS,
} from "../../../../constants/ADMIN_END_POINTS";
import FacilitiesSelect from "../../shared/facilities-select/facilities-select";
import "./add-room.scss";

const AddRoom = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [maxLengthError, setMaxLengthError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);
    data.facilities.forEach((facility) => {
      formData.append("facilities[]", facility);
    });
    // Append each file from uploadedFiles
    uploadedFiles.forEach((file) => {
      formData.append("imgs", file); // or formData.append("imgs[]", file); if backend expects array
    });
    //formData.append("imgs", uploadedFile); // Add the uploaded file

    return formData;
  };

  const onSubmit = async (data) => {
    const roomData = appendToFormData(data);
    console.log(data);
    try {
      const response = await axios.post(
        ROOMS_ADMIN_URLS.addRoom,
        roomData,
        BASE_HEADERS
      );
      toast.success(response?.data?.message || t("room_added_successfully"));

      reset(); // Reset the form fields
      setUploadedFile(null); // Reset the uploaded file
      setUploadedFiles([]); // Clear the uploaded files array
      setFileError(false); // Clear file error state if any
      setMaxLengthError(false); // Clear max length error if any
      // Optionally, reset preview URL here if needed
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Cleanup the preview URL
      }
      navigate("/dashboard/admin-rooms");

      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.message || t("some_thing_wrong"));
    }
  };

  // Cleanup the preview URL when the component is unmounted or when file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div id="add_room_form">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Room number */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-12 mt-4">
            <label htmlFor="phoneNumber">{t("room_number")}</label>
            <div className="mt-2">
              <Input
                id="roomNumber"
                name="roomNumber"
                type="number"
                inputMode="numeric"
                placeholder={t("room_number")}
                autoComplete="room-number"
                className="!border !border-transparent bg-[#f5f6f8] text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "hidden",
                }}
                {...register("roomNumber", {
                  required: t("room_num_required"),
                })}
              />
              {errors.roomNumber && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.roomNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
        <div className="grid grid-cols-12 gap-4">
          {/* Room price */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label htmlFor="phoneNumber">{t("price")}</label>
            <div className="mt-2">
              <Input
                id="price"
                name="price"
                type="number"
                inputMode="numeric"
                placeholder={t("price")}
                autoComplete="room-number"
                className="!border !border-transparent bg-[#f5f6f8] text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "hidden",
                }}
                {...register("price", {
                  required: t("price_required"),
                })}
              />
              {errors.price && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Room Capacity */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label htmlFor="phoneNumber">{t("capacity")}</label>
            <div className="mt-2">
              <Input
                id="capacity"
                name="capacity"
                type="number"
                inputMode="numeric"
                placeholder={t("capacity")}
                autoComplete="room-number"
                className="!border !border-transparent bg-[#f5f6f8] text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "hidden",
                }}
                {...register("capacity", {
                  required: t("capacity_required"),
                })}
              />
              {errors.capacity && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
        <div className="grid grid-cols-12 gap-4">
          {/* Room discount */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label htmlFor="phoneNumber">{t("discount")}</label>
            <div className="mt-2">
              <Input
                id="discount"
                name="discount"
                type="number"
                inputMode="numeric"
                placeholder={t("discount")}
                autoComplete="room-number"
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

          {/* Room facilities */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label htmlFor="phoneNumber">{t("facilities")}</label>

            <FacilitiesSelect control={control} errors={errors} t={t} />
          </div>
        </div>

        {/*  */}

        {/* upload Field */}
        <div className="mt-6 mb-8">
          <UploadFile
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            fileError={fileError}
            setFileError={setFileError}
            setUploadedFile={setUploadedFile}
            maxLength={5}
            maxLengthError={maxLengthError}
            setMaxLengthError={setMaxLengthError}
          />

          {/* Display error messages */}
          {fileError && !maxLengthError && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[500]">
              {t("upload_required")}
            </p>
          )}
          {maxLengthError && !fileError && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[500]">
              {t(`max_files_error`, { maxLength: 5 })}
            </p>
          )}
        </div>

        {/*  */}

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-6">
          <Button
            type="submit"
            className="form_btn w-full h-[56px] flex items-center justify-center gap-3"
            disabled={!isValid || isSubmitting || !uploadedFile || fileError}
          >
            {isSubmitting ? (
              <>
                {/* {t("login")} <img src={Images.loader_btn} className="w-[30px]" alt="pic" /> */}
                {t("add_room")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("add_room")}</>
            )}
          </Button>
        </div>
        {/*  */}
      </form>
    </div>
  );
};

export default AddRoom;
