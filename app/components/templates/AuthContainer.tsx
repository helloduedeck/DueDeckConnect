import { Dimensions, Platform, Pressable, StatusBar, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import { colors } from '../../themev1';
import fontsize from '../../themev1/fontstyle';
import { Logo } from '../atoms/Logo';
import { Label } from '../atoms/Label';
import { Sublabel } from '../atoms/SubLabel';
import ContentW from '@components/content/ContentW';
import CustomHeaderW from '@components/organisms/Headers/CustomHeaderW';
import LOGOwhite from '@components/atoms/Logo/LogoWhite';
// import fontsize from '../../../../theme/fontstyle';
type IProps = {
  isFailed?: boolean;
  isLoading?: boolean;
  isResendOTP?: boolean;
  isResendOTPEnable?: boolean;
  isSemiBold: boolean;
  isDisabled: boolean
  onResendOTPPress?: () => void;
  children?: any;
  heading?: string;
  subHeading?: string;
  showIcon: any,
  showLabel: any
  button?: {
    label: string;
    onPress: () => void;
    isLoading?: boolean;
  };
  Inputfocused: any;
  Iskeyboardclosed: any;
};

const COPY_RIGTH_NOTE =
  'Copyright© 2024 Eligo Apptech Private Limited.\nAll Rights Reserved.';

const AuthContainer: React.FC<IProps> = ({
  children,
  isFailed,
  isLoading,
  button,
  heading,
  subHeading,
  isResendOTP,
  isResendOTPEnable,
  onResendOTPPress,
  isDisabled,
  isSemiBold,
  showIcon,
  showLabel,
  Inputfocused,
  Iskeyboardclosed

}) => {
  const [showLoader, setShowLoader] = useState(false);
  const [otpvalue, setOtpvalue] = useState('');

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  console.log(width, height, 'devicesssss')
  useEffect(() => {
    setShowLoader(isLoading ?? false);
  }, [isLoading]);

  const styles = ScaledSheet.create({
    btnContainerStyle: {
      height: verticalScale(40),
    },
    headingContainer: {
      alignItems: 'center',
      width: width * 0.85,
      marginBottom: (height <= 800) ? 250 : 0,
    },
    subheadingContainer: {
      marginTop: moderateScale(30),
      marginBottom: (height <= 800) ? 50 : 0,
      alignItems: 'center',
      width: width * 0.670,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      lineHeight: moderateScale(350),
    },
    heading: {
      fontSize: fontsize.large,
      textAlign: 'center',
    },
    subheading: {
      textAlign: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    seperator: {
      padding: scale(10),
    },
    iosStatusBar: {
      backgroundColor: colors.white,
    },
    subContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      //flex:0.5
    },
    footerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: moderateScale(10),
    },
    footerNote: {
      textAlign: 'center',
      fontSize: fontsize.medium14,
    },
    cardContainer: {
      marginTop: moderateScale(-60),
      paddingHorizontal: moderateScale(25),
      paddingTop: moderateScale(15),
      width: width * 0.85,
      borderRadius: 10,
      backgroundColor: 'white',
      ...Platform.select({
        ios: {
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),

    },
    resendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(15),
    },
    receivedOtp: {
      color: colors.black,
      fontSize: fontsize.large,
    },
    resend: resendStyle,
  });
  const onOTPEnter = (otp: any) => {
    setOtpvalue(otp);
  };
  return (
    <View style={[styles.container, styles.iosStatusBar]}>
      <View style={styles.iosStatusBar} />
      <SafeAreaView style={styles.container}>
        {showIcon && (
          <View style={{ marginBottom: moderateScale(-10), backgroundColor: colors.primary }}>
            <CustomHeaderW title={undefined} />
          </View>
        )}
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
        <ContentW
          // style={styles.subContainer}
          isFailed={isFailed}
          isLoading={showLoader}>
          <View style={{ backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', height: "45%" }}>
            <View style={{
              backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', height: "50%", marginBottom:
                Inputfocused && Iskeyboardclosed
                  ? moderateScale(
                    height === 780
                      ? 40
                      : height >= 960
                        ? 30
                        : 10
                  )
                  : 0,
            }}>
              <View style={{ marginVertical: moderateScale(10), backgroundColor: 'white', borderRadius: 10, width: moderateScale(130), height: moderateScale(72) }}>
                {/* <Logo style={undefined} size={'large'} /> */}
                <Logo size={'large'} />
                {/* <LOGOwhite/> */}
              </View>
              {/* <Image source={images.Logo} /> */}
              {heading ? (
                <View style={[styles.headingContainer,
                {
                  marginBottom:
                    Inputfocused && Iskeyboardclosed
                      ? moderateScale(
                        height === 780
                          ? 80
                          : height >= 960
                            ? 50
                            : 40
                      )
                      : 0,
                }

                ]}>
                  <Label
                    size={'large'}
                    fontWeight={'bold'}
                    title={heading}
                    color={colors.white}
                  />
                </View>
              ) : null}
              {subHeading ? (
                <View style={styles.subheadingContainer}
                >
                  <Sublabel
                    size={'medium'}
                    fontWeight={'normal'}
                    title={subHeading}
                    color={colors.white}
                    align={'center'}
                    fontStyle={'normal'}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
            <View style={styles.cardContainer}>
              {showLabel && <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: fontsize.medium14, color: colors.Grey600 }}>Enter your email and password to log in</Text>
              </View>}
              {children}
              <View style={styles.seperator} />
              {/* <Button containerStyle={styles.btnContainerStyle} {...button} /> */}
              {isResendOTP ? (
                <View style={styles.resendContainer}>
                  <Text style={styles.receivedOtp}>Didn’t received OTP?</Text>
                  <Pressable
                    onPress={onResendOTPPress}
                    disabled={isDisabled}
                  >
                    <Text style={styles.resend(isResendOTPEnable)}>Resend</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </View>
          <View style={{ backgroundColor: 'white', flex: 1, marginTop: 2 }}>

          </View>
        </ContentW>

      </SafeAreaView>
    </View>
  );
};
const { width } = Dimensions.get('window');

const resendStyle: any = (isEnabled: any) => ({
  fontSize: fontsize.large,
  color: colors.primary,
  paddingStart: 5,
});


export default AuthContainer;
