import CircleBadge from '@components/molecules/CircleBadgeMolecule';
import {DashboardHeaderPropsType} from '../../../../app/types/components';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {moderateScale} from 'react-native-size-matters';
import GlobalFilterHeader from './GlobalFilter/GlobalFilterHeader';
import {PROFILE_URL, STORAGE_URL} from '@api/api-client';
import { useAppSelector } from '@hooks/redux_hooks';
import { getHeaderText } from '../ServiceItem/ServiceItemCard';

const DashhboardHeader: React.FC<DashboardHeaderPropsType> = ({
  userName,
  profilePic,
  clientName,
  consultantName,
  onProfileIconPress,
  onGlobalPanelPress,
}) => {
  const [profilePics, setProfilePics] = useState({uri: ''});
  const dashboardState = useAppSelector(state => state?.dashboard);
  const usersState = useAppSelector(state => state?.user)
  const username = usersState?.user?.username;
  const userProfileData = useAppSelector(state => state?.user?.user);

  const profilePhoto = useAppSelector(state => state?.user.profilePictures)
  console.log(username,'usname');

  const isDuedeck = PROFILE_URL.includes("duedeck.com");
  const finalUrl = isDuedeck ? `${PROFILE_URL}public/storage/profile/` : `${PROFILE_URL}storage/profile/`;

  useEffect(() => {
    if (profilePic || profilePic != undefined) {
      setProfilePics({
        uri: finalUrl.concat(profilePic),
      });
    }else{
      setProfilePics('')
    }
  }, [profilePic]);

  return (
    <View style={styles.container}>
      <View style={styles.organizationtitle}>
        <CircleBadge
          userName={getHeaderText(username ??  clientName,20) }
          profilePic={profilePics ?? undefined} //require('../../assets/images/avtar.png')}
          onProfileIconPress={onProfileIconPress}
        />
      </View>
      <View style={styles.organizationtitle}>
        <GlobalFilterHeader
          clientName={clientName}
          consultantName={consultantName}
          onGlobalPanelPress={onGlobalPanelPress}
        />
      </View>
    </View>
  );
};
export default DashhboardHeader;
const styles = ScaledSheet.create({
  organizationtitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    paddingRight: 1,
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
  },
});
