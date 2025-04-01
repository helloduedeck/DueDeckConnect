import React, {useState, useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CircleImage from '../../atoms/Circleimage/CircleImage';
import {moderateScale} from 'react-native-size-matters';

import {colors} from '../../../themev1';
import {CircleBadgePropsType} from '@types/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  requestCameraPermission,
  requestMediaPermission,
} from '@utils/permissionsUtils';
import {RESULTS} from 'react-native-permissions';
import Svg, {Circle, Path} from 'react-native-svg';
import fontsize from '../../../themev1/fontstyle';
import {useUpdateUserProfileMutation} from '@api/profileApi';
import {STORAGE_URL} from '@api/api-client';
import {toast} from '@utils';
import {useAppDispatch} from '@hooks/redux_hooks';
import {setUserCredentials} from '@store/slices/userSlice';

const CircleProfile = (props: CircleBadgePropsType) => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  const [profilePic, setProfilePic] = useState({uri: ''});
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const dispatch = useAppDispatch();

  const isDuedeck = STORAGE_URL.includes("duedeck.com");
  const finalUrl = isDuedeck ? `${STORAGE_URL}public/storage/` : `${STORAGE_URL}storage/`;

  useEffect(() => {
    if (props?.profilePic) {
        setProfilePic({
          uri: finalUrl+props?.profilePic,
        });
    }
  }, [props.profilePic]);
  
  console.log("finalUrl Hereee: "+(finalUrl+props?.profilePic));
  
  const showActionSheet = () => {
    setIsActionSheetVisible(true);
  };

  const hideActionSheet = () => {
    setIsActionSheetVisible(false);
  };

  const handleCameraPress = () => {
    // Implement logic for handling camera press
    hideActionSheet();
  };

  const handleGalleryPress = () => {
    // Implement logic for handling gallery press
    hideActionSheet();
  };

  const options = {
    mediaType: 'photo', // Specify media type: 'photo' or 'video'
    quality: 1, // Image quality: 0 to 1
    maxWidth: 500, // Maximum width of the image
    maxHeight: 500, // Maximum height of the image
    includeBase64: false, // Include the image as base64 string
    saveToPhotos: true, // Save the image to the device's photo library
  };
  const onGalleryPress = async () => {
    await requestMediaPermission()
      .then(async permissionStatus => {
        if (permissionStatus === RESULTS.GRANTED) {
          await launchImageLibrary(options, response => {
            if (response.errorCode) {
              console.log('GOTERROR', response?.errorCode);
            } else {
              console.log('RESPONSE', response);
              updateProfile(response);
            }
          });
        }
      })
      .catch(error => {
        console.error(
          'Error occurred while selecting image from gallery:',
          error,
        );
      });
  };

  const onButtonPress = React.useCallback(type => {
    if (type === 'capture') {
      onCameraPress();
    } else {
      onGalleryPress();
    }
  }, []);

  const onCameraPress = async () => {
    try {
      await requestCameraPermission().then(async permissionStatus => {
        if (permissionStatus === RESULTS.GRANTED) {
          await launchCamera(options, response => {
            if (response.errorCode) {
              console.log('ERROR', response.errorCode);
            } else {
              updateProfile(response);
            }
          });
        }
      });
    } catch (error) {
      console.error('Error occurred while capturing image from camera:', error);
    }
  };
  const updateProfile = async (data: any) => {
    if (data.didCancel) {
      return;
    }

    if (data.errorCode) {
      //   toast.failure(CAMERA_ERRORS[data.errorCode]);
    } else {
      let formdata = new FormData();
      const profileData = data?.assets[0];
      const reqData = {
        name: profileData?.fileName,
        type: profileData?.type,
        uri:
          Platform.OS === 'android'
            ? profileData?.uri
            : profileData?.uri.replace('file://', ''),
      };
      formdata.append('profile_photo_path', reqData);
      formdata.append('client_id', props?.clientId);
      await updateUserProfile(formdata)
        .unwrap()
        .then(data => {
          // console.log('updateUserProfile-', data.data);
          if (data?.success) {
            const photo_url = finalUrl?.concat(
              data.data.data.profile_photo_path,
            );
            setProfilePic({uri: photo_url});
            dispatch(setUserCredentials(data?.data));
            toast.success(data?.message);
          }
        })
        .catch(e => {
          console.log('UPLOAD ERROR', e);
        });
    }
    hideActionSheet();
  };
  
  const UploadIcon = () => {
    return (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Circle cx={9} cy={9} r={8.5} fill="white" stroke="#E4E4E4" />
        <Path
          d="M5.83398 8.50033V12.167C5.83398 12.4101 5.93056 12.6433 6.10247 12.8152C6.27438 12.9871 6.50754 13.0837 6.75065 13.0837H12.2507C12.4938 13.0837 12.7269 12.9871 12.8988 12.8152C13.0707 12.6433 13.1673 12.4101 13.1673 12.167V8.50033M11.334 5.75033L9.50065 3.91699M9.50065 3.91699L7.66732 5.75033M9.50065 3.91699V9.87533"
          stroke="#6D6C68"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CircleImage
          size={'medium'}
          IsOutlined={false}
          title={props.userName}
          color={colors.white}
          align={'center'}
          onPress={() => {
            props.onPronProfileIconPress();
          }}
          backgroundColor={colors.primary}
          source={profilePic}
        />
        <View style={styles.badge}>
          <TouchableOpacity onPress={showActionSheet}>
            {/* <MaterialCommunityIcons
              name={'upload'}
              size={20}
              color={colors.primary}
            /> */}
            <UploadIcon />
            {/* <SvgComponent/> */}
            {/* <CombinedSvg /> */}
          </TouchableOpacity>
        </View>
      </View>
      {/* You can add other components here */}

      <ActionSheet
        onClose={hideActionSheet}
        isVisible={isActionSheetVisible}
        // You can adjust the position and styles of the ActionSheet as per your need
      >
        <View style={styles.selectorPopupContainer}>
          <View style={styles.titleConatiner}>
            <Text style={styles.title}>Profile Photo</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.iconTextContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => onButtonPress('capture')}>
                <MaterialIcons
                  name="camera-alt"
                  size={32}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Camera</Text>
            </View>
            <View style={styles.iconTextContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => onButtonPress('gallery')}>
                <MaterialIcons
                  name="photo-library"
                  size={32}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Gallery</Text>
            </View>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default CircleProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    // marginRight: moderateScale(10), // Adjust the margin as per your need
  },
  badge: {
    position: 'absolute',
    bottom: moderateScale(5),
    right: moderateScale(0),
  },
  actionSheetContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  actionSheetItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  titleConatiner: {
    paddingBottom: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(5),
    // alignItems: 'center'
  },
  title: {
    // fontSize: 16,
    fontSize: fontsize.large,
    color: colors.black,
  },
  iconTextContainer: {
    marginEnd: moderateScale(30, 0.25),
    alignItems: 'center',
    // justifyContent: 'center'
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: moderateScale(60, 0.25),
    height: moderateScale(60, 0.25),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 35,
    height: moderateScale(70, 0.25),
    width: moderateScale(70, 0.25),
    borderWidth: 1,
    // backgroundColor: colors.grayLight,
    marginBottom: moderateScale(10, 0.25),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
  },
  iconLabel: {
    color: colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: Platform.OS ===  20,
    paddingHorizontal: moderateScale(15, 0.25),
    marginTop: moderateScale(20, 0.25),
    marginBottom: Platform.OS === 'android' ? 0 : moderateScale(20, 0.25),
  },
  profilePhoto: {
    // fontSize: 20,
    fontSize: fontsize.xlarge,
  },
  selectorPopupContainer: {
    paddingBottom:
      Platform.OS === 'android'
        ? moderateScale(10, 0.25)
        : moderateScale(50, 0.25),
    paddingTop: moderateScale(20, 0.25),
  },
});
