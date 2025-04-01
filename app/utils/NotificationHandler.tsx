import {useSubscribeNotificationMutation} from '@api/notifications';
import {useAppSelector} from '@hooks/redux_hooks';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '@routes/routes';
import React from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {LogLevel, OneSignal} from 'react-native-onesignal';

// Add OneSignal within your App's root component
const NotificationHandler = () => {
  const userProfileData = useAppSelector(state => state?.user?.user);

  const [subscribeNotification] = useSubscribeNotificationMutation();

  let id = 0;

  useEffect(() => {
    OneSignal.initialize('7e03d89f-6a91-41b1-8ee6-cad5063ea8ff');

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (playerID: any) => {
      console.log('OneSignal Player ID:', playerID);

      let routename: String = playerID.notification.additionalData.routename;
      if (routename === 'CREATEUPDATEAPPOINTMENT') {
        //navigation.navigate(ROUTES.CREATEUPDATEAPPOINTMENT);
      } else if (routename === 'DOCUMENT') {
        //navigation.navigate(ROUTES.DOCUMENT);
      }
      console.log(
        routename,
        '///////\\\\\\\\333333333333333333333333333333333',
      );
      console.log('---- First test');
    });
    console.log('---- NOTIFICATION HELPER');

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
      console.log('OneSignal: notification will show in foreground:', event);
      let notif = event.getNotification();

      const cancelButton = {
        text: 'Cancel',
        onPress: () => {
          event.preventDefault();
        },
        style: 'cancel',
      };

      const completeButton = {
        text: 'Display',
        onPress: () => {
          event.getNotification().display();
        },
      };

      Alert.alert(
        'Display notification?',
        notif.title,
        [cancelButton, completeButton],
        {
          cancelable: true,
        },
      );
    });

    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });

    OneSignal.InAppMessages.addEventListener('click', event => {
      console.log('OneSignal IAM clicked:', event);
    });

    OneSignal.InAppMessages.addEventListener('willDisplay', event => {
      console.log('OneSignal: will display IAM: ', event);
    });

    OneSignal.InAppMessages.addEventListener('didDisplay', event => {
      console.log('OneSignal: did display IAM: ', event);
    });

    OneSignal.InAppMessages.addEventListener('willDismiss', event => {
      console.log('OneSignal: will dismiss IAM: ', event);
    });

    OneSignal.InAppMessages.addEventListener('didDismiss', event => {
      console.log('OneSignal: did dismiss IAM: ', event);
    });

    OneSignal.User.pushSubscription.addEventListener('change', subscription => {
      //Added id logic so that api call should not get repeated whn page load
      if (subscription.current?.id && id === 0) {
        id = id + 1;
        sendNotificationSubscription(
          subscription.current?.id,
          subscription.current?.token,
        );
      }
    });

    OneSignal.Notifications.addEventListener('permissionChange', granted => {
      console.log(
        'OneSignal: permission changed:',
        granted.current?.onesignalId,
      );
    });

    OneSignal.User.addEventListener('change', event => {
      console.log('OneSignal: user changed: ', event);
    });
    // Clean up event listener when the component unmounts
    return () => {};
  }, []);

  const sendNotificationSubscription = async (
    subscriptionId: string | undefined,
    token: string | undefined,
  ) => {
    const reqData = {
      email: userProfileData?.data?.email,
      user_id: userProfileData?.data?.user_id,
      player_id: subscriptionId,
      token: token,
    };
    console.log('sendNotificationSubscriptin ', reqData);
    await subscribeNotification(reqData)
      .unwrap()
      .then(data => {
        if (data.status == 200) {
        }
      })
      .finally(() => {})
      .catch(error => {
        console.log('subscribeNotification', error);
      });
  };

  return null;
};
export default React.memo(NotificationHandler);
