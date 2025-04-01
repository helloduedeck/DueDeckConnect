import {StyleSheet} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthorizedContainer, UnAuthorizedContainer} from '../stack/Stack';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
// import {actions, local} from '../../store';
// import RNBootSplash from 'react-native-bootsplash';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import local from '@store/local';
import {reduxStorage} from '@store/storage';
import {clearUser, setUserCredentials} from '@store/slices/userSlice';
import {useAppDispatch} from '@hooks/redux_hooks';

//main screen from container
const UNAUTHORIZED = 'UNAUTHORIZED';
const AUTHORIZED = 'AUTHORIZED';

const STACKS = {
  UNAUTHORIZED: UnAuthorizedContainer,
  AUTHORIZED: AuthorizedContainer,
};

const Main = () => {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    continueSession();
  }, []);

  const continueSession = async () => {
    const isAuthExist = await local.fetch(local.keys.AUTH);
    if (isAuthExist) {
      const userDetails = await reduxStorage.getItem('USERDETAILS');
      if (isAuthExist && userDetails) {
        dispatch(setUserCredentials(JSON.parse(userDetails)));
      }
    } else {
      local.clearAll();
      dispatch(clearUser());
      reduxStorage.clearAll();
    }
    SplashScreen.hide();
  };

  return (
    <NavigationContainer>
      {/* <Mainlogo/> */}

      <BottomSheetModalProvider>
        {React.createElement(STACKS[isAuth ? AUTHORIZED : UNAUTHORIZED])}
        {/* <Mainlogo/> */}
        {/* <NoInternetModal/> */}
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
