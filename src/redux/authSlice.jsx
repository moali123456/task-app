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
      state.isLogged = false;
      localStorage.removeItem("infooooo");
      //navigate("/auth/login");
      window.location.href = "/login";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
