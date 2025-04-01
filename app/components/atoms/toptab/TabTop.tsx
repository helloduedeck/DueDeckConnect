import {StyleSheet} from 'react-native';
import React from 'react';
import {colors, fonts} from '@theme';
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

type IProp = {
  tabs: {name: string; component: any; label?: string}[];
  initialRouteName?: string;
  initialParams?: any;
  islazy?: boolean;
  tabBar?: (props: MaterialTopTabBarProps) => React.ReactNode;
};

const TopTab: React.FC<IProp> = ({
  tabs,
  initialRouteName,
  initialParams,
  tabBar,
  islazy = true,
}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={tabBar}
      screenOptions={{
        lazy: islazy,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.HexGray,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: fonts.Normal,
        },
      }}>
      {tabs.map(item => {
        return (
          <Tab.Screen
            options={{
              tabBarLabel: item.label || item.name,
            }}
            key={item.name}
            name={item.name}
            initialParams={initialParams}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TopTab;

const styles = StyleSheet.create({});
