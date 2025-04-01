import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import Icon from '../../../components/atoms/Icon/IconComponent';
import colors from '../../../themev1/colors';
import {fonts} from '../../../themev1';
import fontsize from '../../../themev1/fontstyle';
import Text from '@components/text/Text';
type IProps = {
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
  style?: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  keyboardType?: any;
  value?: string;
  onChangeText?: (text: any) => void;
  editable?: boolean;
};

const Input: React.FC<IProps> = ({
  label,
  iconLeft,
  iconRight,
  onIconLeftPress,
  onIconRightPress,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputContainer,
          iconLeft && {paddingStart: moderateScale(15)},
          iconRight && {paddingEnd: moderateScale(15)},
        ]}>
        {iconLeft ? (
          <Icon name={iconLeft} onPress={onIconLeftPress} size={undefined} />
        ) : (
          <View style={styles.emptyIcon} />
        )}
        <TextInput
          placeholderTextColor={colors.grayDark}
          style={[styles.input, style]}
          {...props}
          maxLength={40}
        />
        {/* {iconRight ? (
          <Icon name={iconRight}  onPress={onIconRightPress} />
        ) : (
          <View style={styles.emptyIcon} />
        )} */}
        {iconRight ? (
          <Icon
            name={iconRight}
            size={iconRight === 'openeye' ? 22.1 : 22}
            onPress={onIconRightPress}
          />
        ) : (
          <View style={styles.emptyIcon} />
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(7),
  },
  input: {
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium14,
    flex: 1,
    justifyContent: 'center',
    paddingStart: moderateScale(10),
    color: colors.GRey800,
  },
  label: {
    paddingBottom: moderateScale(5),
    opacity: 0.8,
    fontSize: fontsize.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: colors.InputBorder,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:0.3,
    

    //elevation:0.1,
    // border:1,

    // backgroundColor: colors.grayLight,
    paddingVertical: Platform.OS === 'android' ? 0 : 12,
    alignItems: 'center',
  },
  emptyIcon: {},
});
