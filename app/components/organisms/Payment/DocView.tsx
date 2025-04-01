import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
// import api from '../../../services';
import Pdf from 'react-native-pdf';
import {colors} from '../../../theme';
import fontsize from '../../../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';
import Button from '@components/atoms/button/Button';
import Container from '@components/atoms/Container';
import {useGetLedgerPdfMutation} from '@api/payment';
import {useAppSelector} from '@hooks/redux_hooks';
import {requestMediaPermission, saveBase64AsPDF} from '@utils/permissionsUtils';
import {RESULTS} from 'react-native-permissions';
const PaymentDocView = () => {
  const {reqData, route} = useRoute<any>().params;
  const [pdfUrl, setPdfUrl] = useState({uri: ''});
  const [isLoading, setLoading] = useState(true);
  const getUri = (url: string) => `/api/${url}`;
  const [sublabel, setSublabel] = useState(['Payment', 'Document']);
  const [getLedgerPdf] = useGetLedgerPdfMutation();
  const dashboardState = useAppSelector(state => state?.dashboard);
  const user = useAppSelector(state => state?.user.user);
  useEffect(() => {
    console.log(`get${route}Pdf`);
    getData();
  }, []);

  const getStringBeforeCharacter = (inputString, character = '<link') => {
    const index = inputString.indexOf(character);
    if (index !== -1) {
      console.log('INDEX', index);
      return inputString.substring(0, index);
    }
    return inputString;
  };

  const getData = async () => {
    console.log('TESTFIRMID', dashboardState?.activeBillingFirm);
    await getLedgerPdf({
      clientId: dashboardState?.activeClient?.id,
      billingFirmId: dashboardState?.activeBillingFirm,
      fyId: dashboardState?.activeFYears,
    })
      .unwrap()
      .then(data => {
        setPdfUrl({uri: data});
        let base64Data = getStringBeforeCharacter(data, '<');
        setPdfUrl({
          uri: base64Data,
        });
      })
      .finally(() => {})
      .catch(e => {
        console.log('ERROR', e);
      });
    console.log(`get${route}Pdf`);
    console.log('gethellopdf');
    setLoading(false);
  };

  const handlePdfLinkPress = async () => {
    if (Platform.OS === 'android') {
      await requestMediaPermission().then(async permissionStatus => {
        if (permissionStatus === RESULTS.GRANTED) {
          if (pdfUrl?.uri) {
            await saveBase64AsPDF(pdfUrl?.uri);
          }
        }
      });
    } else {
      if (pdfUrl?.uri) {
        await saveBase64AsPDF(pdfUrl?.uri);
      }
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

export default PaymentDocView;

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
