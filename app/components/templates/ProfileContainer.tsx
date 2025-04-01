import React from 'react';

import CustomHeader from '@components/organisms/Headers/CustomHeader';
import LockIcon from '@components/atoms/Icon/icons/Lock';
import MailIcon from '@components/atoms/Icon/icons/Mail';
import ProfileUserDetails from '@components/organisms/Profile/ProfileUserDetails';
import ProfileUserSettings from '@components/organisms/Profile/ProfileUserSettings';
import TopHeader from '@components/molecules/TopHeader/TopHeader';
import {Logo} from '@components/atoms/Logo';
import {View} from 'react-native';
import {colors} from '@theme';

type IProps = {
  children: JSX.Element;
};

const ProfileContainer: React.FC<IProps> = ({children}) => {
  return (
    <>
      <View>
        <CustomHeader
          title="Your Profile"
          size={undefined}
          fontWeight={undefined}
          color={undefined}
        />
        {/* <TopHeader size={"small"} fontWeight={"bold"} title={"Your Profile"} color={colors.red}/> */}
        {/* <Logo size={'small'}/> */}
      </View>

      <ProfileUserDetails />
      <ProfileUserSettings />
      {children}
    </>
  );
};
export default ProfileContainer;
