import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../text/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../Loader/Loader';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import fontsize from '@theme/fontstyle';

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

const Button: React.FC<IProps> = ({
  label,
  onPress,
  disabled = false,
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
      disabled={disabled} // || isLoading
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

export default Button;

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
  borderRadius: 4,
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
