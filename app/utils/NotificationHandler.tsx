import {useSubscribeNotificationMutation} from '@api/notifications';
import {useAppSelector} from '@hooks/redux_hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ROUTES from '@routes/routes';
import React, { useState } from 'react';
import {useEffect} from 'react';
import {Alert, BackHandler, Linking, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../themev1/colors';

// Add OneSignal within your App's root component
const NotificationHandler = () => {
  const userProfileData = useAppSelector(state => state?.user?.user);

  const [subscribeNotification] = useSubscribeNotificationMutation();
  const [isConnected, setIsConnected] = useState(true);
  const dashboardData = useAppSelector(state => state?.dashboard);
  const userState = useAppSelector(state => state?.user);
  let id = 0;
  const navigation = useNavigation();


  let user_id = '';
  try {
    user_id = dashboardData.serviceBoard.data[0].user_id;
  } catch (error) {
    user_id = '';
  }

  const getNotification = () => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize('7e03d89f-6a91-41b1-8ee6-cad5063ea8ff');
    OneSignal.Notifications.requestPermission(true);
    OneSignal.User.getTags().then(tags =>{
      if(user_id){
        if(tags.USERID != "DD"+user_id.toString()){
          OneSignal.User.addTag("USERID", "DD"+user_id.toString());
        }
      }
    });

    
    // Method for listening for notification clicks
      OneSignal.Notifications.addEventListener('click', (data) => {
        const route = data?.notification?.additionalData.Route;
        const instance_id = data?.notification?.additionalData.instance_id;
        const request_id = data?.notification?.additionalData.request_id;

        // Split the route into an array
        const parts = route.split('/');

        // Check if the route contains a '/'
        let action;
        let id;
        if (parts.length > 1) {
          [action, id] = parts;
        } else {
          action = route; // If no '/', treat the whole route as the action
        }

        if (route == "UPDATEAPK") {
          const url = "https://play.google.com/store/apps/details?id=com.duedeckEmployee&hl=en-IN";
          Linking.openURL(url).catch(err => console.error("An error occurred", err));
        }
        if(action == "edittask"){
          navigation.navigate(ROUTES.DASHBOARD);
          navigation.navigate(ROUTES.SERVICEDETAILS, { id: id });
        }
        
        if(action == "appointment"){
          navigation.navigate(ROUTES.DASHBOARD);
          navigation.navigate('APPOINTMENT', { instance: instance_id });
        }
        // if(action == "timesheet" && isTimesheet){
        //   navigation.navigate(ROUTES.DASHBOARD);
        //   // navigation.navigate(ROUTES.TimesheetApprovalEntry, { emp_id: request_id })
        // }

        if(action == ""){
          navigation.navigate(ROUTES.DASHBOARD);
        }
  
      });


    // Clean up event listener when the component unmounts
    return () => {};
    
  }

  useEffect(() => {

    if(userState.notificationPermission){
      
      getNotification()
      console.log('---- NOTIFICATION HELPER1');
    }else{
      
      // Disable notifications if state is false
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      OneSignal.initialize('7e03d89f-6a91-41b1-8ee6-cad5063ea8ff');
      OneSignal.Notifications.requestPermission(false); // This disables notifications
      if(user_id){
        const USERID = "DD"+user_id.toString();
        const osur = OneSignal.User.removeTag(USERID);
        console.log(osur,USERID,'---- NOTIFICATION HELPER2');

      }

    }
    
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        showExitAlert();
        return true; // Prevent default back action
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      // Listen for gestures and back actions when navigating away
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        showExitAlert();
      });

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        unsubscribe();
      };
    }, [navigation])
  );
  const showExitAlert = () => {
    BackHandler.exitApp()
  };


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);


  
  return (
    <View>
         {/* No Internet Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={!isConnected}
    >
      <View style={styles.modalContainer}>
    
        <View style={styles.modalContent}>
        <AntDesign
              name={'close'}
              size={25}
              style={{
                position: 'absolute',
                right: 10,
                top:10,
                zIndex: 999,
                color:colors.GRey800
              //  backgroundColor:'black'
              }}
              onPress={() => {
               showExitAlert()
              }}
            />
          <MaterialCommunityIcons
          name={'web-off'}  //  Only Icon modified by sahil on 18 nov 
          color={colors.GRey800}
          size={50}
        />
          {/* Message */}
          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.message}>
            Please check your connection and try again.
          </Text>

          {/* Retry Button */}
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              // Optional: Add a manual refresh logic
              NetInfo.fetch().then(state => setIsConnected(state.isConnected));
              // showExitAlert()
              // handleRetry()
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
  )
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default React.memo(NotificationHandler);
