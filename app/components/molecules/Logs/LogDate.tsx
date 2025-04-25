import React from 'react';
import {View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../themev1';
import {Sublabel} from '../../atoms/SubLabel';
const LogDate = (props: any) => {
  return (
    <View style={styles.Logtitle}>
      <MaterialCommunityIcons
        name={'circle'}
        color={colors.primary}
        size={7}
        style={{marginRight: moderateScale(6)}}
      />
      <Sublabel
        size={'small'}
        fontWeight={'bold'}
        fontStyle={'normal'}
        title={props.date}
        color={colors.GRey800}
        align={undefined}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  Logtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Adjust the margin as per your requirement
  },
});

export default LogDate;
