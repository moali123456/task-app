import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Images from "../../../../assets/Images/Images";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";
import CountryDropdown from "../../../Shared/country-dropdown/country-dropdown";
import UploadFile from "../../../shared/upload-file/upload-file";

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPassShown, setConfirmPassShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmPassVisiblity = () => {
    setConfirmPassShown(confirmPassShown ? false : true);
  };

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password"); // Watch password field

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("profileImage", uploadedFile); // Add the uploaded file

    return formData;
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (!uploadedFile) {
      setFileError(true);
      return;
    }

    const recipeData = appendToFormData(data);
    try {
      const response = await axios.post(USERS_GUEST_URLS.register, recipeData);
      navigate("/login");
      toast.success(response.data.message || t("register_successfuly"));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        swal({
          title: error.response?.data?.message || t("some_thing_wrong"),
          text: "error",
          icon: "error",
          button: "try again",
        });
        //toast.error(error.response?.data?.message || t("some_thing_wrong"));
      }
    }
  };

  // Cleanup the preview URL when the component is unmounted or when file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div id="auth_form_bx">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* upload Field */}
        <div className="mt-5 mb-3 flex justify-center items-center flex-col">
          <UploadFile
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            fileError={fileError}
            setFileError={setFileError}
            setUploadedFile={setUploadedFile}
            maxLength={1}
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
              {t("max_files_error", { maxLength: 3 })}
            </p>
          )}
        </div>

        {/*  */}
        <div className="grid grid-cols-12 gap-4">
          {/* Name Field */}
          <div className="col-span-12 lg:col-span-6 mt-2">
            <label htmlFor="email">{t("user_name_label")}</label>
            <div className="mt-2">
              <Input
                id="userName"
                name="userName"
                type="text"
                placeholder={t("email_placeholder")}
                autoComplete="email"
                className="!border !border-transparent bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                {...register("userName", {
                  required: t("userName_required"),
                })}
              />
              {errors.userName && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.userName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="col-span-12 lg:col-span-6 mt-2">
            <label htmlFor="email">{t("email_label")}</label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("email_placeholder")}
                autoComplete="email"
                className="!border !border-transparent bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                {...register("email", {
                  required: t("email_required"),
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: t("valid_mail_msg"),
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/*  */}
        <div className="grid grid-cols-12 gap-4">
          {/* Country Field */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label>{t("country")}</label>
            <div className="mt-2">
              <Controller
                name="country"
                control={control}
                rules={{ required: t("country_required") }}
                render={({ field }) => (
                  <CountryDropdown className="country_select" {...field} />
                )}
              />
              {errors.country && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label htmlFor="phoneNumber">{t("phone_number")}</label>
            <div className="mt-2">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                inputMode="numeric"
                placeholder={t("phone_placeholder")}
                autoComplete="phone-number"
                className="!border !border-transparent bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "hidden",
                }}
                {...register("phoneNumber", {
                  required: t("number_required"),
                })}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/*  */}
        <div className="grid grid-cols-12 gap-4">
          {/* Password Field */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-[#fff]"
            >
              {t("password")}
            </label>
            <div className="mt-2 relative">
              <Input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                autoComplete="new-password"
                placeholder="********"
                className="!border !border-transparent bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                {...register("password", {
                  required: t("password_required"),
                  minLength: {
                    value: 7,
                    message: t("valid_password_msg"),
                  },
                })}
              />
              <span
                className="absolute inset-y-0 end-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisiblity}
              >
                <img
                  className="w-[20px] eye_icon"
                  src={
                    passwordShown
                      ? Images.eye_open_icon
                      : Images.eye_closed_icon
                  }
                  alt="toggle password visibility"
                />
              </span>
            </div>

            {errors.password && (
              <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="col-span-12 lg:col-span-6 mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-[#fff]"
            >
              {t("confirm_password")}
            </label>
            <div className="mt-2 relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPassShown ? "text" : "password"}
                autoComplete="new-password"
                placeholder="********"
                className="!border !border-transparent bg-white text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                {...register("confirmPassword", {
                  required: t("confirm_password_required"),
                  validate: (value) =>
                    value === password || t("passwords_must_match"),
                  minLength: {
                    value: 7,
                    message: t("valid_password_msg"),
                  },
                })}
              />
              <span
                className="absolute inset-y-0 end-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPassVisiblity}
              >
                <img
                  className="w-[20px] eye_icon"
                  src={
                    confirmPassShown
                      ? Images.eye_open_icon
                      : Images.eye_closed_icon
                  }
                  alt="toggle password visibility"
                />
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

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
                {t("sign_up")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("sign_up")}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
