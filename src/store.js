import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: ''
};
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    }
  }
});
export const { setData } = dataSlice.actions;
const reducer = dataSlice.reducer;
const store = configureStore({
  reducer
});

export default store;
