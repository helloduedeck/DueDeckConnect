import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Svg, {SvgProps} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Fontisto';
import {colors} from '../../../themev1';

type CustomHeaderProps = {
  leftIcon?: SvgProps;
  rightIcon?: SvgProps;
  title: string;
  onPress?: () => void;
  onSearchIconPress: () => void;
  count: string;
};

const NotificationHeader: React.FunctionComponent<CustomHeaderProps> = ({
  title,
  onSearchIconPress,
  count,
}) => {
  const navigation = useNavigation();
  const handleSvgClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSvgClick}
        style={{marginLeft: moderateScale(10)}}>
        <MaterialCommunityIcons
          name={'arrow-left'}
          color={colors.white}
          size={20}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.text}>{title}</Text>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            backgroundColor: colors.strokeW,
            borderStyle: 'solid',
            justifyContent: 'center',
            marginLeft: 5,
          }}>
          <Text style={{fontSize: 12, textAlign: 'center',color:colors.GRey800}}>{count}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.strokeW,
            padding: moderateScale(5),
            alignItems: 'center',
            borderRadius: 50,
            marginRight: moderateScale(10),
          }}
          onPress={onSearchIconPress}>
          <Ionicons name="search" size={15} color={colors.GRey800} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 55,
    // marginLeft: moderateScale(8),
  },
  text: {
    color: 'white',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  CircleShape: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#FF9800',
  },
});

export default NotificationHeader;
