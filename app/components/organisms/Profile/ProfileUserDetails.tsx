import React from 'react';
import {View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CircleProfile from '@components/molecules/Profile/CircleProfile';
import ProfileInput from '@components/molecules/Profile/ProfileInput';
import ProfileInputContact from '@components/molecules/Profile/ProfileInputContact';
import ProfileInputEmail from '@components/molecules/Profile/ProfileInputEmail';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@hooks/redux_hooks';

const ProfileUserDetails = () => {
  const naviagtion = useNavigation();

  const userProfileData = useAppSelector(state => state?.user?.user);
  const dashboardState = useAppSelector(state => state?.dashboard);

  return (
    <>
      <View style={{marginHorizontal: moderateScale(24)}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(10),
          }}>
          <CircleProfile
            userName={userProfileData?.client_name}
            profilePic={userProfileData?.data?.profile_photo_path ?? undefined}
            clientId={dashboardState?.activeClient?.id}
          />
        </View>
        <View style={{marginTop: moderateScale(22)}}>
          <ProfileInput userName={userProfileData?.username} />
        </View>
        <View style={{marginTop: moderateScale(3)}}>
          <ProfileInputContact
            contactNumber={userProfileData?.contact_no.toString()}
          />
        </View>
        <View
          style={{marginTop: moderateScale(3), marginBottom: moderateScale(3)}}>
          <ProfileInputEmail email={userProfileData?.data?.email} />
        </View>
      </View>
    </>
  );
};
export default ProfileUserDetails;
