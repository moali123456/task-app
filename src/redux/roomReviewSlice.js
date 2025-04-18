import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomReviewData: null,
};

export const roomReviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setRoomReviewData: (state, action) => {
      state.roomReviewData = action.payload;
    },
  },
});

export const { setRoomReviewData } = roomReviewSlice.actions;

export default roomReviewSlice.reducer;
