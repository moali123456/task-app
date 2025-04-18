// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";

// const SocialLogin = () => {
//   //
//   const handleSuccess = async (response) => {
//     try {
//       const { credential } = response;

//       // Send Google token (credential) to your backend API
//       const res = await axios.post(USERS_GUEST_URLS.authGoogle, { accessToken: credential });

//       // Assuming API returns an accessToken
//       if (res.data.accessToken) {
//         localStorage.setItem("accessToken", res.data.accessToken);
//         alert("Login successful!");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   const handleFailure = () => {
//     console.error("Google login failed");
//   };

//   return (
//     <>
//       <GoogleOAuthProvider clientId="337570119666-ubbhnt72knadk8vqrl8jbkbkhhb4pd7g.apps.googleusercontent.com">
//         <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
//       </GoogleOAuthProvider>
//     </>
//   );
// };
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { USERS_GUEST_URLS } from "../../../../constants/END_POINTS";
import Images from "../../../../assets/Images/Images";

const SocialLoginButton = () => {
  const handleSuccess = async (tokenResponse) => {
    try {
      const { access_token } = tokenResponse;

      // Send Google token to backend API
      const res = await axios.post(USERS_GUEST_URLS.authGoogle, { accessToken: access_token });

      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        alert("Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => console.error("Google login failed"),
  });

  return (
    <button onClick={() => login()} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 cursor-pointer">
      <img src={Images.google_icon} alt="pic" />
    </button>
  );
};

const SocialLogin = () => {
  return (
    <GoogleOAuthProvider clientId="337570119666-ubbhnt72knadk8vqrl8jbkbkhhb4pd7g.apps.googleusercontent.com">
      <SocialLoginButton />
    </GoogleOAuthProvider>
  );
};

export default SocialLogin;

