import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import {CirclePropsType} from '../../../types/components';
import Labelstyles from './Circlestyles';
import IconComponent from '../../../Icon/IconComponent';
import {moderateScale} from 'react-native-size-matters';

const Circle: React.FC<CirclePropsType> = ({
  size,
  iconName,
  background,
  iconColor,
  children,
  ...rest
}) => {
  let circlesize;
  switch (size) {
    case 'exsmall':
      circlesize = moderateScale(30);
      break;
    case 'small':
      circlesize = moderateScale(40);
      break;
    case 'medium':
      circlesize = moderateScale(100);
      break;
    default:
      circlesize = moderateScale(150);
  }
  const circleStyle: ViewStyle = {
    width: circlesize,
    height: circlesize,
    borderRadius: circlesize / 2,
    backgroundColor: background,
    justifyContent: 'center',
    alignItems: 'center',
  };

  // return <View {...rest} style={circleStyle}>{children}</View>;
  return (
    <View style={circleStyle} {...rest}>
      <IconComponent name={iconName} size={undefined} color={iconColor} />
    </View>
  );
};

export default Circle;
