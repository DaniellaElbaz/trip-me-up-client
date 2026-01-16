import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: JSON.parse(sessionStorage.getItem("userData")) || null,
  isLoggedIn: !!sessionStorage.getItem("userData"),
  lastAction: 'none'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.lastAction = 'login';
    },
    logoutSuccess: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      state.lastAction = 'logout';
    },
    updateUserAction: (state, action) => {
      state.lastAction = action.payload;
    }
  },
});

export const { loginSuccess, logoutSuccess, updateUserAction } = userSlice.actions;
export default userSlice.reducer;