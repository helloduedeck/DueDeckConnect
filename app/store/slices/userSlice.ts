import {createSlice} from '@reduxjs/toolkit';
import { Subheader } from 'react-native-paper/lib/typescript/components/List/List';

const initialState = {
  isLoading: false,
  user: null,
  token: null, 
  isAuth: false,
  isLoginFailed: false,
  isProfileLoading: true,
  isNotificationStatus: false,
  isTasklistOpen: [],
  profilePictures:'',
  SubheaderName:''
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
    setSubheaderName(state, action) {
      state.SubheaderName = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {setUserCredentials, updateToken, clearUser,setProfilePictures,setSubheaderName} = userSlice.actions;

export default userSlice.reducer;
