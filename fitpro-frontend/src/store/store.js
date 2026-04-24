import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
import dietReducer from './slices/dietSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    diet: dietReducer,
  },
});

export default store;