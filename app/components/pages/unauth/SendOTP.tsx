import {Keyboard, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
// import api from '../../../services';
// import Toast from 'react-native-toast-message';
import {moderateScale} from 'react-native-size-matters';
// import Input from '../../components/molecules/Input/Input';
import Text from '@components/text/Text';
import ROUTES from '@routes/routes';
import Input from '@components/molecules/Input/Input';
import AuthContainer from '@components/templates/AuthContainer';
import Button from '@components/atoms/button/Button';
import toast from '@utils/toast';
import {useRequestOtpMutation} from '@api/auth.api';
import ButtonComponent from '@components/atoms/Buttons/ButtonComponent';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
// import Button from '../../components/atoms/button/ButtonComponent';

const HEADING =
  'Enter your email address to reset your password';

const SendOTP = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [requestOtp] = useRequestOtpMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);


  useEffect(() => {
  }, []);
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
  
  const onSendOTPPress = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setLoading(true);
    setIsDisabled(true);
    
    setTimeout(() => {
      setIsDisabled(false);
    }, 7000); // Disable button for 7 seconds

    if (!email.trim().length) {
      toast.failure('Please Enter Email ID.');
      setLoading(false);
      return;
    }
    if (phone?.trim().length && phone.trim().length < 10) {
      toast.failure('Please enter a valid phone number');
      setIsDisabled(false);
      return;
    }
    if (!phone.trim().length && !emailRegex.test(email)) {
      toast.failure('Invalid Email Address.');
      setIsDisabled(true);
      return;
    }
    const reqData = {
      email: email,
      contact_no: phone,
    };

    await requestOtp(reqData)
      .unwrap()
      .then(data => {
        if (data.status == 200) {
          toast.success(data?.message);
          console.log('success' + data?.message);
          navigation.push(ROUTES.VERIFYOTP, reqData);
        } else {
          if (data?.message) {
            toast.failure(data?.message);
            console.log('failed' + data?.message);
          }
        }
      })
      .finally(() => {
        setEmail('');
        setPhone('');
      })
      .catch(error => {
        console.log('SEND OTP ERROR', error);
      });
    setLoading(false);
  };

  return (
    <AuthContainer
      Iskeyboardclosed={isKeyboardVisible}
      Inputfocused={isInputFocused}
      showIcon={true}
      showLabel={true}
      button={{
        label: 'Send OTP',
        onPress: onSendOTPPress,
        isLoading: isLoading,
      }}
      subHeading={isInputFocused && isKeyboardVisible ? '' : HEADING}
      isSemiBold={false} isDisabled={false}>
      {/* <Input
        placeholder="Contact Number"
        iconLeft={'mail'}
        keyboardType="phone-pad"
        value={phone}
        label="Via SMS"
        maxLength={10}
        onChangeText={setPhone}
      /> */}
      {/* <View style={styles.orContainer}>
        <View style={styles.line} />
        <View style={styles.or}>
          <Text style={styles.orText} isBold={true}>
            OR
          </Text>
        </View>
      </View> */}
      <Input
        placeholder="Email Address"
        iconLeft={'mail'}
        keyboardType="email-address"
        value={email}
        label="Via Email"
        onChangeText={setEmail}
        onFocus={() => setIsInputFocused(true)}
        // onBlur={() => setIsInputFocused(false)}
      />
<ButtonComponent label={'Send OTP'} disabled={isDisabled} onPress={onSendOTPPress} containerStyle={{marginVertical:moderateScale(10), backgroundColor: colors.primary,}}/>
      {/* <Button
        label={'Send OTP'}
        onPress={onSendOTPPress}
        containerStyle={{marginVertical: moderateScale(10)}}
      /> */}
    </AuthContainer>
  );
};

export default SendOTP;

const styles = StyleSheet.create({
  orContainer: {
    marginBottom: moderateScale(15),
    marginTop: moderateScale(20),
  },
  line: {
    height: 1,
    backgroundColor: colors.primary,
  },
  or: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: moderateScale(-12),
    backgroundColor: colors.primary,
    padding: moderateScale(5),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    borderRadius: 18,
    
  },
  orText: {
    color: colors.white,
    // alignItems:'center',
    // textAlign:'center'
  },
});
