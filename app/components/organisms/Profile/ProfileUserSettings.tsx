import React from 'react';
import {View} from 'react-native';
import {colors, fontsize} from '../../../themev1';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import ProfileField from '@components/molecules/Profile/ProfileField';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@routes';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileUserSettings = () => {
  const naviagtion = useNavigation();

  const onTermsPress = () => {
    naviagtion.navigate(ROUTES.TERMSANDCONDITIONS);
  };

  const onPrivacyPolicyPress = () => {
    naviagtion.navigate(ROUTES.PRIVACYPOLICY);
  };

  const onChangePassword = () => {
    naviagtion.navigate(ROUTES.RESETPASSWORD);
  };

  return (
    <View style={{marginTop: moderateScale(8), marginHorizontal: 24}}>
      <View style={{}}>
        <ProfileField
          title={'Change Password'}
          color={colors.GRey800}
          size={fontsize.medium}
          onPress={onChangePassword}
        />
      </View>
      <View style={{marginTop: moderateScale(8)}}>
        <ProfileField
          title={'Sounds & Notifications'}
          color={colors.GRey800}
          size={fontsize.medium}
        />
      </View>
      <TouchableOpacity
        onPress={onTermsPress}
        style={{marginTop: moderateScale(8)}}>
        <ProfileField
          title={'Terms & Conditions'}
          color={colors.GRey800}
          size={fontsize.medium}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPrivacyPolicyPress}
        style={{marginTop: moderateScale(8)}}>
        <ProfileField
          title={'Privacy Policy'}
          color={colors.GRey800}
          size={fontsize.medium}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileUserSettings;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: moderateScale(9),
  },
});
