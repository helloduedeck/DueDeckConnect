import {Keyboard, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from 'react-native-size-matters';
import fontsize from '@theme/fontstyle';
import {colors} from '@theme';
import Loader from '../atoms/Loader/Loader';

type IProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  labelStyle?: any;
  containerStyle?: any;
  leftIcon?: string;
  isSmall?: boolean;
  isMedium?: boolean;
  isExtraSmall?: boolean;
};

const ButtonComponent: React.FC<IProps> = ({
  label,
  onPress,
  disabled,
  isLoading,
  isOutlined,
  labelStyle,
  containerStyle,
  leftIcon,
  isSmall,
  isMedium,
  isExtraSmall,
}) => {
  const onButtonPress = () => {
    Keyboard.dismiss();
    onPress?.();
  };

  return (
    <TouchableOpacity
      onPress={onButtonPress}
      disabled={disabled || isLoading}
      style={[
        styles.container(isOutlined, isLoading, disabled),
        isSmall && styles.smallContainer,
        isMedium && styles.mediumContainer,
        containerStyle,
      ]}>
      {leftIcon ? (
        <Icon
          style={[styles.icon, isExtraSmall && styles.extraSmallIcon]}
          size={isSmall ? 15 : isExtraSmall ? 12.5 : 20}
          name={leftIcon}
          color={isOutlined ? colors.primary : colors.white}
        />
      ) : null}
      {isLoading ? (
        <Loader size={isSmall ? 30 : 55} />
      ) : (
        <Text
          style={[
            styles.label(isOutlined),
            isSmall && styles.smallLabel,
            isMedium && styles.mediumLabel,
            isExtraSmall && styles.extraSmallLabel,
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const containerStyle: any = (
  isOutlined: boolean,
  isLoading: boolean,
  disabled: boolean,
) => ({
  backgroundColor:
    isOutlined || isLoading
      ? colors.white
      : disabled
      ? colors.gray
      : colors.primary,
  borderWidth: isLoading ? 0 : 1,
  borderRadius: 8,
  borderColor: disabled ? colors.gray : colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

const labelStyle: any = (isOutlined: boolean) => ({
  color: isOutlined ? colors.primary : colors.white,
  fontSize: fontsize.medium,
  paddingHorizontal: moderateScale(35),
  paddingVertical: moderateScale(10),
  textAlign: 'center',
  fontWeight: '700',
});

const styles: any = StyleSheet.create({
  container: containerStyle,
  label: labelStyle,
  icon: {
    marginStart: moderateScale(10),
  },
  smallContainer: {
    flexShrink: 1,
  },
  smallLabel: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),

    fontSize: fontsize.medium10,
  },
  extraSmallLabel: {
    paddingHorizontal: moderateScale(7),
    paddingVertical: moderateScale(5),
    fontSize: fontsize.medium10,
  },
  extraSmallIcon: {
    marginStart: moderateScale(7),
  },
  mediumContainer: {
    flexShrink: 1,
  },
  mediumLabel: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(8),
    fontSize: fontsize.medium10,
  },
});
