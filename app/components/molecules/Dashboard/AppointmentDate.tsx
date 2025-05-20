import React from 'react';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {AppointmentDatePropsType} from '../../../types/components';
import {colors} from '@theme';
import moment from 'moment';
const AppointmentDate = (props: AppointmentDatePropsType) => {
  let Labelsizes;
  switch (props.size) {
    case 'xxsmall':
      Labelsizes = styles.xxsmall;
      break;
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
  //DO NOT REMOVE DATE FORMAT CODE UNLESS WE GET FORMATTED CODE FROM API
  const appointmentDate = moment(props.title).format('MMM D, YYYY');

  return (
    <View style={styles.container}>
      {/* <Icon name="calendar" size={8}/> */}
      <MaterialCommunityIcons
        name={'calendar-blank-outline'}
        color={colors.primary}
        size={props.iconsize ?? 10}
        style={styles.icon}
      />
      <View>
        <Text style={[Labelsizes, {fontWeight}, {color: props.color}]}>
          {/* {props.title} */}
          {props.isdashboard == true ? props.title : appointmentDate}
        </Text>
      </View>
    </View>
  );
};
export default AppointmentDate;
const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.date,
  },
  date: {
    marginLeft: moderateScale(9),
  },
  icon: {
    marginRight: moderateScale(5),
  },
  xxsmall: {
    fontSize: moderateScale(8),
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
});
