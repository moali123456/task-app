import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomCommentsData: null,
};

export const roomCommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setRoomCommentsData: (state, action) => {
      state.roomCommentsData = action.payload;
    },
  },
});

export const { setRoomCommentsData } = roomCommentsSlice.actions;

export default roomCommentsSlice.reducer;
