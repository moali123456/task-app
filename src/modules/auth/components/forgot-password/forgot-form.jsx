import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { handelForgetSubmit } from "../../../../utils/auth-utils/auth-utils";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const ForgotForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   try {
  //     const response = await axios.post(USERS_GUEST_URLS.forgotPass, data);
  //     navigate("/auth/reset-pass");
  //     toast.success(response?.data?.message || t("welcome_back"));
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       swal({
  //         title: error.response?.data?.message || t("some_thing_wrong"),
  //         text: "error",
  //         icon: "error",
  //         button: "try again",
  //       });
  //       //toast.error(error.response?.data?.message || t("wrong_message"));
  //     }
  //   }
  // };

  const handleFormSubmit = (formData) => {
    handelForgetSubmit(formData, navigate, t);
  };

  return (
    <div id="auth_form_bx">
      <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
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
                {t("send_mail")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("send_mail")}</>
            )}
          </Button>
        </div>

        {/* login */}
        <div className="text-[#364153] mt-4 text-sm flex gap-1.5 justify-center">
          {t("already_have_account")}
          <Link to="/login" className="flex gap-0.5 items-center">
            {t("login")} <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
        {/*  */}
      </form>
    </div>
  );
};

export default ForgotForm;
