import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import { CountDownTimer, OTPInput} from '../components';
import {colors} from '../../../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
// import api from '../../../ClientScreens/services';
import {moderateScale} from 'react-native-size-matters';
import ROUTES from '@routes/routes';
import AuthContainer from '@components/templates/AuthContainer';
import OTPInput from '@components/organisms/OTPInput';
import {toast} from '@utils';
import Icon from '@components/atoms/Icon';
import fontsize from '@theme/fontstyle';
import {useRequestOtpMutation, useVerifyOtpMutation} from '@api/auth.api';
import ButtonComponent from '@components/atoms/Buttons/ButtonComponent';

const HEADING = 'Enter 4 digit recovery code';
const SUB_HEADING =
  'The recovery code was sent to your Mobile number/\nEmail address. Please enter the code';

const VerifyOTP = () => {
  const refTimer = useRef<any>();
  const [isTimerEnd, setTimerEnd] = useState(false);
  const navigation = useNavigation<any>();
  const otpData: any = useRoute().params;
  const [otpvalue, setOtpvalue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [requestOtp] = useRequestOtpMutation();

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setTimerEnd(true);
    }, 8000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [isTimerEnd]); // Empty dependency array ensures the effect runs only once

  const onOTPEnter = (otp: any) => {
    setOtpvalue(otp);
  };

  const onResendOTPPress = async () => {
    setLoading(true);
    setTimerEnd(false);
    await requestOtp(otpData)
      .unwrap()
      .then(data => {
        if (data.status == 200) {
          // refTimer.current?.resetTimer();
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

    if (!otpvalue.trim().length || otpvalue.trim().length !== 4) {
      toast.failure('Please enter valid OTP');
      setLoading(false);
      return;
    }

    let reqData: any = {
      otp: otpvalue,
    };

    if (otpData.email) {
      reqData.email = otpData.email;
    }

    if (otpData.contact_no) {
      reqData.contact_no = otpData.contact_no;
    }
    await verifyOtp(reqData)
      .unwrap()
      .then(data => {
        if (data.status == 200) {
          navigation.push(ROUTES.RESETPASSWORD, {
            ...otpData,
            otp: otpvalue,
          });
        } else {
          if (data?.message) {
            toast.failure(data?.message);
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
      button={{
        label: 'Verify',
        onPress: onVerifyOTPPress,
        isLoading: false,
      }}
      heading={HEADING}
      subHeading={SUB_HEADING}
      isResendOTP={true}
      isResendOTPEnable={isTimerEnd}
      onResendOTPPress={onResendOTPPress}
      isSemiBold={false}>
      <View style={styles.counterContainer}>
        {/* <Icon name="Stopwatch" size={28} /> */}
        {/* <CountDownTimer
          ref={refTimer}
          timerCallback={timerCallbackFunc}
          containerStyle={styles.stopwatchContainer}
          textStyle={styles.stopWatchText}
        /> */}
      </View>
      <OTPInput onChange={onOTPEnter} digits={4} />

      <ButtonComponent
        label={'Verify'}
        onPress={onVerifyOTPPress}
        containerStyle={{marginVertical: moderateScale(10), marginTop: 20}}
      />
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
});
