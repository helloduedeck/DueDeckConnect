import React from 'react';
import {Alert, Platform, TouchableOpacity, View} from 'react-native';

import {
  ScaledSheet,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {colors} from '../../../themev1';
import PayButton from '@components/atoms/Payment/PayButton';
import PaymentAmount from '@components/molecules/Payment/PaymentAmount';
import PaymentLedger from '@components/atoms/Payment/PaymentLedger';
import {useAppSelector} from '@hooks/redux_hooks';
import SubLabel from '../../atoms/Labels/SubLabel';
import FeeDue from '@components/atoms/Payment/FeeDue';
import Sublabel from '@components/atoms/SubLabel/SubLabel';
import {Label} from '@components/atoms/Label';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@components/atoms/button/Button';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@routes';
import {useCreateReceiptMutation} from '@api/payment';
import {toast} from '@utils';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentBoard = () => {
  const paymentData = useAppSelector(state => state?.dashboard.paymentSection);
  const activeBillingFirmPaymentStatus = useAppSelector(
    state => state?.dashboard.activeBillingFirmPaymentStatus,
  );
  const userProfileData = useAppSelector(state => state?.user?.user);
  const activeBillingFirm = useAppSelector(
    state => state?.dashboard?.activeBillingFirm,
  );
  const activeClient = useAppSelector(state => state?.dashboard?.activeClient);
  const activeBranch = useAppSelector(state => state?.dashboard?.activeBranch);
  const [createReceipt] = useCreateReceiptMutation();
  const navigation = useNavigation();
  const onLedgerButtonPress = () => {
    console.log('ONLEDGER PRESS');
    //enable this below code once packageStatus is clear
    // if (!packageStatus) {
    //   toast.failure("You don't have any active plan");
    //   return;
    // }

    // const selectedFYearId = globalPanelFyears.filter((item: any) => {
    //   return item.fyear == activeFinancialYearPayment;
    // });

    // console.log('reqData', reqData);
    // client_id
    navigation.navigate(ROUTES.PAYMENTDOC, {reqData: {}, route: 'Ledger'});
  };

  const handlePress = () => {
    navigation.navigate(ROUTES.PAYMENTS); // Navigate to the 'Payment' screen
  };
  return (
    <View style={styles.container}>
      {paymentData && (
        <>
          <View style={styles.paymenttitle}>
            <View style={styles.fee}>
              <SubLabel
                size={'medium'}
                fontWeight={'semibold'}
                title={paymentData['section-title']}
                color={colors.GRey800}
                fontStyle={'normal'}
                align={undefined}
              />
            </View>
            <View style={styles.viewpay}>
              <TouchableOpacity onPress={handlePress}>
                <SubLabel
                  size={'small'}
                  fontWeight={'bold'}
                  title={paymentData['section-button-all']}
                  color={colors.primary}
                  fontStyle={'normal'}
                  align={undefined}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.paycontent}>
            <PaymentAmount amount={paymentData.fees} />
            <View style={styles.paybtn}>
              <View style={styles.paycontainer}>
                <PayButton
                  amount={Number(
                    Math.ceil(paymentData.fees?.replace(/,/g, '') * 100) / 100, //as fees containes, it shows errors while pay ,so remove comma from fees
                  )}
                  onPress={async () => {
                    try {
                      if (
                        !Number(
                          Math.ceil(paymentData.fees?.replace(/,/g, '') * 100) /
                            100, //as fees containes, it shows errors while pay ,so remove comma from fees
                        )
                      ) {
                        toast.failure('Please select a valid amount');
                        return;
                      }

                      const roundedAmount = Number(
                        Math.ceil(paymentData.fees?.replace(/,/g, '') * 100) /
                          100, //as fees containes, it shows errors while pay ,so remove comma from fees
                      ).toFixed(2);
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
                        client_id: activeClient.id,
                        branch_id: activeBranch.id,
                        firm_id: activeBillingFirm,
                        amount: roundedAmount,
                        transaction_no: result.razorpay_payment_id,
                      };
                      console.log('Payment Successful');
                      console.log(body);
                      await createReceipt(body)
                        .unwrap()
                        .then(data => {
                          console.log('Payment Successful');
                          if (data?.success) {
                            toast.success(
                              'Payment of ' + roundedAmount + ' is sucessful',
                            );
                          } else {
                            toast.failure(
                              'Payment of ' + roundedAmount + ' is unsucessful',
                            );
                          }
                        });
                    } catch (error) {
                      console.log(error);
                      toast.failure(
                        error?.error?.description ??
                          'User Cancelled the payment',
                      );
                    }
                  }}
                  details={undefined}
                  disabled={false}
                />
              </View>
              <View style={styles.ledger}>
                <PaymentLedger onPress={onLedgerButtonPress} />
              </View>
            </View>
          </View>
        </>
      )}

      {/* empty paymentboard */}
      {!paymentData && (
        <View>
          <View style={styles.paymenttitle}>
            <View style={styles.fee}>
              <FeeDue />
            </View>
            <View style={styles.viewpay}>
              <View style={{flexDirection: 'row'}}>
                <Sublabel
                  size={'small'}
                  fontWeight={'bold'}
                  fontStyle={'normal'}
                  title={'*'}
                  color={colors.red}
                  align={undefined}
                />
                <Sublabel
                  size={'small'}
                  fontWeight={'semibold'}
                  fontStyle={'normal'}
                  title={'Select Billing Firm'}
                  color={colors.Grey600}
                  align={undefined}
                />
              </View>
            </View>
          </View>

          <View style={styles.paycontent}>
            <View style={styles.payment}>
              <Icon
                size={18}
                name="rupee"
                color={colors.logicon}
                style={styles.icon}
              />
              <View>
                <Label
                  size={'large'}
                  fontWeight={'bold'}
                  title={'0'}
                  color={colors.logicon}
                  align={undefined}
                />
              </View>
            </View>
            <View style={styles.paybtn}>
              <View style={styles.paycontainer}>
                <Button
                  label={'Pay'}
                  isExtraSmall
                  disabled
                  onPress={() => {}}
                  containerStyle={styles.btnContainer}
                  labelStyle={styles.btnLabel}
                />
              </View>
              <View style={styles.ledger}>
                <Button
                  label={'Ledger'}
                  //   onPress={onLedgerPress}
                  leftIcon={'file-pdf'}
                  isExtraSmall
                  labelStyle={styles.labelStyle}
                  containerStyle={styles.button}
                  isOutlined
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    padding: moderateScale(16),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    marginVertical: moderateScale(3),
    width: moderateScale(343),
    height: moderateScale(103),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    // Add container styles if needed
  },
  paymenttitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Adjust padding as needed
  },
  paycontent: {
    flexDirection: 'row',
    marginVertical: moderateScale(20),
    justifyContent: 'space-between',
  },
  viewpay: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: moderateScale(4),
  },
  fee: {
    flex: 1,
  },

  paybtn: {
    flexDirection: 'row',
  },
  ledger: {
    marginLeft: moderateVerticalScale(8),
  },
  paycontainer: {
    marginVertical: moderateScale(2),
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: moderateScale(3),

    // alignItems:'center'
  },
  btnContainer: {
    width: moderateScale(41),
    height: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 2,
    flexShrink: 1,
    backgroundColor: colors.paymentbg,
    borderColor: colors.strokeW,
  },
  btnLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
  labelStyle: {
    flex: 1,
    paddingHorizontal: moderateScale(1, 0.25),
    paddingVertical: moderateScale(3),
    fontWeight: '600',
    color: colors.payment,
  },
  button: {
    marginTop: moderateScale(4),
    marginEnd: moderateScale(5, 0.25),
    flexShrink: 1,
    backgroundColor: colors.paymentbg,
    width: moderateScale(70),
    height: moderateScale(25),
    borderColor: colors.logicon,
    borderRadius: 2,
  },
});
export default React.memo(PaymentBoard);
