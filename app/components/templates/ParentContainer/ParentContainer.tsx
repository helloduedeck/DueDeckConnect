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
  const profilePhoto = useAppSelector(state => state?.user.profilePictures)
  const usersState = useAppSelector(state => state?.user)

  const profilePhotoPath = usersState?.user?.data?.profile_photo_path;

  const onProfilePress = () => {
    navigation.navigate(ROUTES.PROFILE);
  };
  console.log(userProfileData?.data?.profile_photo_path,'deleted');
  
  return (
    <View style={styles.container}>
      <DashhboardHeader
        userName={userProfileData?.username}
        profilePic={profilePhoto?? undefined}
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
