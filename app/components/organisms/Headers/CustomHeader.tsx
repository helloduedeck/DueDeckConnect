import LockIcon from '../../../Icon/icons/Lock';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../themev1';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Svg, {SvgProps} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type CustomHeaderProps = {
  leftIcon?: SvgProps;
  rightIcon?: SvgProps;
  title: any;
  onPress?: () => void;
  size?: any;
  fontWeight?: any;
  color?: any;
};

const CustomHeader: React.FunctionComponent<CustomHeaderProps> = ({
  title,
  size,
  fontWeight,
  color,
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
          color={colors.GRey800}
          size={24}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 80,
    // width:'70%',
    marginLeft: moderateScale(8),
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    flex: 3,
    marginEnd: 30,
  },
});
