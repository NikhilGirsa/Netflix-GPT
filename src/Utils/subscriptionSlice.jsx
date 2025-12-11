import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isPaid: false,
    plan: null, // 'basic', 'standard', 'premium'
    subscriptionDate: null,
  },
  reducers: {
    setSubscription: (state, action) => {
      state.isPaid =
        action.payload.isPaid !== undefined ? action.payload.isPaid : true;
      state.plan = action.payload.plan;
      state.subscriptionDate =
        action.payload.subscriptionDate || action.payload.date;
    },
    clearSubscription: (state) => {
      state.isPaid = false;
      state.plan = null;
      state.subscriptionDate = null;
    },
  },
});

export const { setSubscription, clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
