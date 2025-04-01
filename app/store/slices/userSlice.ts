import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  user: null,
  token: null, 
  isAuth: false,
  isLoginFailed: false,
  isProfileLoading: true,
  isNotificationStatus: false,
  isTasklistOpen: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCredentials(state, action) {
      //SET_LOGGED_IN_USER
      state.user = {...action.payload};
      state.isAuth = true;
      state.isLoginFailed = false;
    },
    updateToken(state, action) {
      state.token = action.payload.token;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {setUserCredentials, updateToken, clearUser} = userSlice.actions;

export default userSlice.reducer;
