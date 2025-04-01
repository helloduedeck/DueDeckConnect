import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../themev1';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Button from '../button/Button';

export type IProps = {
  label?: string;
  onPress?: () => void;
  amount?: number;
  details?: any;
  disabled?: boolean;
};

const PaymentLedger: React.FC<IProps> = ({onPress, disabled = false}) => {
  return (
    <View>
      <Button
        disabled={disabled}
        label={'Ledger'}
        onPress={onPress}
        leftIcon={'file-pdf'}
        isExtraSmall
        labelStyle={styles.labelStyle}
        containerStyle={styles.button}
        isOutlined
      />
    </View>
  );
};
export default PaymentLedger;

const styles = ScaledSheet.create({
  labelStyle: {
    flex: 1,
    paddingHorizontal: moderateScale(1, 0.25),
    paddingVertical: moderateScale(3),
    fontWeight: '600',
    color: colors.primary,
  },
  button: {
    marginTop: moderateScale(2),
    marginEnd: moderateScale(5, 0.25),
    flexShrink: 1,
    backgroundColor: colors.date,
    width: moderateScale(70),
    height: moderateScale(25),
    borderColor: colors.date,
    borderRadius: 2,
  },
});
