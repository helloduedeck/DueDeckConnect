import React from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Button from '@components/atoms/button/Button';
import {fontsize, colors} from '../../../themev1/index';
import {clearUser} from '@store/slices/userSlice';

import ProfileContainer from '@components/templates/ProfileContainer';
import {useAppDispatch} from '@hooks/redux_hooks';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@routes';
import {Logo} from '@components/atoms/Logo';
import local from '@store/local';
import {reduxStorage} from '@store/storage';
const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    Alert.alert(
      'Logout',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            local.clearAll();
            dispatch(clearUser());
            reduxStorage.clearAll();
            navigation.navigate(ROUTES.LOGIN);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      <ProfileContainer>
        <View style={{marginHorizontal: moderateScale(24)}}>
          <Button
            label={'Logout'}
            onPress={() => onLogout()}
            containerStyle={{
              marginVertical: moderateScale(25),
              backgroundColor: colors.date,
              borderColor: colors.date,
              marginBottom: 5,
            }}
            labelStyle={{
              color: colors.primary,
              fontWeight: 'semibold',
              fontSize: fontsize.medium,
              padding: 10,
            }}
          />
        </View>

        <View>
          <Logo size={'medium'} />
        </View>
      </ProfileContainer>
    </ScrollView>
  );
};
export default ProfilePage;
