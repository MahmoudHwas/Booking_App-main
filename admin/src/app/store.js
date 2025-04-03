import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomRdeucer from "../features/room/roomSlice"
import bookingReducer from "../features/booking/bookingSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomRdeucer,
    booking: bookingReducer,
  },
});
