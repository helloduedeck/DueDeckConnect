import {Dimensions, Pressable, StatusBar, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {colors} from '../../../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {Button, Content, Text} from '../../../../components';
// import {images} from '../../../../assets';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';
import {colors} from '../../themev1';
import fontsize from '../../themev1/fontstyle';
import {Logo} from '../atoms/Logo';
import {Label} from '../atoms/Label';
import {Sublabel} from '../atoms/SubLabel';
import Content from '@components/content/Content';
import Button from '@components/atoms/button/Button';
// import fontsize from '../../../../theme/fontstyle';
type IProps = {
  isFailed?: boolean;
  isLoading?: boolean;
  isResendOTP?: boolean;
  isResendOTPEnable?: boolean;
  isSemiBold: boolean;
  onResendOTPPress?: () => void;
  children?: any;
  heading?: string;
  subHeading?: string;
  button?: {
    label: string;
    onPress: () => void;
    isLoading?: boolean;
  };
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
  isSemiBold,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(isLoading ?? false);
  }, [isLoading]);

  return (
    <View style={[styles.container, styles.iosStatusBar]}>
      <View style={styles.iosStatusBar} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
        <Content
          style={styles.subContainer}
          isFailed={isFailed}
          isLoading={showLoader}>
          <Logo style={undefined} size={'large'} />
          {/* <Image source={images.Logo} /> */}
          {heading ? (
            <View style={styles.headingContainer}>
              <Label
                size={'large'}
                fontWeight={'bold'}
                title={heading}
                color={colors.GRey800}
              />
            </View>
          ) : null}
          {subHeading ? (
            <View style={styles.subheadingContainer}>
              <Sublabel
                size={'medium'}
                fontWeight={'normal'}
                title={subHeading}
                color={colors.Grey600}
                align={'center'}
                fontStyle={'normal'}
              />
            </View>
          ) : null}
          <View style={styles.cardContainer}>
            {children}
            <View style={styles.seperator} />
            {/* <Button containerStyle={styles.btnContainerStyle} {...button} /> */}
            {isResendOTP ? (
              <View style={styles.resendContainer}>
                <Text style={styles.receivedOtp}>Didn’t received OTP?</Text>
                <Pressable
                  onPress={onResendOTPPress}
                  disabled={!isResendOTPEnable}>
                  <Text style={styles.resend(isResendOTPEnable)}>Resend</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </Content>
        {/* <View style={styles.footerContainer}>
          <Text style={styles.footerNote}>{COPY_RIGTH_NOTE}</Text>
        </View> */}
      </SafeAreaView>
    </View>
  );
};
const {width} = Dimensions.get('window');

const resendStyle: any = (isEnabled: any) => ({
  fontSize: fontsize.large,
  color: isEnabled ? colors.primary : colors.gray,
  paddingStart: 5,
});

const styles = ScaledSheet.create({
  btnContainerStyle: {
    height: verticalScale(40),
  },
  headingContainer: {
    alignItems: 'center',
    width: width * 0.85,
    marginTop: moderateScale(18, 0.3),
  },
  subheadingContainer: {
    alignItems: 'center',
    width: width * 0.604,
    marginTop: moderateScale(10),
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
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
    // marginTop: moderateScale(30),
    paddingHorizontal: moderateScale(25),
    paddingBottom: moderateScale(30),
    paddingTop: moderateScale(15),
    width: width * 0.85,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    // shadowRadius: 12,
    // shadowOpacity: 1,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // elevation: 3,
    // borderColor: 'rgba(246, 246, 246, 1.0)',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: moderateScale(25),
  },
  receivedOtp: {
    color: colors.black,
    fontSize: fontsize.large,
  },
  resend: resendStyle,
});
export default AuthContainer;
