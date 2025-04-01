import {useTokenMutation} from '@api/auth.api';
import CheckBox from '@components/atoms/CheckBox/CheckBox';
import Input from '@components/molecules/Input/Input';
import AuthContainer from '@components/templates/AuthContainer';
import Text from '@components/text/Text';
import {useAppDispatch} from '@hooks/redux_hooks';
import {ROUTES} from '@routes';
import local from '@store/local';
import {setUserCredentials} from '@store/slices/userSlice';
import {reduxStorage} from '@store/storage';
import colors from '../../../themev1/colors';

import toast from '@utils/toast';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import fontsize from '../../../themev1/fontstyle';
import Button from '@components/atoms/button/Button';
import {
  setActiveBillingFirm,
  setActiveBillingFirmPaymentStatus,
  setActiveBranch,
  setActiveClient,
  setActiveFYears,
} from '@store/slices/dashboardSlice';

const Login = ({navigation}: any) => {
  const [token] = useTokenMutation();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);
  const [isRememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  // const emailRegex = /^[\w-]+(\.[\w-]+)*@([gmail]+)\.([com]+)(\.[a-z]{2,})?$/;
  const clearTimeout = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };
  const onLoginPress = async () => {
    // Alert.alert('Please enter valid email id')
    // disptach(actions.dashboard.setActiveAlert(OVERDUE));
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email) {
      setErrorMessage('Please Enter Email Address.');
      clearTimeout();
      return;
    } else {
      setErrorMessage('');
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid Email Address.');
      clearTimeout();
      return;
    } else {
      setErrorMessage('');
    }
    if (!password) {
      setErrorMessage('Please enter Password.');
      clearTimeout();

      return;
    }
    if (password.length <= 8) {
      setErrorMessage('Password must be greater than 8 charecters.');
      clearTimeout();

      return;
    } else {
      setErrorMessage('');
      setIsLoading(true);
      await token({email: email, password: password})
        .unwrap()
        .then(async data => {
          console.log(data, 'emailshhhhh');
          if (data?.success) {
            await reduxStorage.setItem(
              'USERDETAILS',
              JSON.stringify(data?.data),
            );
            // api.apiConfig.setToken(data?.data?.token);
            //local.store(local.keys.AUTH, {email: email, password: password});
            // callback && callback();
            dispatch(setActiveBranch(data?.data?.consultant));
            dispatch(setActiveClient(data?.data?.client));
            dispatch(setActiveBillingFirm(data?.data?.billingfirm_id));
            dispatch(setActiveBillingFirmPaymentStatus(data?.data?.billingfirm_payment_status));
            dispatch(setActiveFYears(data?.data?.financial_year));

            local.store(local.keys.GPANEL_FYEAR, data?.data?.financial_year);
            local.store(local.keys.GPANEL_CLIENT, data?.data?.client);
            local.store(
              local.keys.GPANEL_BILLING_FIRM,
              data?.data?.billingfirm_id,
            );
            local.store(local.keys.GPANEL_CONSULTATNT, data?.data?.consultant);
            dispatch(setUserCredentials(data?.data));
          } else {
            //toast.failure()
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          setErrorMessage(e.data?.data?.error ?? 'Invalid Credentails');
          clearTimeout();
          //toast.failure(e.data?.data?.error ?? 'Invalid Credentails');
          console.log('ERROR WHILE LOGIN', e);
        });
      if (isRememberMe) {
        local.store(local.keys.AUTH, {email: email, password: password});
      }
      console.log('LOGIN ATTEMPT');
      // disptach(actions.user.onLogin(reqData));
    }
  };

  // const validateEmail = (email: string) => {
  //   return String(email)8
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };

  const onToggleSecureText = () => {
    setSecureTextEntry(c => !c);
  };

  const onRememberMeToggle = () => {
    setRememberMe(c => !c);
  };

  const onForgotPasswordPress = () => {
    navigation.navigate(ROUTES.SENDOTP);
  };

  const otpLoginFlow = () => {
    navigation.navigate(ROUTES.VERIFYOTP);
  };

  return (
    <AuthContainer
      button={{
        label: 'Login',
        onPress: onLoginPress,
        isLoading: isLoading,
      }}
      isSemiBold={false}
      heading="Welcome Back!"
      subHeading="Manage Your Compliance On Fingertips & Stay Connected With Your Consultants">
      <Input
        placeholder="Email Address"
        iconLeft={'mail'}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        iconLeft="lock"
        secureTextEntry={isSecureTextEntry}
        onIconRightPress={onToggleSecureText}
        value={password}
        onChangeText={setPassword}
        iconRight={isSecureTextEntry ? 'eyeoff' : 'openeye'}
      />
      <View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
      <Button
        label={'Login'}
        onPress={onLoginPress}
        containerStyle={{marginVertical: moderateScale(10)}}
      />

      <View style={styles.bottomContainer}>
        <View>
          <CheckBox
            label="Remember Me"
            isSelected={isRememberMe}
            onPress={onRememberMeToggle}
          />
        </View>
        <View>
          <Pressable onPress={onForgotPasswordPress}>
            <Text style={styles.text}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    </AuthContainer>
  );
};
const styles = ScaledSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(8, 0.3),
    paddingTop: moderateScale(10, 0.3),
  },
  text: {
    color: colors.primary,
    fontSize: fontsize.medium,
  },
  errorMessage: {
    fontSize: fontsize.medium10,
    color: colors.darkred,
    textAlign: 'center',
    margin: moderateScale(6),
    padding: moderateScale(6),
    backgroundColor: `${colors.darkred}10`,
    borderRadius: 4,
  },
  remberMeContainer: {},
});

export default Login;
