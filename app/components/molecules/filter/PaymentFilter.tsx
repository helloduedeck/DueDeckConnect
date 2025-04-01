import {StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Text from '@components/text/Text';
import {colors} from '@theme';
import fontsize from '@theme/fontstyle';

const PaymentFilter = ({}) => {
  const activeBillingFirm = useSelector(
    (state: any) => state.dashboard.billingFirm,
  );
  const activeYear = useSelector((state: any) => state.payment.fYBilling);
  const activeFinancialYearPayment = useSelector(
    (state: any) => state.payment.fYBilling,
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: moderateScale(10),
        }}>
        <View style={{flexDirection: 'row', width: '50%'}}>
          <Text>Billing Firm :</Text>
          <Text style={{color: colors.primary}}>
            {activeBillingFirm?.name}{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            marginLeft: moderateScale(100),
          }}>
          <Text style={{}}>FY :</Text>
          <Text style={{color: colors.primary}}>
            {activeFinancialYearPayment ?? []}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentFilter;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: moderateScale(10),
  },
  container: {
    backgroundColor: colors.white,
    height: moderateScale(50),
    flexDirection: 'row',
  },
  labelStyle: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),

    fontSize: fontsize.medium,
  },
  button: {
    marginEnd: moderateScale(10),
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingStart: moderateScale(7),
    borderStartWidth: 1,
    borderStartColor: colors.grayLight,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    paddingEnd: moderateScale(10),
  },
  scrollContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingStart: moderateScale(15),
  },
  iconButton: {
    padding: moderateScale(3),
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
  },
  iconSortButton: {
    padding: moderateScale(7),
    marginStart: moderateScale(15),
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sheetContainer: {
    minHeight: moderateScale(350),
    paddingVertical: moderateScale(20),
    zIndex: moderateScale(10),
  },
  titleConatiner: {
    paddingBottom: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  title: {
    fontSize: fontsize.medium,
    color: colors.black,
    textTransform: 'capitalize',
  },
  sheetContent: {
    paddingHorizontal: moderateScale(15),
  },
  filterContainer: {
    flexGrow: 1,
  },
});
