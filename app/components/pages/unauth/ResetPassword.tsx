import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '@components/text/Text';

// import api from '../../services';
import {useNavigation, useRoute} from '@react-navigation/native';
import {toast} from '../../../utils';
import Input from '@components/molecules/Input/Input';
import AuthContainer from '@components/templates/AuthContainer';
import ROUTES from '@routes/routes';
import fontsize from '../../../themev1/fontstyle';
import colors from '../../../themev1/colors';
import {moderateScale} from 'react-native-size-matters';
import Button from '@components/atoms/button/Button';
import {
  useResetPasswordMutation,
  useUpdateForgotPasswordMutation,
} from '@api/auth.api';
import {useAppDispatch, useAppSelector} from '@hooks/redux_hooks';
import {reduxStorage} from '@store/storage';
import local from '@store/local';
import {clearUser} from '@store/slices/userSlice';

const HEADING = 'Please create new password.';

const ResetPassword = () => {
  const userProfileData = useAppSelector(state => state?.user?.user);

  const [isSecureTextEntry, setSecureTextEntry] = useState(true);
  const [isSecureTextEntryConfirmPassword, setSecureTextEntryConfirmPasword] =
    useState(true);
  const [isSecureTextEntryCurrentPassword, setSecureTextEntryCurrentPasword] =
    useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<any>();
  const otpData: any = useRoute().params;
  const [isLoading, setLoading] = useState(false);

  const [resetPassword] = useResetPasswordMutation();
  const [updateForgotPassword] = useUpdateForgotPasswordMutation();
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
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

  const doLogout = () => {
    local.clearAll();
    dispatch(clearUser());
    reduxStorage.clearAll();
    navigation.replace(ROUTES.LOGIN);
  };

  const checkPassword = (str: string) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return re.test(str);
  };

  /**
   * @param {string} value: passwordValue
   */
  const checkPasswordValidity = (value: string) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return 'Password must contain at least one Special Symbol.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    return null;
  };

  const onResetPasswordPress = async () => {
    setIsDisabled(true);
    
    setTimeout(() => {
      setIsDisabled(false);
    }, 7000); 
    if (!otpData?.otp && !currentPassword) {
      toast.failure('Please enter current password');
      setIsDisabled(true);
      return;
    }

    if (!password) {
      toast.failure('Please enter valid new password');
      setIsDisabled(true);
      return;
    }

    const message = checkPasswordValidity(password);

    if (message) {
      toast.failure(message);
      return;
    }
    if (!confirmpassword) {
      toast.failure('Please enter valid confirm password');
      return;
    }

    if (password != confirmpassword) {
      toast.failure("Password doesn't match");
      return;
    }

    console.log('otpData?.otp-- ', otpData?.otp);
    setIsDisabled(true);

    setLoading(true);
    if (otpData?.otp) {
      const reqData = {
        newpassword: password,
        confirmpassword: confirmpassword,
        email: otpData.email,
        otp: otpData.otp,
        contact_no: otpData.contact_no,
      };

      await updateForgotPassword(reqData)
        .unwrap()
        .then(data => {
          if (data?.success) {
            toast.success(data?.message);
            doLogout();
          } else {
            toast.failure(data?.message ?? 'Something went wrong!!!');
          }
        })
        .finally(() => {
          setLoading(false);
          setIsDisabled(false);
         

        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    } else {
      const reqData = {
        currentpassword: currentPassword,
        newpassword: password,
        confirmpassword: confirmpassword,
        email: userProfileData?.data?.email,
      };
      try {
        await resetPassword(reqData)
          .unwrap()
          .then(data => {
            if (data?.success) {
              toast.success(data?.message);
              doLogout();
            } else {
              toast.failure(data?.message ?? 'Something went wrong!!!');
            }
          })
          .finally(() => {
            setLoading(false);
            setIsDisabled(false);
           

          })
          .catch(e => {
            console.log('ERROR PENDING LIST', e);
          });
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const onToggleSecureText = () => {
    setSecureTextEntry(c => !c);
  };
  const onToggleSecureTextConfirmPassword = () => {
    setSecureTextEntryConfirmPasword(c => !c);
  };
  const onToggleSecureTextCurrentPassword = () => {
    setSecureTextEntryCurrentPasword(c => !c);
  };

 
  return (
    <AuthContainer
      Iskeyboardclosed={isKeyboardVisible}
      Inputfocused={isInputFocused}

      button={{
        label: otpData?.otp ? 'Reset Password' : 'Change Password',
        onPress: onResetPasswordPress,
      }}
      isLoading={isLoading}
      heading={(isInputFocused ) ?'':HEADING}
      isSemiBold={false} isDisabled={false} showIcon={true} showLabel={false}>  
      {!otpData?.otp && (
        <Input
          placeholder="Current Password"
          iconLeft="Lock"
          secureTextEntry={isSecureTextEntryCurrentPassword}
          onIconRightPress={onToggleSecureTextCurrentPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          iconRight={isSecureTextEntryCurrentPassword ? 'eyeoff' : 'openeye'}
          onFocus={() => {setIsInputFocused(true),console.log('inputfocused');
          }}
         onBlur={() => setIsInputFocused(false)}

        />
      )}
      <View style={{marginTop:10}}>
      <Input
        placeholder="New Password"
        iconLeft="Lock"
        secureTextEntry={isSecureTextEntry}
        onIconRightPress={onToggleSecureText}
        value={password}
        onChangeText={setPassword}
        iconRight={isSecureTextEntry ? 'eyeoff' : 'openeye'}
        onFocus={() => setIsInputFocused(true)}
         onBlur={() => setIsInputFocused(false)}

      />
      <Input
        placeholder="Confirm Password"
        iconLeft="Lock"
        secureTextEntry={isSecureTextEntryConfirmPassword}
        onIconRightPress={onToggleSecureTextConfirmPassword}
        value={confirmpassword}
        onChangeText={setConfirmPassword}
        iconRight={isSecureTextEntryConfirmPassword ? 'eyeoff' : 'openeye'}
        onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}


      />
      <Button
        label={otpData?.otp ? 'Reset Password' : 'Change Password'}
        onPress={onResetPasswordPress}
        containerStyle={{
          marginVertical: moderateScale(10),
          backgroundColor: colors.primary,
        }}
        disabled={isDisabled}

      />
      </View>
    </AuthContainer>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  text: {
    color: colors.primary,
    fontSize: fontsize.medium,
  },
});
