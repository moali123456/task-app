import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Spinner } from "@material-tailwind/react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Images from "../../../../assets/Images/Images";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";

const ResetPassForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [seed, setSeed] = useState("");

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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(USERS_GUEST_URLS.resetPass, data);
      navigate("/auth/login");
      toast.success(response?.data?.message || t("welcome_back"));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        swal({
          title: error.response?.data?.message || t("some_thing_wrong"),
          text: "error",
          icon: "error",
          button: "try again",
        });
        //toast.error(error.response?.data?.message || t("wrong_message"));
      }
    }
  };

  return (
    <div id="auth_form_bx">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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

        {/* Otp Field */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-12 mt-4">
            <label>{t("otp_label")}</label>
            <div className="mt-2">
              <Controller
                name="seed"
                control={control}
                rules={{
                  required: t("otp_required"),
                  validate: (value) =>
                    value.length === 4 || t("otp_length_required"),
                }}
                render={({ field }) => (
                  <OtpInput
                    value={seed}
                    onChange={(value) => {
                      setSeed(value);
                      field.onChange(value); // Sync with react-hook-form
                    }}
                    numInputs={4}
                    separator={<span>-</span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="otp_input"
                        style={{
                          border: errors.seed
                            ? "1px solid red"
                            : "1px solid #f5f6f8",
                        }}
                      />
                    )}
                  />
                )}
              />
              {errors.seed && (
                <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                  {errors.seed.message}
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
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-6">
          <Button
            type="submit"
            className="form_btn w-full h-[56px] flex items-center justify-center gap-3"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                {/* {t("login")} <img src={Images.loader_btn} className="w-[30px]" alt="pic" /> */}
                {t("reset")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("reset")}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassForm;
