import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@hooks/redux_hooks';
import DashhboardHeader from '@components/organisms/Dashboard/DashboardHeader';
import {ROUTES} from '@routes';
import NotificationHandler from '@utils/NotificationHandler';

type IProps = {
  children: JSX.Element;
  onProfileIconPress?: () => void;
};

const ParentContainer: React.FC<IProps> = ({children, onProfileIconPress}) => {
  const navigation = useNavigation();

  const userProfileData = useAppSelector(state => state?.user.user);

  console.log(
    'userProfileData?.data?.profile_photo_path',
    userProfileData?.data?.profile_photo_path,
  );

  const onProfilePress = () => {
    navigation.navigate(ROUTES.PROFILE);
  };

  return (
    <View style={styles.container}>
      <DashhboardHeader
        userName={userProfileData?.username}
        profilePic={userProfileData?.data?.profile_photo_path ?? undefined}
        clientName={userProfileData?.name}
        consultantName={''}
        onGlobalPanelPress={function (): void {}}
        onProfileIconPress={() => onProfilePress()}
      />
      <NotificationHandler />
      {children}
    </View>
  );
};

export default ParentContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
