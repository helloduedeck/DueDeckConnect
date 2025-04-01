import React from 'react';
import {Text, View} from 'react-native';

import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {AppointedConsultantPropsType} from '../../../types/components';

const AppointedConsultant = (props: AppointedConsultantPropsType) => {
  let Labelsizes;
  switch (props.size) {
    case 'exsmall':
      Labelsizes = styles.exsmall;
      break;
    case 'small':
      Labelsizes = styles.smalllabel;
      break;
    case 'medium':
      Labelsizes = styles.mediumlabel;
      break;

    case 'large':
      Labelsizes = styles.largelabel;
      break;
    default:
      Labelsizes = styles.mediumlabel;
  }

  const fontWeight =
    props.fontWeight === 'bold'
      ? 'bold'
      : props.fontWeight === 'semibold'
      ? '500'
      : 'normal';
  return (
    <View>
      <Text style={[Labelsizes, {fontWeight}, {color: props.color}]}>
        {props.title}
      </Text>
    </View>
  );
};
export default AppointedConsultant;

const styles = ScaledSheet.create({
  exsmall: {
    fontSize: moderateScale(10),
  },
  smalllabel: {
    fontSize: moderateScale(12),
  },
  mediumlabel: {
    fontSize: moderateScale(16),
  },
  largelabel: {
    fontSize: moderateScale(20),
  },
});
