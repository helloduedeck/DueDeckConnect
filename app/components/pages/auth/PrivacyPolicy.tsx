import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {colors} from '../../../themev1';
import CheckBox from '../../../components/atoms/CheckBox/CheckBox';
import {moderateScale} from 'react-native-size-matters';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import Button from '@components/atoms/button/Button';
import WebView from 'react-native-webview';

const BASE_URL = 'https://website.duedeck.com/privacypolicy-1';

const PrivacyPolicy = () => {
  const [isRememberMe, setRememberMe] = useState(true);
  const [webUrl, setWebUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const onRememberMeToggle = () => {
    setRememberMe(c => !c);
  };

  useEffect(() => {
    if (isFocused) {
      setWebUrl(`${BASE_URL}?t=${Date.now()}`); // force reload
      setLoading(true);
    }
  }, [isFocused]);

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

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <View style={{flex: 5}}>
        {webUrl ? (
          <WebView
            source={{uri: webUrl}}
            style={{flex: 1}}
            cacheEnabled={true}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        ) : null}
      </View>

      {/* Uncomment if you want the agreement checkbox + confirm */}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
    marginLeft: -25,
    zIndex: 10,
  },
});

export default PrivacyPolicy;
