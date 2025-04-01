import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Button from '../button/Button';
import {IProps} from './PaymentLedger';
import toast from '@utils/toast';
import {colors} from '@theme';
import {useCreateInvoiceDebitPaymentMutation} from '@api/payment';
import {useAppSelector} from '@hooks/redux_hooks';

const PayButton: React.FC<IProps> = ({
  amount,
  details,
  onPress,
  label,
  disabled = false,
}) => {
  const {selectedBillingFirm, selectedConsultant, selectedOrganization} =
    details?.firmBranchClientData ?? {};
  const userProfileData = useAppSelector(state => state?.user?.user);
  const activeBillingFirmPaymentStatus = useAppSelector(
    state => state?.dashboard.activeBillingFirmPaymentStatus,
  );
  const [createInvoiceDebitPayment] = useCreateInvoiceDebitPaymentMutation();
  const filterInvoicesByIds = (ids: any, data: any) => {
    return data?.filter(
      (item: any) =>
        ids.includes(item.id) &&
        (item.voucher_type == 'Invoice' ||
          item.voucher_type == 'Opening Balance'),
    );
  };

  const filterDebitnoteByIds = (ids: any, data: any) => {
    return data.filter(
      (item: any) => ids.includes(item.id) && item.voucher_type == 'Debit Note',
    );
  };
  const onPay = async () => {
    Alert.alert(
      'Feature Disabled',
      'This feature is disabled. Kindly contact the administrator.',
      [{text: 'OK'}],
    );
  };

  const onPayPress = async () => {
    try {
      let invoices = details?.invoices;
      let selectedItems = details?.selectedItems;

      if (!Number(amount)) {
        toast.failure('Please select a valid amount');
        return;
      }

      const roundedAmount = Number(amount.toFixed(2));
      const options = {
        description: 'Payment Details',
        currency: 'INR',
        key: 'rzp_live_U88cXlzkto7hqh', //'rzp_test_loGomvWSDOcJu0', // Your api key
        amount: roundedAmount * 100,
        name: 'Payment Details',
        prefill: {
          email: userProfileData?.data?.email,
          contact: userProfileData?.data?.contact_no,
          name: userProfileData?.data?.name,
        },
        theme: {color: colors.primary},
      };

      const result = await RazorpayCheckout.open(options);

      const body = {
        client_id: selectedOrganization,
        branch_id: selectedConsultant,
        firm_id: selectedBillingFirm,
        transaction_no: result.razorpay_payment_id,
        selectadjustedinvoices: filterInvoicesByIds(selectedItems, invoices)
          .map((item: any) => item.id)
          .join(','),
        selectadjusteddebitnotes: filterDebitnoteByIds(selectedItems, invoices)
          .map((item: any) => item.id)
          .join(','),
      };

      await createInvoiceDebitPayment(body)
        .unwrap()
        .then(data => {
          if (data?.success) {
            toast.success('Payment of ' + roundedAmount + ' is sucessful');
          } else {
            toast.failure('Payment of ' + roundedAmount + ' is unsucessful');
          }
        });
    } catch (error) {
      toast.failure(error?.error?.description ?? 'User Cancelled the payment');
    }
  };

  return (
    <View>
      <Button
        disabled={disabled}
        label={label ?? 'Pay'}
        isExtraSmall
        onPress={
          activeBillingFirmPaymentStatus != null ? onPress ?? onPayPress : onPay
        } // 7/05/2024 By Ashish U - commented function is not tested properly unit test is yet to be done
        containerStyle={styles.btnContainer}
        labelStyle={styles.btnLabel}
      />
    </View>
  );
};
export default PayButton;

const styles = ScaledSheet.create({
  btnContainer: {
    minWidth: moderateScale(49),
    minHeight: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginHorizontal: 5,
    borderRadius: 2,
    flexShrink: 1,
  },
  btnLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
