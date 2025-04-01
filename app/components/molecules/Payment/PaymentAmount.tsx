import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../themev1';
import Label from '../../atoms/Label/Label';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
const PaymentAmount = (props: any) => {
  return (
    <View style={styles.payment}>
      <Icon size={18} name="rupee" color={colors.rupee} style={styles.icon} />
      <View>
        <Label
          size={'large'}
          fontWeight={'bold'}
          title={props.amount}
          color={colors.semorange}
          align={undefined}></Label>
      </View>
    </View>
  );
};
export default PaymentAmount;
const styles = ScaledSheet.create({
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: moderateScale(3),
  },
});
