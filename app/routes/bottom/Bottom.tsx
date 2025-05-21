import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import {
//   Dashboard,
//   Notification,
//   Payments,
//   Setting,
//   Task,
// } from '../../../container';
import Svg, { Circle, Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, Path, Rect } from 'react-native-svg';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
// import {actions} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '@theme';
import fontsize from '@theme/fontstyle';
import ROUTES from '@routes/routes';
import DashBoard from '@components/pages/auth/Dashboard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Payments from '@components/pages/auth/Payments';
import Notifications from '@components/pages/auth/Notifications';
import Services from '@components/pages/auth/Services';
import Appointment from '@components/pages/auth/Appointment';
import Notice from '@components/pages/auth/Notice';
import FabButton from '@components/atoms/Buttons/FabButton';
import Documents from '@components/pages/auth/Documents';
import LinearGradient from 'react-native-linear-gradient';
import { setLoadNotificationPage } from '@store/slices/dashboardSlice';

const Tab = createBottomTabNavigator();

const iconFontSize = moderateScale(24);

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle:
    Platform.OS === 'ios'
      ? {
        backgroundColor: 'transparent',
        paddingTop: moderateScale(5),
        }
      : {
        backgroundColor: colors.Dashboard,

          // padding:moderateScale(20),
          // marginBottom:moderateScale(20),
          paddingBottom: moderateScale(20),
          paddingTop: moderateScale(10),
          height: 0,
        },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarHideOnKeyboard: true,
};


const HomeIcon = ({color}: any) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.13478 18.7733V15.7156C7.13478 14.9351 7.77217 14.3023 8.55844 14.3023H11.4326C11.8102 14.3023 12.1723 14.4512 12.4393 14.7163C12.7063 14.9813 12.8563 15.3408 12.8563 15.7156V18.7733C12.8539 19.0978 12.9821 19.4099 13.2124 19.6402C13.4427 19.8705 13.7561 20 14.0829 20H16.0438C16.9596 20.0023 17.8388 19.6428 18.4872 19.0008C19.1356 18.3588 19.5 17.487 19.5 16.5778V7.86686C19.5 7.13246 19.1721 6.43584 18.6046 5.96467L11.934 0.675869C10.7737 -0.251438 9.11111 -0.221498 7.98539 0.746979L1.46701 5.96467C0.872741 6.42195 0.517552 7.12064 0.5 7.86686V16.5689C0.5 18.4639 2.04738 20 3.95617 20H5.87229C6.55123 20 7.103 19.4562 7.10792 18.7822L7.13478 18.7733Z"
        fill={color}
      />
    </Svg>
  );
};


const BottomTabContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [refresh, setRefresh] = useState(false);
  const activeAlert = useSelector(
    (state: any) => state?.dashboard?.activeAlert,
  );
  const setPaymentPageOpened = (value: Boolean) => {
    // dispatch(actions.dashboard.setPaymentPageOpened(value));
  };
  const [showServiceSheet, setShowServiceSheet] = useState(false);

  const [showAppointmentSheet, setShowAppointmentSheet] = useState(false);

  const Stack = createNativeStackNavigator();


  return (
  //   <Tab.Navigator screenOptions={screenOptions}>
    
      
  //     <Tab.Screen
  //       name={ROUTES.DASHBOARD}
  //       component={DashBoard}
  //       options={{
  //         tabBarLabel: 'DashBoard',
  //         tabBarIcon: ({ color, focused }) => {
  //           return (
  //             <View         style={{
  //              // Adjust left position
  //               zIndex: 10, // Control stacking order
  //             }}>
  //               <HomeIcon color={focused ? colors.primary : color} />
  //             </View>
  //           );
  //         },
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: e => {
  //           // setPaymentPageOpened(false);
  //           //navigation.navigate(ROUTES.DASHBOARD);
  //           // dispatch(actions.dashboard.setActiveAlert(activeAlert));
  //         },
  //       })}
  //     />
  //     <Tab.Screen
  //       name={ROUTES.SERVICES}
  //       component={Services}
  //       options={{
  //         tabBarLabel: 'Tasks',
  //         tabBarIcon: ({color, focused}) => {
  //           return (
  //             <Ionicons
  //               name={focused ? 'list' : 'list-outline'}
  //               color={color}
  //               size={iconFontSize}
  //             />
  //           );
  //         },
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: e => {
  //           navigation.navigate(ROUTES.SERVICES, {selectedTab: 1});
  //         },
  //       })}
  //     />

  //      <Tab.Screen
  //   name={'dummy'}
  //   component={Notice}  
  //   options={{
  //     tabBarLabel: '',
  //     tabBarIcon: ({ color, focused }) => {
  //       return (
  //         <MySVG  />
  //       )
  //     },
  //   }}
  //   listeners={({ navigation }) => ({
  //     tabPress: e => {
  //       navigation.navigate(ROUTES.SERVICES, { selectedTab: 1 });
  //     },
  //   })}
  // />

   
  //     <Tab.Screen
  //       name={ROUTES.APPOINTMENT}
  //       component={Appointment}
  //       listeners={({navigation}) => ({
  //         tabPress: e => {
  //           setPaymentPageOpened(true);
  //         },
  //       })}
  //       options={{
  //         tabBarLabel: 'Appointment',
  //         tabBarIcon: ({color, focused}) => {
  //           return (
  //             // <Ionicons
  //             //   name={focused ? 'calendar' : 'calendar-outline'}
  //             //   style={{fontSize: fontsize.xlarge22}}
  //             //   color={color}
  //             // />
  //             <CalendarIcon color={focused ? colors.primary : color} />
  //           );
  //         },
  //       }}
  //     />
  //     <Tab.Screen
  //       name={ROUTES.NOTIFICATION}
  //       component={Notifications}
  //       options={{
  //         tabBarIcon: ({color, focused}) => {
  //           return (
  //             // <MaterialCommunityIcons
  //             //   name={focused ? 'bell-ring' : 'bell-ring-outline'}
  //             //   color={color}
  //             //   size={iconFontSize}
  //             // />
  //             <NotificationIcon color={focused ? colors.primary : color} />
  //           );
  //         },
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: e => {
  //           //setPaymentPageOpened(false);
  //         },
  //       })}
  //     />
  //   </Tab.Navigator>
  <Tab.Navigator
  screenOptions={{
    tabBarStyle: styles.tabBarStyle,
    tabBarLabelStyle: styles.tabBarLabelStyle,
    // tabBarIconStyle: styles.tabBarIconStyle,
    tabBarActiveTintColor:colors.primary, // Active tab color
    tabBarInactiveTintColor: 'gray', // Inactive tab color
    headerShown: false,
  }}
>
  <Tab.Screen
 name={ROUTES.DASHBOARD}
  component={DashBoard}
    options={{
      tabBarIcon: ({ color, focused }) => {
                 return (
                     <View         style={{
                  // Adjust left position
                }}>
                     <HomeIcon color={focused ? colors.primary : color} />
                   </View>
                  );
               },      
    }}
  />
  <Tab.Screen
    name={ROUTES.SERVICES}
    component={Services}
    options={{
      tabBarLabel: 'Tasks',
      tabBarIcon: ({ color }) => 
        <View style={{margin:0,}}>
      <Ionicons name="list" size={24} color={color} style={{padding:5}} />
      </View>
    }}
  />
<Tab.Screen
  name={ROUTES.DOCUMENT}
  component={Documents}
  options={{
    tabBarButton: () => (
      <LinearGradient
      colors={['transparent', 'transparent',  colors.Dashboard]} // 50% white at the top and 50% grey at the bottom
      locations={[0, 0.2, 1]}      
        style={{
          width: moderateScale(73),
          height: moderateScale(70),
          borderColor: colors.Dashboard,
          borderBottomWidth: 1,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 3,
          bottom: 42,
          left: '50%',
          transform: [{ translateX: -35 }],
        }}
      >
        <TouchableOpacity>
          <View style={styles.fabButton}>
          <FabButton
                size={'small'}
                background={colors.primary}
                iconName={'plus'}
                showAppointmentSheet={showAppointmentSheet}
                showServiceSheet={showServiceSheet}
                onSheetClose={() => {
                  setShowAppointmentSheet(false);
                  setShowServiceSheet(false);                  
                }}
              />         
               </View>
        </TouchableOpacity>
      </LinearGradient>
    ),
  }}
/>

  <Tab.Screen
    name={ROUTES.APPOINTMENT}
    component={Appointment}
    options={{
      tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color}  style={{marginLeft:0}}/>,
    }}
  />

  <Tab.Screen
    name="Notifications"
    component={Notifications}
    options={{
      tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />,
    }}
    listeners={({ navigation, route }) => ({
      tabPress: (e) => {
        const currentRoute = navigation.getState().routes[navigation.getState().index].name;

        if (currentRoute !== ROUTES.NOTIFICATION) {
          dispatch(setLoadNotificationPage(true)); // Reload only if coming from another screen
        }
        //modified by sahil gaikwad on the 25-1-25 for current navigation load page 
        // Navigate to the notification page if not already there
        if (currentRoute !== ROUTES.NOTIFICATION) {
          navigation.navigate(ROUTES.NOTIFICATION);
        }
      },
    })}
  />

</Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    height: 90,
    borderTopWidth: 0,
    // justifyContent:'space-evenly',
    paddingBottom:20,
    zIndex: 1
    
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontSize: 11,
    fontWeight: '600',
    marginHorizontal:5,
    zIndex:2
  },
  // tabBarIconStyle: {
  //   width: 50,
  //   height: 30,
  //   backgroundColor:'red',
  //   marginTop:9
  // },
  fabButton: {
    position: 'absolute',
    bottom: moderateScale(-120),
    left: '50%',
    transform: [{ translateX: -15 }],
    // backgroundColor: colors.primary,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:3
    // Add borderRadius for circular effect if needed
    // borderRadius: 30, 
    // Apply red shadow
    // shadowColor: colors.black,  // Shadow color is set to red
    // shadowOffset: { width: 0, height: 4 },  // Keeps the shadow offset as specified
    // shadowOpacity: 3.9,  // Increased opacity for more visible shadow
    // shadowRadius: 15,  // Adjust the radius to control the blur of the shadow
    // elevation: 15,  // Ensures that the shadow works on Android as well
  },
  
  fabText: {
    color: 'white',
    fontSize: 34,
    fontWeight: '300',
  },
});

export default BottomTabContainer;
