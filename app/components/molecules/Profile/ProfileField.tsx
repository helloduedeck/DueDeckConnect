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

interface ProfileFieldProps {
  title: any;
  color: any;
  size: any;
  fontWeight?: any; // Prop for the title of the input field
  onPress?: () => void;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  title,
  color,
  size,
  fontWeight,
  onPress,
}) => {
  const [notificationStatus, setNotificationStatus] = React.useState(false);

  const toggleSwitch = () => {
    setNotificationStatus(previousState => !previousState);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.content}
        onPress={() => onPress?.()}>
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
