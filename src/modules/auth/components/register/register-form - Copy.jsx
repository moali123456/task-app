import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Images from "../../../../assets/Images/Images";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";
import CountryDropdown from "../../../Shared/country-dropdown/country-dropdown";
import { useDropzone } from "react-dropzone";
import Lottie from "lottie-react";
import uploadIcon from "../../../../assets/images/json/upload.json";
import FileUpload from "../../../shared/upload-file/upload-file";

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileError, setFileError] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
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
    formData.append("role", "admin");

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
      navigate("/auth/login");
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

  // Function to handle the dropped files
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL
    setFileError(false); // Clear error on file drop
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Cleanup the preview URL when the component is unmounted or when file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Function to remove the uploaded file
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setFileError(false); // Clear error on file removal
  };

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setFileError(t("file_required"));
    } else {
      setFileError("");
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const validateFile = () => {
    if (uploadedFiles.length === 0) {
      setFileError(true);
    }
  };

  return (
    <div id="auth_form_bx">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {/* Name Field */}
        <div>
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
        <div className="mt-4">
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

        {/* Phone Field */}
        <div className="grid grid-cols-12 gap-4">
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
        </div>

        {/* Password Field */}
        <div>
          <div className="mt-4">
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
          </div>

          {errors.password && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <div className="mt-4">
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
                type={passwordShown ? "text" : "password"}
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
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* upload Field */}
        <div className="">
          <FileUpload
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            fileError={fileError} // Passing error state to FileUpload
            setFileError={setFileError} // Passing setter to FileUpload (if needed)
          />

          {/* Display the error message */}
          {fileError && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[500]">
              {t("file_required")}
            </p>
          )}
        </div>
        <div className="mt-6 mb-8">
          <div
            {...getRootProps()}
            style={{
              border: `2px dashed ${fileError ? "red" : "#adbcff"}`,
              padding: "0 20px 20px",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "16px",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <>
                <p>{t("drop_file_here")}</p>
              </>
            ) : (
              <div className="flex flex-col gap-[0px] items-center justify-center">
                <div className="w-[150px]">
                  <Lottie animationData={uploadIcon} loop={true} />
                </div>

                <p className="upload_input_text">
                  {uploadedFile
                    ? uploadedFile.name
                    : t("drag_drop_or_click_upload")}
                </p>
              </div>
            )}
          </div>
          {uploadedFile && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {previewUrl && (
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "#f8fafb",
                    border: "1px solid #dfdfdf",
                    padding: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="flex gap-[10px] items-center text-start">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      width={60}
                      height={60}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "8px",
                      }}
                    />
                    <div>
                      {uploadedFile.name.length > 20
                        ? `${uploadedFile.name.substring(0, 20)}...`
                        : uploadedFile.name}
                    </div>
                  </div>
                  <div
                    onClick={handleRemoveFile}
                    aria-label="remove file"
                    className="cursor-pointer"
                  >
                    <img src={Images.deleteIcon} alt="pic" />
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Show file error if no file is uploaded */}
          {fileError && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[500]">
              {t("file_required")}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-6">
          <Button
            type="submit"
            className="form_btn w-full h-[56px] flex items-center justify-center gap-3"
            disabled={!isValid || isSubmitting || !uploadedFile}
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
