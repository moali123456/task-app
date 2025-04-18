import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loaderSlice from "./loaderSlice";
import profileReducer from "./profileSlice";
import favoritesReducer from "./favoritesSlice";
import roomCommentsReducer from "./roomCommentsSlice";
import roomReviewReducer from "./roomReviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mainLoader: loaderSlice,
    profile: profileReducer,
    favorites: favoritesReducer,
    comments: roomCommentsReducer,
    reviews: roomReviewReducer,
  },
});
