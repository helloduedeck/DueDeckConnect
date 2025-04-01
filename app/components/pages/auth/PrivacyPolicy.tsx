import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../themev1';
import CheckBox from '../../../components/atoms/CheckBox/CheckBox';
import {moderateScale} from 'react-native-size-matters';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import Button from '@components/atoms/button/Button';
import WebView from 'react-native-webview';

const URL = 'https://website.duedeck.com/privacypolicy-1';

const PrivacyPolicy = () => {
  const [isRememberMe, setRememberMe] = useState(true);
  const onRememberMeToggle = () => {
    setRememberMe(c => !c);
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginTop: moderateScale(8)}}>
        <CustomHeader
          title={'Privacy Policy'}
          LabelPropsType={{
            size: 'Medium',
            fontWeight: 'semibold',
            title: 'Privacy Policy',
            color: colors.GRey800,
            align: {undefined},
          }}
        />
      </View>
      <View style={{flex: 5}}>
        <WebView source={{uri: URL}} style={{flex: 1}} cacheEnabled={true} />
      </View>
      {/* <View style={styles.container}>
        <View style={{margin: moderateScale(10)}}>
          <CheckBox
            label="I Agree with privacy policy"
            isSelected={isRememberMe}
            onPress={onRememberMeToggle}
          />
        </View>
        <View style={{margin: moderateScale(10)}}>
          <Button
            label={'Confirm'}
            onPress={() => {}}
            containerStyle={{marginVertical: moderateScale(10)}}
          />
        </View>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PrivacyPolicy;
