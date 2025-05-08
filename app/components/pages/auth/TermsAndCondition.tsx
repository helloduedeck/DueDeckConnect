import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import WebView from 'react-native-webview';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import {colors} from '../../../themev1';

const BASE_URL = 'https://website.duedeck.com/termsconditions-1';

const TermsAndCondition: React.FC = () => {
  const isFocused = useIsFocused();
  const [webUrl, setWebUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      setWebUrl(`${BASE_URL}?t=${Date.now()}`);
      setLoading(true); // reset loader
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <CustomHeader title={'Terms & Conditions'} />
      
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {webUrl ? (
        <WebView
          source={{uri: webUrl}}
          style={{flex: 1}}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
    marginLeft: -25,
    zIndex: 10,
  },
});

export default TermsAndCondition;
