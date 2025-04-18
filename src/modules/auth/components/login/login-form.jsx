import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Images from "../../../../assets/Images/Images";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";
import { login as loginAction } from "../../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(USERS_GUEST_URLS.login, data);
      const userInfo = response?.data?.data?.user;

      // Dispatch action to store user data in Redux
      dispatch(loginAction(response?.data?.data));

      // Extract the user role from userInfo
      const userRole = userInfo?.role;

      // Navigate based on role
      if (userRole === "admin") {
        navigate("/dashboard");
      } else if (userRole === "user") {
        navigate("/");
      }
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
        <div>
          <label htmlFor="email">{t("email_label")}</label>
          <div className="mt-2 relative">
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

        {/* Password Field */}
        <div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-[#fff]"
            >
              {t("password")}
            </label>
          </div>
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
                  passwordShown ? Images.eye_open_icon : Images.eye_closed_icon
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

        <div className="forgot_link flex justify-end mb-[50px] mt-[10px]">
          <Link
            to="/auth/forgot-pass"
            className="forget_link text-[13px] text-[#4D4D4D]"
          >
            {t("forgot_password")}
          </Link>
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
                {t("login")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("login")}</>
            )}
          </Button>
        </div>
        {/*  */}

        {/* register */}
        <div className="text-[#364153] mt-4 text-sm flex gap-1.5 justify-center">
          {t("dont_have_account")}
          <Link to="/register" className="flex gap-0.5 items-center">
            {t("sign_up")} <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
        {/*  */}
      </form>
    </div>
  );
};

export default LoginForm;
