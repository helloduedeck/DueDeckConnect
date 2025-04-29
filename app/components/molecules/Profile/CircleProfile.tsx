import React, {useState, useEffect} from 'react';
import {Alert, Image, Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import CircleImage from '../../atoms/Circleimage/CircleImage';
import {moderateScale} from 'react-native-size-matters';

import {colors} from '../../../themev1';
import {CircleBadgePropsType} from '@types/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  requestCameraPermission,
  requestMediaPermission,
} from '@utils/permissionsUtils';
import {RESULTS} from 'react-native-permissions';
import Svg, {Circle, Path} from 'react-native-svg';
import fontsize from '../../../themev1/fontstyle';
import {useDeleteProfilePicMutation, useUpdateProfilePicMutation, useUpdateUserProfileMutation} from '@api/profileApi';
import {PROFILE_URL, STORAGE_URL} from '@api/api-client';
import {toast} from '@utils';
import {useAppDispatch, useAppSelector} from '@hooks/redux_hooks';
import {setProfilePictures, setUserCredentials} from '@store/slices/userSlice';
import ActionSheet from '@components/organisms/ActionSheet/ActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import ProfileActionSheet from '@components/atoms/actionSheet/ProfileActionsheet';
import { Label } from '@components/atoms/Label';

const CircleProfile = (props: CircleBadgePropsType) => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const userState = useAppSelector(state => state?.user);
  const [profilePicture, setProfilePicture] = useState(userState?.profilePhoto);
  const [profilePic, setProfilePic] = useState({uri: ''});
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [uploadProfilePic] = useUpdateProfilePicMutation();
  const [deleteProfilePic] = useDeleteProfilePicMutation();
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const userProfileData = useAppSelector(state => state);
const getprofilepic = userProfileData?.profilePictures
console.log(getprofilepic,'prpicpath');

  const isDuedeck = PROFILE_URL.includes("duedeck.com");
  const finalUrl = isDuedeck ? `${PROFILE_URL}public/storage/profile/` : `${PROFILE_URL}storage/profile/`;

  useEffect(() => {
    if (props?.profilePic && props?.profilePic != undefined) {
        setProfilePic({
          uri: finalUrl+props?.profilePic,
        });
    }else{
      setProfilePic('');
    }
  }, [props.profilePic]);
  
  console.log("finalUrl Hereee:"+JSON.stringify(profilePic));
  
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
    try {
      const permissionStatus = await requestMediaPermission();

      if (permissionStatus === RESULTS.GRANTED) {
        await launchImageLibrary(
          { mediaType: 'photo', includeBase64: false },
          async response => {
            if (response.errorCode) {
              console.error('Error selecting image:', response?.errorCode);
              toast.failure('Error selecting image.');
              return;
            }

            if (response.assets && response.assets.length > 0) {
              const selectedImage = response.assets[0];

              // Validate file size (e.g., limit to 2MB)
              if (selectedImage?.fileSize > 10000000) {
                toast.failure('File size should be less than 10 MB.');
                return;
              }

              // Validate file type (e.g., only allow JPEG/PNG)
              const allowedTypes = ['image/jpeg', 'image/png'];
              if (!allowedTypes.includes(selectedImage?.type)) {
                toast.failure('Only JPEG or PNG images are allowed.');
                return;
              }

              try {
                // Crop the selected image
                const croppedImage = await ImageCropPicker.openCropper({
                  path: selectedImage.uri,
                  width: 500,
                  height: 500,
                  cropping: true,
                  cropperCircleOverlay: false,
                });

                // Prepare the cropped image for upload
                const formData = new FormData();
                formData.append('profile_photo_path', {
                  uri: croppedImage.path,
                  name: 'profile_pic.jpg',
                  type: 'image/jpeg',
                });

                const uploadResponse = await uploadProfilePic(formData).unwrap();

                if (uploadResponse?.success) {
                  const photo_url = finalUrl?.concat(
                    uploadResponse.data.data.profile_photo_path,
                  );
                  console.log(photo_url,'photo_urlphoto_url');
                  
                  setProfilePic({uri: photo_url});
                  dispatch(setUserCredentials(uploadResponse?.data));
                  dispatch(setProfilePictures(uploadResponse?.data))
                  console.log(setProfilePictures(uploadResponse?.data) ,'dxtdtdtdt');

                  // toast.success(uploadResponse?.message+'profileee');
                   toast.success(uploadResponse.message);
                  //  console.log(uploadResponse.message,'promssgss');
                   
                } else {
                  toast.failure(uploadResponse.message);
                }
              } catch (error) {
                console.error('Error while cropping image:', error);
              }
            } else {
              console.log('No image selected.');
              toast.info('No image selected.');
            }
          }
        );
      } else {
        // toast.failure('Gallery permission is required to upload a profile picture.');
      }
    } catch (error) {
      console.error('Error occurred while selecting image from gallery:', error);
      toast.failure('Something went wrong while selecting the image.');
    }
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
      const permissionStatus = await requestCameraPermission();

      if (permissionStatus === RESULTS.GRANTED) {
        await launchCamera(
          { mediaType: 'photo', includeBase64: false },
          async response => {
            if (response.errorCode) {
              console.error('Error capturing image:', response?.errorCode);
              toast.failure('Error capturing image.');
              return;
            }

            if (response.assets && response.assets.length > 0) {
              const capturedImage = response.assets[0];

              // Validate file size (e.g., limit to 2MB)
              if (capturedImage?.fileSize > 10000000) {
                toast.failure('File size should be less than 10 MB.');
                return;
              }

              // Validate file type (e.g., only allow JPEG/PNG)
              const allowedTypes = ['image/jpeg', 'image/png'];
              if (!allowedTypes.includes(capturedImage?.type)) {
                toast.failure('Only JPEG or PNG images are allowed.');
                return;
              }

              try {
                // Crop the captured image
                const croppedImage = await ImageCropPicker.openCropper({
                  path: capturedImage.uri,
                  width: 500,
                  height: 500,
                  cropping: true,
                  cropperCircleOverlay: false,
                });

                // Prepare the cropped image for upload
                const formData = new FormData();
                formData.append('profile_photo_path', {
                  uri: croppedImage.path,
                  name: 'profile_pic.jpg',
                  type: 'image/jpeg',
                });
                const uploadResponse = await uploadProfilePic(formData).unwrap();
                if (uploadResponse?.success) {
                  const photo_url = finalUrl?.concat(
                    uploadResponse.data.data.profile_photo_path,
                  );
                  setProfilePic({uri: photo_url});
                  dispatch(setUserCredentials(uploadResponse?.data));
                  toast.success(uploadResponse?.message);
                } else {
                  toast.failure(uploadResponse.message);
                }
              } catch (error) {
                console.error('Error while cropping image:', error);
              }
            } else {

              toast.info('No image captured.');
            }
          }
        );
      } else {
        // toast.failure('Camera permission is required to capture and upload a profile picture.');
      }
    } catch (error) {
      console.error('Error occurred while capturing image from camera:', error);
      toast.failure('Something went wrong while capturing the image.');
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
            console.log(setUserCredentials(data?.data),'ppphoto');
            
            toast.success(data?.message);
          }
        })
        .catch(e => {
          console.log('UPLOAD ERROR', e);
        });
    }
    hideActionSheet();
  };
  console.log(profilePic,'circlprofi');


  const OnProfilepicDeletePress = () => { // Modified by Sahil Gaikwad for deleting profile pic on 21-1-25 .
    Alert.alert(
      'Delete Profile Picture',
      'Are you sure, You want to delete your profile picture?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const reqData = {}; // Add required data for deletion if needed
              const response = await deleteProfilePic(reqData).unwrap();
              console.log(response,'responseresponse')
              if (response?.success) {
                toast.success('Profile picture deleted successfully');
                // Clear profile picture from state and Redux store
                dispatch(setProfilePictures(''));
                setProfilePicture('');
                setProfilePic('');
                setIsActionSheetVisible(false);
              } else {
                toast.failure(response.message);
              }
            } catch (error) {
              console.error('Error in deleting profile picture:', error);
              toast.failure('Failed to delete profile picture.');
            }
          },
        },
      ],
      { cancelable: true }
    );
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

      <ProfileActionSheet
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
                  size={24}
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
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Gallery</Text>
            </View>
            <View style={styles.iconTextContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => { hideActionSheet(), setModalVisible(true) }}>
                <MaterialCommunityIcons
                  name="eye-circle"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>View</Text>
            </View>
            {/* <View style={styles.iconTextContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {OnProfilepicDeletePress()}}>
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>Delete</Text>
            </View> */}
          </View>
        </View>
      </ProfileActionSheet>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press
      >
        <View style={styles.modalContainer}>

          <View style={{ backgroundColor: 'black', width: '100%', height: 50, alignItems: 'center', position: 'absolute', top: 0, justifyContent: 'center', }}>

            <View style={{ flexDirection: 'row' }}>
              <View >
                <Pressable     // pressable used because touchableopacity is not working here 
                  onPress={() => setModalVisible(false)}
                   style={{width:50,height:50, position: 'absolute', left: moderateScale(-120), alignItems: 'center'}}
                >
                  <MaterialCommunityIcons
                    name={'arrow-left'}
                    color={colors.white}
                    size={28}
                    // style={{ position: 'absolute', left: moderateScale(-120), alignItems: 'center', }}
                  />
                </Pressable>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Label size={'medium'} fontWeight={'normal'} title={'Profile Photo'} color={'white'} />
              </View>
            </View>
          </View>

          {/* Enlarged Image */}
          <Image
            source={profilePic}
            style={styles.enlargedImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
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
    height: moderateScale(50, 0.25),
    width: moderateScale(50, 0.25),
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enlargedImage: {
    margin:moderateScale(5),
    width: moderateScale(350),
    height: moderateScale(350),
    borderRadius:moderateScale(230),
    borderWidth:1,
    borderColor:'white',
  },
});
