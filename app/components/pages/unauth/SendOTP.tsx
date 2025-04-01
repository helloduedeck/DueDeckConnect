import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
// import Button from '../../components/atoms/button/ButtonComponent';

const HEADING =
  'Select which contact details should we use to reset your password';

const SendOTP = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [requestOtp] = useRequestOtpMutation();
  const onSendOTPPress = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setLoading(true);
    if (!email.trim().length && !phone.trim().length) {
      toast.failure('Please Enter Email / Mobile No.');
      setLoading(false);
      return;
    }
    if (phone?.trim().length && phone.trim().length < 10) {
      toast.failure('Pleas eneter valid phone number');
      return;
    }
    if (!phone.trim().length && !emailRegex.test(email)) {
      toast.failure('Invalid Email Address.');
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
          navigation.push(ROUTES.VERIFYOTP, reqData);
        } else {
          if (data?.message) {
            toast.failure(data?.message);
          }
        }
      })
      .finally(() => {})
      .catch(error => {
        console.log('SEND OTP ERROR', error);
      });
    setLoading(false);
  };

  return (
    <AuthContainer
      button={{
        label: 'Send OTP',
        onPress: onSendOTPPress,
        isLoading: isLoading,
      }}
      subHeading={HEADING}
      isSemiBold={false}>
      <Input
        placeholder="Contact Number"
        iconLeft={'mail'}
        keyboardType="phone-pad"
        value={phone}
        label="Via SMS"
        onChangeText={setPhone}
      />
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <View style={styles.or}>
          <Text style={styles.orText} isBold={true}>
            OR
          </Text>
        </View>
      </View>
      <Input
        placeholder="Email Address"
        iconLeft={'mail'}
        keyboardType="email-address"
        value={email}
        label="Via Email"
        onChangeText={setEmail}
      />
      <ButtonComponent
        label={'Send OTP'}
        onPress={onSendOTPPress}
        containerStyle={{marginVertical: moderateScale(10)}}
      />
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
