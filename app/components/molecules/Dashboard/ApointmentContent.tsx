import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppointmentContentPropType} from '../../../types/components';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';

const AppointmentContent = (props: AppointmentContentPropType) => {
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
    <View style={styles.container}>
      <View style={styles.iconcontainer}>
        <MaterialCommunityIcons
          name={'circle'}
          color={colors.Grey600}
          size={7}
        />
      </View>
    <View >
    <Text style={[Labelsizes, {fontWeight}, {color: props.color},]}>
        {props.title}
      </Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "center",
  },
  iconcontainer: {
    marginRight: moderateScale(5),
    marginLeft: moderateScale(3),
  },
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
  content:{
    marginTop:moderateScale(10)
  }
});

export default AppointmentContent;
