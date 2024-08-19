import { createSlice } from '@reduxjs/toolkit';

// Slice для данных о выбраном репозитории
const repoInfoSlice = createSlice({
  name: 'repoInfo',
  initialState : [],
  reducers: {
    setInfo: (state, action) => {
      return action.payload;
    }
  }
});

// Экспортирую редуктор и действия
export const { setInfo } = repoInfoSlice.actions;
export default repoInfoSlice.reducer;
