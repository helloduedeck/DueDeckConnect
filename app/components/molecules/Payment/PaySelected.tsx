import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
// import api from '../../../../../services/api';
import {moderateScale} from 'react-native-size-matters';
import {toast} from '@utils';
import {colors} from '../../../themev1';
import Button from '@components/atoms/button/Button';
import {useCreateInvoiceDebitPaymentMutation} from '@api/payment';

type IProps = {
  amount: any;
  details: any;
  onSuccess: () => void;
};

const PaySelected: React.FC<IProps> = ({amount, details, onSuccess}) => {
  const {selectedBillingFirm, selectedConsultant, selectedOrganization} =
    details?.firmBranchClientData ?? {};
  const [createInvoiceDebitPayment] = useCreateInvoiceDebitPaymentMutation();

  const filterInvoicesByIds = (ids: any, data: any) => {
    return data.filter(
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

  const onPayPress = async () => {
    let invoices = details.invoices;
    let selectedItems = details.selectedItems;
    if (!Number(amount)) {
      toast.failure('Please select valid amount');
      return;
    }
    const roundedAmount = Number(amount.toFixed(2));
    const finalAmount = roundedAmount * 100;
    const options = {
      description: 'Payment Details',
      currency: 'INR',
      key: 'rzp_live_U88cXlzkto7hqh', //'rzp_live_U88cXlzkto7hqh', // Your api key
      amount: finalAmount,

      name: 'Payment Details',
      prefill: {
        email: details.client_email,
        contact: details.client_contact,
        name: details.client_name,
      },
      theme: {color: colors.primary},
    };
    const result = await RazorpayCheckout.open(options);
    console.log(result);
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
    try {
      await createInvoiceDebitPayment(body)
        .unwrap()
        .then(data => {
          if (data?.success) {
            toast.success('Payment of ' + roundedAmount + ' is sucessfull');
            onSuccess();
          } else {
            toast.failure('Payment of ' + roundedAmount + ' is unsucessfull');
          }
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const rupeeSymbol = '\u20B9';
  let payLable = amount ? rupeeSymbol + '' + amount : '';

  return (
    <Button
      onPress={onPayPress}
      label={'Pay ' + payLable}
      containerStyle={{
        marginHorizontal: moderateScale(4),
        marginVertical: moderateScale(14),
      }}
    />
  );
};

export default PaySelected;

const styles = StyleSheet.create({});
