import CircleBadge from '@components/molecules/CircleBadgeMolecule';
import {DashboardHeaderPropsType} from '../../../../app/types/components';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {moderateScale} from 'react-native-size-matters';
import GlobalFilterHeader from './GlobalFilter/GlobalFilterHeader';
import {STORAGE_URL} from '@api/api-client';
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

  const isDuedeck = STORAGE_URL.includes("duedeck.com");
  const finalUrl = isDuedeck ? `${STORAGE_URL}public/storage/` : `${STORAGE_URL}storage/`;

  useEffect(() => {
    if (profilePic) {
      setProfilePics({
        uri: finalUrl.concat(profilePic),
      });
    }
  }, [profilePic]);

  return (
    <View style={styles.container}>
      <View style={styles.organizationtitle}>
        <CircleBadge
          userName={getHeaderText(dashboardState.activeClient?.name ??  clientName,20) }
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
