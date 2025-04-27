import axios from "axios";
import { USERS_GUEST_URLS } from "../../constants/END_POINTS";
import { login as loginAction } from "../../redux/authSlice";
import { setUserProfileData } from "../../redux/profileSlice";
import { toast } from "react-toastify";
import swal from "sweetalert";

// login logic
export const handelLoginSubmit = async (data, dispatch, navigate, t) => {
  try {
    const response = await axios.post(USERS_GUEST_URLS.login, data);
    // Dispatch action to store user data in Redux
    dispatch(loginAction(response?.data));
    toast.success(response?.data?.message || t("welcome_back"));
    navigate("/");
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

// verify logic
export const handelVerifySubmit = async (data, navigate, t) => {
  console.log(data);
  try {
    const response = await axios.put(USERS_GUEST_URLS.verifyAccount, data);
    navigate("/dashboard");
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

// forget password logic
export const handelForgetSubmit = async (data, navigate, t) => {
  console.log(data);
  try {
    const response = await axios.post(USERS_GUEST_URLS.forgotPass, data);
    navigate("/reset-pass");
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

// reset password logic
export const handelResetSubmit = async (data, navigate, t) => {
  console.log(data);
  try {
    const response = await axios.post(USERS_GUEST_URLS.resetPass, data);
    navigate("/login");
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

// get user profile info
export const handelUserProfileInfo = async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("infooooo")).token;

    const response = await axios.get(USERS_GUEST_URLS?.userInfo(), {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    //console.log("response", response);
    //console.log("User data:", response.data);
    dispatch(setUserProfileData(response?.data));
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};
