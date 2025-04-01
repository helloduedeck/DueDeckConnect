import React from 'react';
import {View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {AppointmentStatusPropsType} from '../../../types/components';
import {colors} from '@theme';
import {Sublabel} from '@components/atoms/Labels';

const AppointmentStatus = (props: AppointmentStatusPropsType) => {
  const { status } = props;
  let icon = 'close-circle';
  let iconColor = colors.red;
  let labelText = status;
  let labelColor = colors.red;

  if (status === 'Scheduled' || status === 'scheduled') {
    icon = 'calendar';
    iconColor = colors.semblue
    labelText = 'Scheduled';
    labelColor = 'blue';
  } else if (status === 'Pending' || status === 'pending') {
    icon = 'clock';
    iconColor = colors.semorange
    labelText = 'Pending';
    labelColor = colors.semorange
  } else if (status === 'Rejected' || status === 'rejected') {
    icon = 'cancel';
    iconColor = colors.gray
    labelText = 'Rejected';
    labelColor = colors.gray
  } else if (status === 'Accepted' || status === 'accepted') {
    icon = 'check-all';
    iconColor = colors.SemGreen500;
    labelText = 'Accepted';
    labelColor = colors.SemGreen500;
  }

  

  const capitalizeLetter=(string:any)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, {backgroundColor: iconColor}]}>
        <MaterialCommunityIcons name={icon} color={colors.white} size={8} />
      </View>
      <View style={styles.date}>
        <Sublabel
          size={'exsmall'}
          fontWeight={'semibold'}
          title={capitalizeLetter(labelText)}
          color={labelColor}
          fontStyle={'normal'}
          align={undefined}
        />
      </View>
    </View>
  );
};

export default AppointmentStatus;

const styles = ScaledSheet.create({
  container: {
    height: moderateScale(20),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    marginLeft: moderateScale(4),
  },
  iconContainer: {
    width: moderateScale(9),
    height: moderateScale(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
