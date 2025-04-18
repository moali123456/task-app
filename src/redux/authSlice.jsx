import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: localStorage.getItem("infooooo")
    ? JSON.parse(localStorage.getItem("infooooo"))
    : null,
  isLogged: localStorage.getItem("infooooo") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;

      state.isLogged = true;
      localStorage.setItem("infooooo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      const userRole = state.userData?.user?.role;
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem("infooooo");
      if (userRole === "admin") {
        // navigate("/auth/login");
        window.location.href = "/auth/login";
        // window.location.reload();
      } else {
        // navigate("/home");
        window.location.href = "/home";
        // window.location.reload();
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
