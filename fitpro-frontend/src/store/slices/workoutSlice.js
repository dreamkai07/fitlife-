import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fitproApi from '../../api/fitproApi';

export const fetchWorkouts = createAsyncThunk(
  'workout/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fitproApi.get('/workouts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addWorkout = createAsyncThunk(
  'workout/add',
  async (workoutData, { rejectWithValue }) => {
    try {
      const response = await fitproApi.post(
        '/workouts', workoutData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  'workout/delete',
  async (id, { rejectWithValue }) => {
    try {
      await fitproApi.delete(`/workouts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.workouts.unshift(action.payload);
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(
          w => w.id !== action.payload
        );
      });
  },
});

export default workoutSlice.reducer;