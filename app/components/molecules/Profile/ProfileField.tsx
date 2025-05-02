// import {colors} from '@theme';
// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
// import {moderateScale} from 'react-native-size-matters';
// import Icon from 'react-native-vector-icons/FontAwesome';

// interface ProfileFieldProps {
//   title: any;
//   color: any;
//   size: any; // Prop for the title of the input field
// }

// const ProfileField: React.FC<ProfileFieldProps> = ({title, color, size}) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity activeOpacity={0.7} style={styles.content}>
//         <Text style={{flex: 1, color: color, fontSize: size}}>
//           {title} {/* Accessing the title prop */}
//         </Text>
//         <Icon name="chevron-right" size={16} color={colors.Grey600} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileField;

// const styles = StyleSheet.create({
//   container: {
//     // margin: moderateScale(5),
//     height: moderateScale(42),
//     borderColor: colors.profileinput,
//     borderRadius: 5,
//     paddingStart: moderateScale(16),
//     paddingEnd: moderateScale(20),
//     // marginHorizontal: moderateScale(24),
//     justifyContent: 'center',
//     backgroundColor: colors.white,
//     ...Platform.select({
//       ios: {
//         shadowColor: colors.black,
//         shadowOffset: {width: 0, height: 2},
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../../themev1';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface ProfileFieldProps {
  title: any;
  color: any;
  size: any;
  fontWeight?: any; // Prop for the title of the input field
  onPress?: () => void;
  showicon:any
  showchaticon:any
  showlogicon:any
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  title,
  color,
  size,
  fontWeight,
  onPress,
  showicon,
  showchaticon,
  showlogicon
}) => {
  const [notificationStatus, setNotificationStatus] = React.useState(false);

  const toggleSwitch = () => {
    setNotificationStatus(previousState => !previousState);
  };
  const Chat = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <LinearGradient id="paint0_linear_1009_35866" x1="7.99582" y1="-5.3419" x2="-5.34422" y2="7.99887" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#22E1FF" />
          <Stop offset="0.478729" stopColor="#1D8FE1" />
          <Stop offset="1" stopColor="#625EB1" />
        </LinearGradient>
      </Defs>
      <Path
        d="M13.74 12.7948C14.1578 12.2348 14.4445 11.5881 14.579 10.9024C14.7134 10.2168 14.6922 9.50971 14.5169 8.83335C14.3416 8.157 14.0166 7.52865 13.566 6.99466C13.1154 6.46068 12.5506 6.03471 11.9133 5.74817C11.7745 4.94957 11.4555 4.19311 10.9805 3.53628C10.5056 2.87945 9.88713 2.33952 9.17222 1.95752C8.4573 1.57552 7.66472 1.3615 6.8547 1.33173C6.04467 1.30195 5.23852 1.4572 4.49748 1.78567C3.75645 2.11415 3.10004 2.60722 2.57812 3.2274C2.05621 3.84759 1.68252 4.57858 1.48546 5.36483C1.28839 6.15108 1.27314 6.97191 1.44085 7.76494C1.60856 8.55798 1.95482 9.30235 2.45333 9.9415L1.52666 10.8615C1.43416 10.9553 1.37149 11.0743 1.34658 11.2036C1.32166 11.333 1.33561 11.4668 1.38666 11.5882C1.43667 11.7099 1.52161 11.8141 1.63075 11.8877C1.7399 11.9612 1.86838 12.0008 1.99999 12.0015H5.79333C6.17109 12.7979 6.76669 13.471 7.51116 13.943C8.25563 14.4149 9.11854 14.6663 9.99999 14.6682H14C14.1316 14.6675 14.2601 14.6279 14.3692 14.5544C14.4784 14.4808 14.5633 14.3766 14.6133 14.2548C14.6644 14.1334 14.6783 13.9996 14.6534 13.8703C14.6285 13.741 14.5658 13.6219 14.4733 13.5282L13.74 12.7948ZM5.33333 10.0015C5.33417 10.2248 5.352 10.4476 5.38666 10.6682H3.60666L3.83999 10.4415C3.90248 10.3795 3.95208 10.3058 3.98592 10.2246C4.01977 10.1433 4.03719 10.0562 4.03719 9.96817C4.03719 9.88016 4.01977 9.79302 3.98592 9.71178C3.95208 9.63054 3.90248 9.55681 3.83999 9.49483C3.46637 9.12531 3.17016 8.685 2.9687 8.19965C2.76723 7.7143 2.66455 7.19366 2.66666 6.66817C2.66666 5.6073 3.08809 4.58989 3.83823 3.83974C4.58838 3.08959 5.60579 2.66817 6.66666 2.66817C7.49445 2.66319 8.30299 2.91776 8.97861 3.39608C9.65424 3.8744 10.163 4.55242 10.4333 5.33483H9.99999C8.76232 5.33483 7.57533 5.8265 6.70016 6.70167C5.82499 7.57684 5.33333 8.76382 5.33333 10.0015ZM12.36 13.3348L12.3933 13.3682H9.99999C9.22889 13.3668 8.48211 13.0981 7.88687 12.6079C7.29164 12.1177 6.88478 11.4363 6.73559 10.6797C6.58641 9.92319 6.70413 9.13833 7.06871 8.45885C7.43329 7.77937 8.02217 7.24731 8.73503 6.9533C9.44789 6.6593 10.2406 6.62154 10.9782 6.84645C11.7158 7.07137 12.3526 7.54505 12.7801 8.1868C13.2076 8.82855 13.3994 9.59867 13.3228 10.366C13.2462 11.1333 12.9059 11.8503 12.36 12.3948C12.2344 12.5179 12.1625 12.6857 12.16 12.8615C12.1604 12.9497 12.1782 13.037 12.2126 13.1182C12.2469 13.1995 12.297 13.2731 12.36 13.3348Z"
        fill="url(#paint0_linear_1009_35866)"
      />
    </Svg>
  );
  const LogIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_1009_35868" x1="8" y1="0" x2="0.615385" y2="11.0769" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#22E1FF" />
          <Stop offset="0.478729" stopColor="#1D8FE1" />
          <Stop offset="1" stopColor="#625EB1" />
        </LinearGradient>
      </Defs>
      <Path 
        d="M8.66667 8H14M8.66667 12H14M8.66667 4H14M2 8H2.66667M2 12H2.66667M2 4H2.66667M5.33333 8H6M5.33333 12H6M5.33333 4H6"
        stroke="url(#paint0_linear_1009_35868)"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
  const MyIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <LinearGradient id="paint0_linear_1009_35865" x1="7.25004" y1="-3.33854" x2="-4.07274" y2="8.48377" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#22E1FF" />
          <Stop offset="0.478729" stopColor="#1D8FE1" />
          <Stop offset="1" stopColor="#625EB1" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_1009_35865" x1="8.00004" y1="3.65885" x2="2.66671" y2="14.3255" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#22E1FF" />
          <Stop offset="0.478729" stopColor="#1D8FE1" />
          <Stop offset="1" stopColor="#625EB1" />
        </LinearGradient>
      </Defs>
      <Path
        d="M1.33337 2.99479V13.6615L3.00004 6.99479H13.1667V4.99479C13.1667 4.62659 12.8682 4.32812 12.5 4.32812H8.00004L6.33337 2.32812H2.00004C1.63185 2.32812 1.33337 2.6266 1.33337 2.99479Z"
        stroke="url(#paint0_linear_1009_35865)"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3334 13.6589L14.6667 6.99219H2.93754L1.33337 13.6589H13.3334Z"
        stroke="url(#paint1_linear_1009_35865)"
        strokeLinejoin="round"
      />
    </Svg>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.content}
        onPress={() => onPress?.()}>
          <View style={{marginRight:10}}>
       { showicon && <MyIcon/>}
       {showchaticon && <Chat/>}
       {showlogicon && <LogIcon/>}
        </View>
        <Text style={{flex: 1, color: color, fontSize: size, fontWeight}}>
          {title} {/* Accessing the title prop */}
        </Text>
        
        <View>
          {title === 'Sounds & Notifications' ? (
            <Switch
              trackColor={{false: '#767577', true: `${colors.primary}55`}}
              thumbColor={notificationStatus ? '#0789B5' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={notificationStatus}
              style={{marginEnd: -10}}
            />
          ) : (
            <Icon
              name="chevron-right"
              size={16}
              color={colors.Grey600}
              style={{marginEnd: 10}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  container: {
    //  margin: moderateScale(8),
    // width: moderateScale(327),
    // height: moderateScale(42),
    // borderColor: colors.profileinput,
    borderRadius: 8,
    paddingStart: moderateScale(16),
    paddingEnd: moderateScale(20),
    paddingVertical: moderateScale(12),
    marginTop: moderateScale(7),
    // marginHorizontal: moderateScale(24),
    justifyContent: 'center',
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
