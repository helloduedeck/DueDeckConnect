import {Alert, Dimensions, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
// import api from '../../../services';
import Pdf from 'react-native-pdf';
import {colors} from '../../../theme';
import {moderateScale} from 'react-native-size-matters';
import fontsize from '../../../theme/fontstyle';
import Container from '@components/atoms/Container';
import Button from '@components/atoms/button/Button';

const LedgerView = (props: any) => {
  // const {reqData, route} = useRoute<any>().params;
  const [pdfUrl, setPdfUrl] = useState({uri: ''});
  const [isLoading, setLoading] = useState(true);
  const getUri = (url: string) => `/api/${url}`;
  const [sublabel, setSublabel] = useState(['Payment', 'Document']);

  useEffect(() => {
    // getData();
  }, []);

  const getData = async () => {
    const {data, status} = await api.payment[`get${route}Pdf`](reqData);
    setPdfUrl({uri: data});

    setLoading(false);
  };

  const handlePdfLinkPress = async () => {
    console.log('TESTVIEW1');
    const url = `https://api.duedeck.com/api/downloadLedgerPDF/${reqData.clientId}/${reqData.billingFirmId}/${reqData.fyId}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      setSublabel(['Updated', 'Sublabel']);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <Container
      isBottomPadding
      isLoading={isLoading}
      isSubLabel={true}
      backLabel={['Payment']}>
      <View style={styles.buttonContainer}>
        <Button
          label={'Download Invoice'}
          onPress={handlePdfLinkPress}
          leftIcon={'file-pdf'}
          disabled
          labelStyle={styles.labelStyle}
          containerStyle={styles.button}
        />
      </View>
      <Pdf
        source={pdfUrl}
        onLoadComplete={(numberOfPages, filePath) => {}}
        onPageChanged={(page, numberOfPages) => {}}
        onError={error => {}}
        onPressLink={uri => {}}
        style={styles.pdf}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  buttonContainer: {
    marginTop: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    paddingBottom: moderateScale(10),
  },
  button: {
    marginEnd: moderateScale(10),
    flexShrink: 1,
    backgroundColor: colors.graish,
  },
  labelStyle: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    fontSize: fontsize.medium,
  },
});

export default LedgerView;
