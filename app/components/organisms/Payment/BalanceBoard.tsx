import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import Button from '../../components/atoms/button/ButtonComponent';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../../themev1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PayButton from '../../atoms/Payment/PayButton';
import PaymentLedger from '../../atoms/Payment/PaymentLedger';
import {Sublabel} from '../../atoms/SubLabel';
import Popover from 'react-native-popover-view';
import {Label} from '../../atoms/Label';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'react-native-paper';
import PaymentAmount from '@components/molecules/Payment/PaymentAmount';
import {Platform} from 'react-native';
import InvoicesList from './InvoiceListBottomSheet';
import fontsize from '../../../themev1/fontstyle';
import {useAppSelector} from '@hooks/redux_hooks';
import {toast} from '@utils';
import RazorpayCheckout from 'react-native-razorpay';
import {useCreateReceiptMutation} from '@api/payment';
const BalanceBoard = ({
  openingbalance = 0,
  balancelimit = 0,
  creditlimit = 0,
  paymentreceivable = 0,
  onLedgerPress = () => {},
}) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [isOutstandingModalVisible, setOutstandingModalVisible] =
    useState(false);
  const [isOtherAmountModalVisible, setOtherAmountModalVisible] =
    useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [enteredOthermount, setenteredOthermount] = useState('');
  const {activeClient, activeBranch, activeBillingFirm} = useAppSelector(
    (state: any) => state.dashboard,
  );
  const [createReceipt] = useCreateReceiptMutation();
  const userProfileData = useAppSelector(state => state?.user?.user);

  const firmBranchClientData = {
    selectedConsultant: activeBranch?.id,
    selectedOrganization: activeClient?.id,
    selectedBillingFirm: activeBillingFirm,
  };

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const toggleActionSheet = () => {
    setPopoverVisible(false);

    setTimeout(() => {
      setActionSheetVisible(!isActionSheetVisible);
    }, 100);
  };

  const toggleOutstandingModal = () => {
    setOutstandingModalVisible(!isOutstandingModalVisible);
    togglePopover(); // Close the popover
    setOverlayVisible(!isOutstandingModalVisible);
  };

  const toggleOtherAmountModal = () => {
    setOtherAmountModalVisible(!isOtherAmountModalVisible);
    togglePopover(); // Close the popover
    setOverlayVisible(!isOtherAmountModalVisible);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const closeModalAndPopover = () => {
    // togglePopover();
    setOutstandingModalVisible(false);
    setOtherAmountModalVisible(false);
    setOverlayVisible(false);
    setPaymentAmount('');
    setIsFocused(false);
  };

  const handleChangeTextOutstanding = (text: string) => {
    setenteredOthermount(text);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: moderateScale(16),
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column', flex: 0.3}}>
          <Sublabel
            size={'small'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Opening Balance'}
            color={colors.Grey600}
            align={undefined}
          />
          <Label
            size={'small'}
            fontWeight={'bold'}
            title={openingbalance}
            color={colors.GRey800}
            align={undefined}
          />
        </View>

        <View style={{flexDirection: 'column', flex: 0.3}}>
          <Sublabel
            size={'small'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Credit Limit'}
            color={colors.Grey600}
            align={undefined}
          />
          <Label
            size={'small'}
            fontWeight={'bold'}
            title={creditlimit}
            color={colors.GRey800}
            align={undefined}
          />
        </View>

        <View style={{flexDirection: 'column', flex: 0.3}}>
          <Sublabel
            size={'small'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Balance Limit'}
            color={colors.Grey600}
            align={undefined}
          />
          <Label
            size={'small'}
            fontWeight={'bold'}
            title={balancelimit}
            color={colors.GRey800}
            align={undefined}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: moderateScale(16)}}>
        <Sublabel
          size={'small'}
          fontWeight={'bold'}
          fontStyle={'normal'}
          title={'Outstanding'}
          color={undefined}
          align={undefined}
        />
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(16),
          marginBottom: moderateScale(16),
        }}>
        <View style={styles.paycontent}>
          <PaymentAmount amount={paymentreceivable} />
          <View style={styles.paybtn}>
            <TouchableOpacity
              onPress={togglePopover}
              style={[styles.paycontainer, {backgroundColor: colors.primary}]}>
              <PayButton
                onPress={togglePopover}
                amount={0}
                details={undefined}
              />
              <View style={{marginRight: 8}}>
                <FontAwesome name="caret-down" size={15} color="white" />
              </View>
            </TouchableOpacity>
            {isPopoverVisible && (
              <Popover
                isVisible={isPopoverVisible}
                popoverShift={{x: moderateScale(0.12), y: moderateScale(-0.55)}}
                onRequestClose={togglePopover}
                popoverStyle={styles.popover}>
                {/* Content of your popover */}

                <View
                  style={[
                    ,
                    {
                      width: moderateScale(150),
                      // height: moderateScale(150),
                      // paddingStart: moderateScale(20),
                    },
                  ]}>
                  {/* ... (Customize your popover content here) */}
                  <TouchableOpacity onPress={toggleOutstandingModal}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: colors.strokeW,
                        paddingBottom: moderateScale(5),
                        marginBottom: moderateScale(8),
                        marginHorizontal: moderateScale(20),
                      }}>
                      <Sublabel
                        size={'small'}
                        fontWeight={'semibold'}
                        fontStyle={'normal'}
                        title={'Outstanding'}
                        color={colors.GRey800}
                        align={undefined}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={toggleActionSheet}
                    style={{marginBottom: moderateScale(0)}}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: colors.strokeW,
                        paddingBottom: moderateScale(5),
                        // marginBottom: moderateScale(8),
                        marginHorizontal: moderateScale(20),
                      }}>
                      <Sublabel
                        size={'small'}
                        fontWeight={'semibold'}
                        fontStyle={'normal'}
                        title={'Select Invoices'}
                        color={colors.GRey800}
                        align={undefined}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleOtherAmountModal}>
                    <View
                      style={{
                        // borderBottomWidth: 1,
                        // borderColor: colors.strokeW,
                        paddingBottom: moderateScale(2),
                        // marginBottom: moderateScale(8),
                        marginHorizontal: moderateScale(20),
                      }}>
                      <Sublabel
                        size={'small'}
                        fontWeight={'semibold'}
                        fontStyle={'normal'}
                        title={'Other Amount'}
                        color={colors.GRey800}
                        align={undefined}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Popover>
            )}
            {isOutstandingModalVisible && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={isOutstandingModalVisible}
                onRequestClose={closeModalAndPopover}>
                {overlayVisible && (
                  <View style={styles.overlay}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView1}>
                        <View style={styles.outstanding}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Sublabel
                              size={'exsmall'}
                              fontWeight={'semibold'}
                              fontStyle={'normal'}
                              title={'Outstanding Amount'}
                              color={colors.rupee}
                              align={undefined}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <Icon
                              size={16}
                              name="rupee"
                              color={colors.semorange}
                              style={{marginTop: moderateScale(30)}}
                            />
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Label
                                size={'large'}
                                fontWeight={'semibold'}
                                title={'₹ ' + paymentreceivable}
                                color={colors.semorange}
                                align={undefined}
                              />
                            </View>
                          </View>
                        </View>
                        {/* <View style={{alignItems: 'center'}}>
                        <Sublabel
                          size={'small'}
                          fontWeight={'semibold'}
                          fontStyle={'normal'}
                          title={'Enter Payment Amount'}
                          color={colors.GRey800}
                          align={undefined}
                        />
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={{marginRight: moderateScale(3)}}>
                          <Label
                            size={'large'}
                            fontWeight={'semibold'}
                            title={'₹'}
                            color={colors.GRey800}
                            align={undefined}
                          />
                        </View>
                        <View style={{width: '75%', paddingHorizontal: 6}}>
                          <TextInput
                            inputMode="numeric"
                            value={enteredOthermount}
                            editable
                            placeholder=" Enter Amount"
                            maxLength={15}
                            style={{
                              color: colors.GRey800,
                              fontSize: fontsize.xlarge22,
                              fontWeight: '500',
                              // backgroundColor:colors.strokeW,
                              marginHorizontal: 5,
                              paddingHorizontal: 13,
                            }}
                            onChangeText={handleChangeTextOutstanding}
                          />
                        </View>
                      </View> */}
                        <View
                          style={{
                            width: '100%',
                            height: 40,
                          }}>
                          <PayButton
                            label={'Pay ₹ ' + paymentreceivable}
                            containerStyle={{
                              margin: moderateScale(3),
                              width: '100%',
                            }} //paymentData.fees?.replace(/,/g, '')
                            amount={
                              Math.ceil(
                                paymentreceivable?.replace(/,/g, '') * 100,
                              ) / 100
                            }
                            onPress={async () => {
                              try {
                                if (
                                  !Number(
                                    Math.ceil(
                                      paymentreceivable?.replace(/,/g, '') *
                                        100,
                                    ) / 100, //as fees containes, it shows errors while pay ,so remove comma from fees
                                  )
                                ) {
                                  toast.failure('Please select a valid amount');
                                  return;
                                }

                                const roundedAmount = Number(
                                  Math.ceil(
                                    paymentreceivable?.replace(/,/g, '') * 100,
                                  ) / 100, //as fees containes, it shows errors while pay ,so remove comma from fees
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

                                const result = await RazorpayCheckout.open(
                                  options,
                                );

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
                                      closeModalAndPopover();
                                      toast.success(
                                        'Payment of ' +
                                          roundedAmount +
                                          ' is sucessful',
                                      );
                                    } else {
                                      toast.failure(
                                        'Payment of ' +
                                          roundedAmount +
                                          ' is unsucessful',
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
                            details={{
                              undefined,
                              firmBranchClientData,
                            }}
                          />
                        </View>
                        <Pressable
                          style={styles.closeIcon}
                          onPress={closeModalAndPopover}>
                          <MaterialCommunityIcons
                            name="close"
                            size={16}
                            color={colors.black}
                          />
                          {/* <Icon  /> */}
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}
              </Modal>
            )}
            {isOtherAmountModalVisible && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={isOtherAmountModalVisible}
                onRequestClose={closeModalAndPopover}>
                {overlayVisible && (
                  <View style={styles.overlay}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={styles.subOutstanding}>
                          {/* <Text style={{ fontSize: fontsize.medium15, fontWeight: '700', marginTop: moderateScale(10) }}>Other Amount</Text> */}
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Sublabel
                              size={'small'}
                              fontWeight={'semibold'}
                              fontStyle={'normal'}
                              title={'Other Amount'}
                              color={colors.rupee}
                              align={undefined}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                          }}>
                          <Sublabel
                            size={'small'}
                            fontWeight={'semibold'}
                            fontStyle={'normal'}
                            title={'Enter Payment Amount'}
                            color={colors.GRey800}
                            align={undefined}
                          />
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            marginLeft: 30,
                          }}>
                          <Label
                            size={'large'}
                            fontWeight={'semibold'}
                            title={'₹'}
                            color={colors.GRey800}
                            align={undefined}
                          />

                          <TextInput
                            editable
                            placeholder="Enter Amount"
                            maxLength={15}
                            style={{
                              color: colors.GRey800,
                              fontSize: fontsize.xlarge22,
                              fontWeight: '500',
                              width: '60%',
                              alignSelf: 'center',
                              alignItems: 'center',
                            }}
                            inputMode="numeric"
                            value={enteredOthermount}
                            onChangeText={handleChangeTextOutstanding}
                          />
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 40,
                          }}>
                          <PayButton
                            amount={Math.ceil(enteredOthermount * 100) / 100}
                            label={'Pay ₹ ' + enteredOthermount}
                            onPress={async () => {
                              try {
                                if (
                                  !Number(
                                    Math.ceil(
                                      enteredOthermount?.replace(/,/g, '') *
                                        100,
                                    ) / 100, //as fees containes, it shows errors while pay ,so remove comma from fees
                                  )
                                ) {
                                  toast.failure('Please select a valid amount');
                                  return;
                                }

                                const roundedAmount = Number(
                                  Math.ceil(
                                    enteredOthermount?.replace(/,/g, '') * 100,
                                  ) / 100, //as fees containes, it shows errors while pay ,so remove comma from fees
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

                                const result = await RazorpayCheckout.open(
                                  options,
                                );

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
                                      closeModalAndPopover();
                                      toast.success(
                                        'Payment of ' +
                                          roundedAmount +
                                          ' is sucessful',
                                      );
                                    } else {
                                      toast.failure(
                                        'Payment of ' +
                                          roundedAmount +
                                          ' is unsucessful',
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
                            details={{
                              undefined,
                              firmBranchClientData,
                            }}
                          />
                        </View>

                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {isFocused && (
                              <Icon
                                size={15}
                                name="rupee"
                                color={colors.semorange}
                                style={{
                                  marginRight: moderateScale(5),
                                  marginTop: moderateScale(9),
                                }}
                              />
                            )}
                          </View>
                        </View>
                        <Pressable
                          style={styles.closeIcon}
                          onPress={closeModalAndPopover}>
                          <MaterialCommunityIcons
                            name="close"
                            size={16}
                            color={colors.black}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}
              </Modal>
            )}
            <View style={styles.ledger}>
              <PaymentLedger
                onPress={onLedgerPress}
                amount={0}
                details={undefined}
              />
            </View>
          </View>
        </View>
      </View>
      {isActionSheetVisible && (
        <InvoicesList
          isVisible={isActionSheetVisible}
          onClose={toggleActionSheet}
        />
      )}
    </View>
  );
};
export default BalanceBoard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 4,
    marginVertical: moderateScale(16),
    marginHorizontal: moderateScale(16),
  },
  paymenttitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Adjust padding as needed
  },
  paycontent: {
    flexDirection: 'row',
    // marginVertical: moderateScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewpay: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: moderateScale(4),
  },
  fee: {
    flex: 1,
  },
  popoverContent: {
    color: colors.red,
  },

  paybtn: {
    flexDirection: 'row',
  },
  ledger: {
    marginLeft: moderateScale(8),
  },
  paycontainer: {
    flexDirection: 'row',
    marginVertical: moderateScale(2),
    // paddingHorizontal:-2,
    borderRadius: 2,
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  popover: {
    position: 'absolute',
    top: moderateScale(115), // adjust the top position as per your need
    right: 18,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.InputBorder,
    borderWidth: 2,
    paddingVertical: 4,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }), // to make sure popover is above other components
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(22),
  },
  modalView: {
    // margin: 20,
    width: moderateScale(300), // Set a fixed width
    backgroundColor: 'white',
    borderRadius: 5,
    padding: moderateScale(15),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView1: {
    // margin: 20,
    width: moderateScale(295), // Set a fixed width
    // height: moderateScale(244),
    backgroundColor: 'white',
    borderRadius: 5,
    padding: moderateScale(16),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subOutstanding: {
    backgroundColor: colors.grayLight,
    alignItems: 'center',
    marginTop: moderateScale(24),
    marginBottom: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: 4,
  },
  mainOutstanding: {
    // fontSize: fontsize.large,
    color: colors.semorange,
    // fontWeight: '700',
    marginLeft: moderateScale(2),
    marginTop: moderateScale(26),
  },
  mainOutstanding1: {
    fontSize: fontsize.large,
    color: colors.GRey800,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
    zIndex: 1, // Adjust the z-index to ensure it's above other components
  },
  closeIcon: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
  },
  outstanding: {
    padding: moderateScale(8),
    backgroundColor: colors.strokeW,
    marginVertical: moderateScale(22),
    borderRadius: 3,
  },
  popoverItem: {
    borderBottomWidth: 1,
    borderColor: colors.strokeW,
    paddingBottom: moderateScale(5),
    marginBottom: moderateScale(8),
    marginHorizontal: moderateScale(20),
  },

  selectedPopoverItem: {
    backgroundColor: colors.grayLight,
  },
  popoverItem1: {
    paddingBottom: moderateScale(2),
    // marginBottom: moderateScale(8),
    marginHorizontal: moderateScale(20),
  },
});
