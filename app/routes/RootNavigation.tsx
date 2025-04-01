import React, {useEffect} from 'react';
import {ColorValue} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

// Hook for theme change (Light/Dark Mode)
import {useTheme} from '@theme/useTheme';
import {getSecureValue} from '@utils/keyChain';
import {updateToken} from '@store/slices/userSlice';
import Login from '@components/pages/Login';
import DashBoard from '@components/pages/Dashboard';
import { moderateScale } from 'react-native-size-matters';

const iconFontSize = moderateScale(23);


// Icons for Bottom Tab Navigation
const homeIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="list-sharp" size={30} color={color} />
);

// Root Navigation
// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.user);

  // Copy existing token from local storage to redux store
  useEffect(() => {
    async function checkIsLogined() {
      try {
        let temp = await getSecureValue('token');
        dispatch(updateToken({token: temp}));
      } catch (e) {}
    }
    checkIsLogined();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.cardBg,
            borderTopColor: theme?.layoutBg,
          },
          tabBarInactiveTintColor: theme.color,
          tabBarActiveTintColor: theme.primary,
          headerStyle: {backgroundColor: theme.cardBg, height: 50},
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.primary,
            fontSize: 18,
            fontWeight: 'bold',
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={DashBoard}
          options={{
            tabBarIcon: ({color, focused}) => {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'view-dashboard' : 'view-dashboard-outline'}
                  color={color}
                  size={iconFontSize}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="service"
          component={DashBoard}
          options={{
            tabBarStyle: {position: 'absolute'},
            tabBarIcon: ({color, focused}) => {
              return (
                <MaterialCommunityIcons
                  name={
                    focused
                      ? 'clipboard-text-multiple'
                      : 'clipboard-text-multiple-outline'
                  }
                  color={color}
                  size={iconFontSize}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Payments"
          component={DashBoard}
          options={{
            tabBarIcon: ({color, focused}) => {
              return (
                <FontAwesome name={'rupee'} color={color} size={iconFontSize} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Appointment"
          component={DashBoard}
          options={{
            tabBarIcon: ({color, focused}) => {
              return (
                <Ionicons
                  name={focused ? 'settings' : 'settings-outline'}
                  color={color}
                  size={iconFontSize}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={DashBoard}
          options={{
            tabBarIcon: ({color, focused}) => {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'bell-ring' : 'bell-ring-outline'}
                  color={color}
                  size={iconFontSize}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: homeIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
