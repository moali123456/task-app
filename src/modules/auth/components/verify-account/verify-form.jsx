import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Spinner } from "@material-tailwind/react";
import OtpInput from "react-otp-input";
import { handelVerifySubmit } from "../../../../utils/auth-utils/auth-utils";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const VerifyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   try {
  //     const response = await axios.put(USERS_GUEST_URLS.verifyAccount, data);
  //     navigate("/dashboard");
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
    handelVerifySubmit(formData, navigate, t);
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
            {/* Otp Field */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-12 mt-4">
                <label>{t("otp_label")}</label>
                <div className="mt-2">
                  <Controller
                    name="code"
                    control={control}
                    rules={{
                      required: t("code_required"),
                      validate: (value) =>
                        value.length === 4 || t("otp_length_required"),
                    }}
                    render={({ field }) => (
                      <OtpInput
                        value={code}
                        onChange={(value) => {
                          setCode(value);
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
                  {errors.code && (
                    <p className="mt-1 text-[#ff3728] text-[14px] font-[300]">
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
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
                {t("verify")} <Spinner className="h-6 w-6" color="white" />
              </>
            ) : (
              <>{t("verify")}</>
            )}
          </Button>
        </div>
        {/*  */}

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

export default VerifyForm;
