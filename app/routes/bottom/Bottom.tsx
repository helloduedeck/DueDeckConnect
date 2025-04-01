import {Platform, View} from 'react-native';
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
import Svg, {Path} from 'react-native-svg';

const Tab = createBottomTabNavigator();

const iconFontSize = moderateScale(24);

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle:
    Platform.OS === 'ios'
      ? {
          backgroundColor: colors.white,
          paddingTop: moderateScale(5),
        }
      : {
          backgroundColor: colors.white,
          // padding:moderateScale(20),
          // marginBottom:moderateScale(20),
          paddingBottom: moderateScale(20),
          paddingTop: moderateScale(10),
          height: 90,
        },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarHideOnKeyboard: true,
};
const CalendarIcon = ({color}: any) => {
  return (
    <View>
      <Svg width={24} height={24} viewBox="0 0 21 21" fill="none">
        <Path
          d="M2.07422 17.923C2.07422 18.1691 2.17273 18.4052 2.34807 18.5793C2.52342 18.7534 2.76124 18.8512 3.00922 18.8512H18.5926C18.8405 18.8512 19.0784 18.7534 19.2537 18.5793C19.4291 18.4052 19.5276 18.1691 19.5276 17.923V7.09375H2.07422V17.923ZM14.5409 8.48608C14.5409 8.44505 14.5573 8.4057 14.5865 8.37669C14.6158 8.34767 14.6554 8.33137 14.6967 8.33137H16.2551C16.2964 8.33137 16.336 8.34767 16.3653 8.37669C16.3945 8.4057 16.4109 8.44505 16.4109 8.48608V10.0331C16.4109 10.0741 16.3945 10.1135 16.3653 10.1425C16.336 10.1715 16.2964 10.1878 16.2551 10.1878H14.6967C14.6554 10.1878 14.6158 10.1715 14.5865 10.1425C14.5573 10.1135 14.5409 10.0741 14.5409 10.0331V8.48608ZM14.5409 11.5801C14.5409 11.5391 14.5573 11.4998 14.5865 11.4707C14.6158 11.4417 14.6554 11.4254 14.6967 11.4254H16.2551C16.2964 11.4254 16.336 11.4417 16.3653 11.4707C16.3945 11.4998 16.4109 11.5391 16.4109 11.5801V13.1272C16.4109 13.1682 16.3945 13.2075 16.3653 13.2366C16.336 13.2656 16.2964 13.2819 16.2551 13.2819H14.6967C14.6554 13.2819 14.6158 13.2656 14.5865 13.2366C14.5573 13.2075 14.5409 13.1682 14.5409 13.1272V11.5801ZM11.4242 8.48608C11.4242 8.44505 11.4406 8.4057 11.4699 8.37669C11.4991 8.34767 11.5387 8.33137 11.5801 8.33137H13.1384C13.1797 8.33137 13.2194 8.34767 13.2486 8.37669C13.2778 8.4057 13.2942 8.44505 13.2942 8.48608V10.0331C13.2942 10.0741 13.2778 10.1135 13.2486 10.1425C13.2194 10.1715 13.1797 10.1878 13.1384 10.1878H11.5801C11.5387 10.1878 11.4991 10.1715 11.4699 10.1425C11.4406 10.1135 11.4242 10.0741 11.4242 10.0331V8.48608ZM11.4242 11.5801C11.4242 11.5391 11.4406 11.4998 11.4699 11.4707C11.4991 11.4417 11.5387 11.4254 11.5801 11.4254H13.1384C13.1797 11.4254 13.2194 11.4417 13.2486 11.4707C13.2778 11.4998 13.2942 11.5391 13.2942 11.5801V13.1272C13.2942 13.1682 13.2778 13.2075 13.2486 13.2366C13.2194 13.2656 13.1797 13.2819 13.1384 13.2819H11.5801C11.5387 13.2819 11.4991 13.2656 11.4699 13.2366C11.4406 13.2075 11.4242 13.1682 11.4242 13.1272V11.5801ZM11.4242 14.6742C11.4242 14.6332 11.4406 14.5938 11.4699 14.5648C11.4991 14.5358 11.5387 14.5195 11.5801 14.5195H13.1384C13.1797 14.5195 13.2194 14.5358 13.2486 14.5648C13.2778 14.5938 13.2942 14.6332 13.2942 14.6742V16.2212C13.2942 16.2623 13.2778 16.3016 13.2486 16.3306C13.2194 16.3596 13.1797 16.3759 13.1384 16.3759H11.5801C11.5387 16.3759 11.4991 16.3596 11.4699 16.3306C11.4406 16.3016 11.4242 16.2623 11.4242 16.2212V14.6742ZM8.30756 11.5801C8.30756 11.5391 8.32398 11.4998 8.3532 11.4707C8.38242 11.4417 8.42206 11.4254 8.46339 11.4254H10.0217C10.0631 11.4254 10.1027 11.4417 10.1319 11.4707C10.1611 11.4998 10.1776 11.5391 10.1776 11.5801V13.1272C10.1776 13.1682 10.1611 13.2075 10.1319 13.2366C10.1027 13.2656 10.0631 13.2819 10.0217 13.2819H8.46339C8.42206 13.2819 8.38242 13.2656 8.3532 13.2366C8.32398 13.2075 8.30756 13.1682 8.30756 13.1272V11.5801ZM8.30756 14.6742C8.30756 14.6332 8.32398 14.5938 8.3532 14.5648C8.38242 14.5358 8.42206 14.5195 8.46339 14.5195H10.0217C10.0631 14.5195 10.1027 14.5358 10.1319 14.5648C10.1611 14.5938 10.1776 14.6332 10.1776 14.6742V16.2212C10.1776 16.2623 10.1611 16.3016 10.1319 16.3306C10.1027 16.3596 10.0631 16.3759 10.0217 16.3759H8.46339C8.42206 16.3759 8.38242 16.3596 8.3532 16.3306C8.32398 16.3016 8.30756 16.2623 8.30756 16.2212V14.6742ZM5.19089 11.5801C5.19089 11.5391 5.20731 11.4998 5.23653 11.4707C5.26576 11.4417 5.30539 11.4254 5.34672 11.4254H6.90506C6.94639 11.4254 6.98602 11.4417 7.01525 11.4707C7.04447 11.4998 7.06089 11.5391 7.06089 11.5801V13.1272C7.06089 13.1682 7.04447 13.2075 7.01525 13.2366C6.98602 13.2656 6.94639 13.2819 6.90506 13.2819H5.34672C5.30539 13.2819 5.26576 13.2656 5.23653 13.2366C5.20731 13.2075 5.19089 13.1682 5.19089 13.1272V11.5801ZM5.19089 14.6742C5.19089 14.6332 5.20731 14.5938 5.23653 14.5648C5.26576 14.5358 5.30539 14.5195 5.34672 14.5195H6.90506C6.94639 14.5195 6.98602 14.5358 7.01525 14.5648C7.04447 14.5938 7.06089 14.6332 7.06089 14.6742V16.2212C7.06089 16.2623 7.04447 16.3016 7.01525 16.3306C6.98602 16.3596 6.94639 16.3759 6.90506 16.3759H5.34672C5.30539 16.3759 5.26576 16.3596 5.23653 16.3306C5.20731 16.3016 5.19089 16.2623 5.19089 16.2212V14.6742Z"
          fill={color}
        />
        <Path
          d="M18.5926 2.76301H16.414V1.52539H14.544V2.76301H7.05777V1.52539H5.18777V2.76301H3.00922C2.8869 2.76199 2.76559 2.78501 2.65227 2.83074C2.53895 2.87647 2.43587 2.944 2.34896 3.02946C2.26204 3.11491 2.19303 3.21659 2.14587 3.32864C2.09872 3.4407 2.07437 3.5609 2.07422 3.68234V5.85707H19.5276V3.68234C19.5274 3.5609 19.5031 3.4407 19.4559 3.32864C19.4088 3.21659 19.3397 3.11491 19.2528 3.02946C19.1659 2.944 19.0628 2.87647 18.9495 2.83074C18.8362 2.78501 18.7149 2.76199 18.5926 2.76301V2.76301Z"
          fill={color}
        />
      </Svg>
    </View>
  );
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
const NotificationIcon = ({color}: any) => {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
      <Path
        d="M12.0004 22.75C12.7298 22.7493 13.4431 22.5361 14.0533 22.1365C14.6635 21.7369 15.1441 21.1683 15.4363 20.5H8.56445C8.85669 21.1683 9.33727 21.7369 9.94746 22.1365C10.5576 22.5361 11.271 22.7493 12.0004 22.75Z"
        fill={color}
      />
      <Path
        d="M18.75 13.75V10.9127C18.75 7.60938 17.4675 4.73172 14.25 4L13.875 1.75H10.125L9.75 4C6.52125 4.73172 5.25 7.59812 5.25 10.9127V13.75L3 16.75V19H21V16.75L18.75 13.75Z"
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

  const Stack = createNativeStackNavigator();

  function HomeScreenStack() {
    return (
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Dashboard" component={DashBoard} />
        {/* <Stack.Screen name="Notice" component={NoticeList} /> */}
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashBoard}
        options={{
          tabBarLabel: 'DashBoard',
          tabBarIcon: ({color, focused}) => {
            return (
              // <MaterialCommunityIcons
              //   name={focused ? 'home' : 'home-outline'}
              //   color={color}
              //   size={iconFontSize}
              // />
              <HomeIcon color={focused ? colors.primary : color} />
            );
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            // setPaymentPageOpened(false);
            //navigation.navigate(ROUTES.DASHBOARD);
            // dispatch(actions.dashboard.setActiveAlert(activeAlert));
          },
        })}
      />

      <Tab.Screen
        name={ROUTES.SERVICES}
        component={Services}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons
                name={focused ? 'list' : 'list-outline'}
                color={color}
                size={iconFontSize}
              />
            );
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.navigate(ROUTES.SERVICES, {selectedTab: 1});
          },
        })}
      />

      <Tab.Screen
        name={ROUTES.PAYMENTS}
        component={Payments}
        options={{
          // tabBarStyle: {position: 'absolute'},
          tabBarIcon: ({color, focused}) => {
            return (
              <FontAwesome name={'rupee'} color={color} size={iconFontSize} />
              // <MaterialCommunityIcons
              //   name={
              //     focused
              //       ? 'clipboard-text-multiple'
              //       : 'clipboard-text-multiple-outline'
              //   }
              //   color={color}
              //   size={iconFontSize}
              // />
            );
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            // setPaymentPageOpened(false);
          },
        })}
      />
      <Tab.Screen
        name={ROUTES.APPOINTMENT}
        component={Appointment}
        listeners={({navigation}) => ({
          tabPress: e => {
            setPaymentPageOpened(true);
          },
        })}
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({color, focused}) => {
            return (
              // <Ionicons
              //   name={focused ? 'calendar' : 'calendar-outline'}
              //   style={{fontSize: fontsize.xlarge22}}
              //   color={color}
              // />
              <CalendarIcon color={focused ? colors.primary : color} />
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.NOTIFICATION}
        component={Notifications}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              // <MaterialCommunityIcons
              //   name={focused ? 'bell-ring' : 'bell-ring-outline'}
              //   color={color}
              //   size={iconFontSize}
              // />
              <NotificationIcon color={focused ? colors.primary : color} />
            );
          },
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            //setPaymentPageOpened(false);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabContainer;
