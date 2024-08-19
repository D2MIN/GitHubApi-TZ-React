import { createSlice } from '@reduxjs/toolkit';

// Slice для данных всех репозиториев полученных из поиска
const reposInfoSlice = createSlice({
  name: 'reposInfo',
  initialState : [],
  reducers: {
    setInfo: (state, action) => {
      return action.payload;
    }
  }
});

// Экспортирую редуктор и действия
export const { setInfo } = reposInfoSlice.actions;
export default reposInfoSlice.reducer;
