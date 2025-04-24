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
  profilePictures:'ABC',
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
    setProfilePictures(state, action) {
      state.profilePictures = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {setUserCredentials, updateToken, clearUser,setProfilePictures} = userSlice.actions;

export default userSlice.reducer;
