import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import { CountDownTimer, OTPInput} from '../components';
import {colors} from '../../../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
// import api from '../../../ClientScreens/services';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import ROUTES from '@routes/routes';
import AuthContainer from '@components/templates/AuthContainer';
import OTPInput from '@components/organisms/OTPInput';
import {toast} from '@utils';
import Icon from '@components/atoms/Icon';
import fontsize from '@theme/fontstyle';
import {useRequestOtpMutation, useVerifyOtpMutation} from '@api/auth.api';
import Button from '@components/atoms/button/Button';

const HEADING = 'Enter 4 digit recovery code';
const SUB_HEADING =
  'The recovery code was sent to your\nEmail address. Please enter the code';

const VerifyOTP = () => {
  const refTimer = useRef<any>();
  const [isTimerEnd, setTimerEnd] = useState(false);
  const navigation = useNavigation<any>();
  const otpData: any = useRoute().params;
  const [otpvalue, setOtpvalue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [requestOtp] = useRequestOtpMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOTPFocused, setIsOTPFocused] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);



  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // State for keyboard visibility

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onOTPEnter = (otp: any) => {
    setOtpvalue(otp);
  };

  const onResendOTPPress = async () => {
    console.log("OTPPPPDDDD");
    setLoading(true);
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000); 
 
    // toast.success('please wait...');
    await requestOtp(otpData)
      .unwrap()
      .then(data => {
        if (data.status == 200) {
          toast.success(data?.message);
         
          // refTimer.current?.resetTimer();
        }else{
          toast.failure(data?.message);
          
          console.log('failed'+data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(error => {
        console.log('SEND OTP ERROR', error);
      });
  };

  const onVerifyOTPPress = async () => {
    setLoading(true);
    setIsDisabled(true);
    
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000); 

    if (!otpvalue.trim().length || otpvalue.trim().length !== 4) {
      toast.failure('Please enter valid OTP');
      setLoading(false);
      return;
    }

    let reqData: any = {
      otp: otpvalue,
      email: otpData.email,
      contact_no: otpData.contact_no
    };

    if (otpData.email) {
      reqData.email = otpData.email;
    }

    if (otpData.contact_no) {
      reqData.contact_no = otpData.contact_no;
    }

    console.log("reqDataaaa"+JSON.stringify(reqData));

    await verifyOtp(reqData)
      .unwrap()
      .then(data => {
        if (data.status == 200) {
          toast.success(data?.message);
          console.log('suceess '+data?.message)
          navigation.push(ROUTES.RESETPASSWORD, {
            ...otpData,
            otp: otpvalue,
          });
        } else {
          if (data?.message) {
            toast.failure(data?.message);
            console.log('failed '+data?.message)
          }
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(e => {
        console.log('ERROR VERIFY OTP', e);
      });
  };

  const timerCallbackFunc: any = (
    timerFlag: boolean | ((prevState: boolean) => boolean),
  ) => {
    setTimerEnd(timerFlag);
  };

  return (
    <AuthContainer
    Iskeyboardclosed={isKeyboardVisible}
    Inputfocused={isOTPFocused}
    showIcon={true}
    showLabel={false}
      button={{
        label: 'Verify',
        onPress: onVerifyOTPPress,
        isLoading: false,
      }}
      heading={HEADING}
      subHeading={isOTPFocused && isKeyboardVisible ? '':SUB_HEADING}
      isResendOTP={true}
      isResendOTPEnable={!isDisabled}
      onResendOTPPress={onResendOTPPress} 
      isDisabled={isDisabled}
      isSemiBold={false}
      >
      <View style={styles.counterContainer}>
        {/* <Icon name="Stopwatch" size={28} /> */}
        {/* <CountDownTimer
          ref={refTimer}
          timerCallback={timerCallbackFunc}
          containerStyle={styles.stopwatchContainer}
          textStyle={styles.stopWatchText}
        /> */}
      </View>
      <OTPInput onChange={onOTPEnter} digits={4}   
        onFocus={() => setIsOTPFocused(true)}
     onBlur={() => {}}
    />
        <View style={{marginTop:moderateScale(40)}}>
          <TouchableOpacity>
          <Button containerStyle={styles.btnContainerStyle} label={'Verify OTP'} isExtraSmall labelStyle={{color:colors.white}} onPress={onVerifyOTPPress}
          isLoading={isLoading}  disabled={isDisabled} />
          </TouchableOpacity>
        </View>
    </AuthContainer>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  counterContainer: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stopwatchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: moderateScale(5),
  },
  stopWatchText: {
    fontSize: fontsize.xlarge,
    color: colors.primary,
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  btnContainerStyle: {
    height: verticalScale(40),
    backgroundColor:colors.primary
  },
});
