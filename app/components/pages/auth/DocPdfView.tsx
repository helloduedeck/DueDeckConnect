import {Alert, Dimensions, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
// import api from '../../../services';
import WebView from 'react-native-webview';
import Pdf from 'react-native-pdf';
import {colors} from '../../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FileIcon from 'react-native-vector-icons/FontAwesome';
import fontsize from '../../../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';
import Container from '@components/atoms/Container';
import Button from '@components/atoms/button/Button';

const DocPdfView = (props: any) => {
  //const {reqData, route} = useRoute<any>().props.params?.();
  const [pdfUrl, setPdfUrl] = useState({uri: ''});
  const [isLoading, setLoading] = useState(true);
  const getUri = (url: string) => `/api/${url}`;
  const [sublabel, setSublabel] = useState(['Payment', 'Document']);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const {data, status} = await api.payment[`get${route}Pdf`](reqData);
    // setPdfUrl({uri: data});
    // console.log(`get${route}Pdf`);
    // console.log('gethellopdf');
    // setLoading(false);
  };

  const handlePdfLinkPress = async () => {
    const url = `https://api.duedeck.com/api/downloadLedgerPDF/${reqData.clientId}/${reqData.billingFirmId}/${reqData.fyId}`;
    const supported = await Linking.canOpenURL(
      `https://api.duedeck.com/api/downloadLedgerPDF/${reqData.clientId}/${reqData.billingFirmId}/${reqData.fyId}`,
    );
    console.log('pdf..............');
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Container
      isBottomPadding
      isLoading={isLoading}
      isSubLabel={true}
      backLabel={['Ledger']}>
      <View style={styles.buttonContainer}>
        <Button
          label={'Download ledger'}
          onPress={handlePdfLinkPress}
          leftIcon={'file-pdf'}
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
    // width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  buttonContainer: {
    marginTop: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // paddingHorizontal: 15,
    backgroundColor: colors.white,
    paddingBottom: moderateScale(10),
  },
  button: {
    marginEnd: moderateScale(10),
    flexShrink: 1,
  },
  labelStyle: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    // fontSize: 12,
    fontSize: fontsize.medium,
  },
});

export default DocPdfView;
