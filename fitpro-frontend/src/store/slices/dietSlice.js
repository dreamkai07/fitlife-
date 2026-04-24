import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fitproApi from '../../api/fitproApi';

export const fetchTodayMeals = createAsyncThunk(
  'diet/fetchToday',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fitproApi.get(
        '/diet/meals/today'
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addMeal = createAsyncThunk(
  'diet/addMeal',
  async (mealData, { rejectWithValue }) => {
    try {
      const response = await fitproApi.post(
        '/diet/meals', mealData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteMeal = createAsyncThunk(
  'diet/deleteMeal',
  async (id, { rejectWithValue }) => {
    try {
      await fitproApi.delete(`/diet/meals/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    meals: [],
    nutrition: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayMeals.fulfilled, (state, action) => {
        state.meals = action.payload;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.meals.push(action.payload);
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.meals = state.meals.filter(
          m => m.id !== action.payload
        );
      });
  },
});

export default dietSlice.reducer;