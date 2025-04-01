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
import {moderateScale} from 'react-native-size-matters';
import fontsize from '../../../theme/fontstyle';
import Button from '@components/atoms/button/Button';
import Container from '@components/atoms/Container';
import {
  useGetCreditnotePdfMutation,
  useGetDebitnotePdfMutation,
  useGetInvoicePdfMutation,
  useGetLedgerPdfMutation,
  useGetProformaPdfMutation,
  useGetReceiptPdfMutation,
} from '@api/payment';
import {useAppSelector} from '@hooks/redux_hooks';
import {requestMediaPermission, saveBase64AsPDF} from '@utils/permissionsUtils';
import {RESULTS} from 'react-native-permissions';

const DocpdfView = () => {
  const userToken = useAppSelector(state => state?.user?.user?.token);
  const {reqData, route} = useRoute<any>().params;
  const [pdfUrl, setPdfUrl] = useState({uri: ''});
  const [isLoading, setLoading] = useState(true);
  const getUri = (url: string) => `/api/${url}`;
  const [sublabel, setSublabel] = useState(['Payment', 'Document']);
  const [getLedgerPdf] = useGetLedgerPdfMutation();
  const [getDebitnotePdf] = useGetDebitnotePdfMutation();
  const [getCreditnotePdf] = useGetCreditnotePdfMutation();
  const [getInvoicePdf] = useGetInvoicePdfMutation();
  const [getReceiptPdf] = useGetReceiptPdfMutation();
  const [getProformaPdf] = useGetProformaPdfMutation();

  useEffect(() => {
    getData();
  }, []);

  const getStringBeforeCharacter = (inputString, character = '<link') => {
    const index = inputString.indexOf(character);
    if (index !== -1) {
      return inputString.substring(0, index);
    }
    return inputString;
  };

  const getData = async () => {
    console.log('REQDATA', reqData);
    if (route === 'Invoice') {
      await getInvoicePdf(reqData)
        .unwrap()
        .then(data => {
          if (data) {
            let base64Data = getStringBeforeCharacter(data, '<');
            setPdfUrl({
              uri: base64Data, //'data:application/pdf;base64,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',
            });
          }
        })
        .catch(e => {
          console.log('ERROR WHILE GETTING INVOICE PDF', e);
        });
    } else if (route === 'Debitnote') {
      await getDebitnotePdf(reqData)
        .unwrap()
        .then(data => {
          if (data) {
            let base64Data = getStringBeforeCharacter(data, '<');
            setPdfUrl({uri: base64Data});
          }
        })
        .catch(e => {});
    } else if (route === 'Receipt') {
      await getReceiptPdf(reqData)
        .unwrap()
        .then(data => {
          if (data) {
            let base64Data = getStringBeforeCharacter(data, '<');
            setPdfUrl({uri: base64Data});
          }
        })
        .catch(e => {});
    } else if (route === 'Creditnote') {
      await getCreditnotePdf(reqData)
        .unwrap()
        .then(data => {
          if (data) {
            let base64Data = getStringBeforeCharacter(data, '<');
            setPdfUrl({uri: base64Data});
          }
        })
        .catch(e => {});
    }
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

    // const clientId = dashboardState?.activeClient?.emp_id;
    // const billingFirmId = dashboardState?.activeBillingFirm;
    // const fyId = dashboardState?.activeFYears;
    // const url = `https://api.duedeck.com/api/downloadLedgerPDF/${clientId}/${billingFirmId}/${fyId}`;
    // const supported = await Linking.canOpenURL(url);
    // if (supported) {
    //   await Linking.openURL(url);
    //   setSublabel(['Updated', 'Sublabel']);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${url}`);
    // }
  };
  return (
    <Container
      isBottomPadding
      isLoading={isLoading}
      isSubLabel={true}
      backLabel={['Payment']}>
      <View style={styles.buttonContainer}>
        <Button
          label={`Download ${
            route
              ? route === 'Debitnote'
                ? 'Debit Note'
                : route === 'Creditnote'
                ? 'Credit Note'
                : route
              : route
          }`}
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

export default DocpdfView;

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
    backgroundColor: colors.primaryDark,
  },
  labelStyle: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    fontSize: fontsize.medium,
  },
});
