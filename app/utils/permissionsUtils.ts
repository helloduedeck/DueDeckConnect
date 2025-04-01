import {BASE_URL} from '@api/api-client';
import {store} from '@store/store';
import {Alert, Linking, Platform} from 'react-native';
import {CameraOptions} from 'react-native-image-picker';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'react-native-blob-util';
import {btoa, atob} from 'react-native-quick-base64';

const CAMERA_AND_STORAGE_PERMISSION = [
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
];

const STORAGE_PERMISSION = [
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
];

const checkCameraAndStoragePermission = async () => {
  const cameraPermission = await request(CAMERA_AND_STORAGE_PERMISSION[0]);
  let permissionStatus = cameraPermission;
  if (permissionStatus === RESULTS.DENIED) {
    permissionStatus = await request(CAMERA_AND_STORAGE_PERMISSION)
      .then(
        value => value[CAMERA_AND_STORAGE_PERMISSION[0]] === RESULTS.GRANTED,
      )
      .catch(e => console.log('PERMISSION_ERROR', e));
    if (permissionStatus === RESULTS.BLOCKED) {
      Alert.alert(
        '',
        'Please provide the required camera and external storage permission.',
        [
          {
            text: 'CANCEL',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => void Linking.openSettings()},
        ],
      );
    }
  }
  return permissionStatus;
};

const requestMediaPermission = async () => {
  let mediaPermissionStatus;
  let mediaSelectOnlyPermissionStatus;
  await requestMultiple(
    Platform.OS === 'ios'
      ? true //parseInt(Platform.Version) >= 17
        ? [
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ]
        : [PERMISSIONS.IOS.MEDIA_LIBRARY]
      : Platform.Version >= 33
      ? [
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
        ]
      : [
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ],
  ).then(async statuses => {
    mediaPermissionStatus =
      statuses[
        Platform.OS === 'ios'
          ? true // parseInt(Platform.Version) >= 17
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.IOS.MEDIA_LIBRARY
          : Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      ];
    mediaSelectOnlyPermissionStatus =
      statuses[
        Platform.OS === 'ios'
          ? true //parseInt(Platform.Version) >= 17
            ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
            : PERMISSIONS.IOS.MEDIA_LIBRARY
          : Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      ];
    if (
      mediaPermissionStatus === RESULTS.DENIED &&
      mediaSelectOnlyPermissionStatus === RESULTS.DENIED
    ) {
      Alert.alert('', 'Please provide the required camera permission.', [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('Ok')},
      ]);
    } else if (
      mediaPermissionStatus === RESULTS.BLOCKED &&
      mediaSelectOnlyPermissionStatus === RESULTS.BLOCKED
    ) {
      Alert.alert('', 'Please provide the required camera permission.', [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => void Linking.openSettings()},
      ]);
    }
  });
  let permissionStatus =
    mediaPermissionStatus === RESULTS.GRANTED ||
    mediaSelectOnlyPermissionStatus === RESULTS.GRANTED
      ? RESULTS.GRANTED
      : RESULTS.DENIED;
  console.log(
    Platform.Version,
    mediaPermissionStatus,
    mediaSelectOnlyPermissionStatus,
  );
  return permissionStatus;
};

const requestCameraPermission = async () => {
  let permissionStatus;
  await request(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  ).then(async status => {
    permissionStatus = status;
    if (status === RESULTS.DENIED) {
      permissionStatus = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      ).catch(e => console.log('PERMISSION_ERROR', e));
    } else if (status === RESULTS.BLOCKED) {
      Alert.alert('', 'Please provide the required camera permission.', [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => void Linking.openSettings()},
      ]);
    }
    console.log('PERMISSIONSTATUS', status);
  });
  return permissionStatus;
};

const checkStoragePermission = async () => {
  const storageWritePermission = await check(STORAGE_PERMISSION[0]);
  const storageReadPermission = await check(STORAGE_PERMISSION[1]);
  let permissionStatus: boolean | void =
    storageWritePermission && storageReadPermission;
  if (!permissionStatus) {
    permissionStatus = await requestMultiple(STORAGE_PERMISSION)
      .then(
        value =>
          value[STORAGE_PERMISSION[0]] === RESULTS.GRANTED &&
          value[STORAGE_PERMISSION[1]] === RESULTS.GRANTED,
      )
      .catch(e => console.log('PERMISSION_ERROR', e));
    if (!permissionStatus) {
      Alert.alert(
        '',
        'Please provide the required camera and external storage permission.',
        [
          {
            text: 'CANCEL',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => void Linking.openSettings()},
        ],
      );
    }
  }
  return permissionStatus;
};

const optionsConfig: CameraOptions = {
  mediaType: 'photo',
  // selectionLimit: 1,
  saveToPhotos: false,
  presentationStyle: 'fullScreen',
  includeBase64: true,
  maxHeight: 2000,
  maxWidth: 2000,
  quality: 1,
};

const getStringBeforeCharacter = (inputString, character = '<link') => {
  const index = inputString.indexOf(character);
  if (index !== -1) {
    console.log('INDEX', index);
    return inputString.substring(0, index);
  }
  return inputString;
};

const saveBase64AsPDF = base64String => {
  // Decode the Base64 string
  // const decodedData = RNFetchBlob.base64.decode(base64String);
  let base64StringsData = /,(.+)/.exec(base64String)[1];
  const base64 = btoa(base64StringsData);
  const decoded = atob(base64);
  const {dirs} = RNFetchBlob.fs;
  const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  let d = new Date();
  let dformat = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
  const configfb = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: `${dformat}.pdf`,
      path: `${dirs.DownloadDir}/${dformat}.pdf`,
    },
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: `${dformat}.pdf`,
    path: `${dirToSave}/${dformat}.pdf`,
  };
  const configOptions = Platform.select({
    ios: configfb,
    android: configfb,
  });
  RNFetchBlob.config(configOptions || {})
    .fetch('GET', 'https://jsonplaceholder.typicode.com/todos/1')
    .finally(() => {
      if (Platform.OS === 'android') {
        RNFetchBlob.fs.writeFile(configfb.path, decoded, 'base64');
      } else {
        RNFetchBlob.ios.previewDocument(configfb.path);
      }
    })
    .catch(e => {
      console.log('ERROR', e);
    });
};

export {
  checkCameraAndStoragePermission,
  checkStoragePermission,
  optionsConfig,
  requestCameraPermission,
  requestMediaPermission,
  saveBase64AsPDF,
};
