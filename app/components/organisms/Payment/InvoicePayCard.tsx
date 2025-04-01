import React from 'react';
import {View} from 'react-native';
import {Label} from '../../atoms/Label';
import {colors} from '../../../themev1';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PayButton from '../../atoms/Payment/PayButton';
import {Sublabel} from '@components/atoms/SubLabel';
import {getHeaderText} from '../ServiceItem/ServiceItemCard';

const InvoicePayCard = ({
  onPdfButtonPress,
  item,
  firmBranchClientData,
  isPending,
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 4,
        marginVertical: moderateScale(10),
        marginHorizontal: moderateScale(16),
      }}>
      <View
        style={{
          backgroundColor: colors.strokeW,
          position: 'absolute',
          right: 11,
          top: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: moderateScale(4),
          borderRadius: 3,
        }}>
        <View
          style={{
            borderRadius: 3,
          }}>
          <Sublabel
            size={'exsmall'}
            fontWeight={'normal'}
            title={getHeaderText(item.voucher_type, 50)}
            color={colors.GRey800}
            align={undefined}
            fontStyle={'normal'}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(8),
          paddingVertical: moderateScale(16),
        }}>
        <Label
          size={'small'}
          fontWeight={'normal'}
          title={getHeaderText(item.particulars, 30)}
          color={colors.GRey800}
          align={undefined}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(5),
            paddingStart: 1,
            paddingTop: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'calendar-blank-outline'}
              color={colors.Grey600}
              size={10}
              style={styles.icon}
            />
            <Sublabel
              size={'small'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={item.date}
              color={undefined}
              align={undefined}
            />
          </View>
          <View
            style={{
              marginBottom: 8,
            }}>
            <Sublabel
              size={'medium'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={'₹' + item.total}
              color={
                item.voucher_type == 'Proforma'
                  ? colors.GRey800
                  : colors.semorange
              }
              align={undefined}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{marginBottom: 15}}>
            <Sublabel
              size={'small'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={`Voucher No. ${
                item?.voucher_no?.length ? item?.voucher_no : 'NA'
              } `}
              color={undefined}
              align={undefined}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            {item.voucher_type !== 'Opening Balance' && (
              <Icon
                name="file-pdf"
                size={20}
                color={colors.red}
                style={{marginRight: moderateScale(8), marginTop: 4}}
                onPress={onPdfButtonPress}
              />
            )}

            {isPending && item.voucher_type != 'Proforma' && item.voucher_type != 'Reimbursement' && item.balance_amount != 0 && (
              <PayButton
                amount={Math.ceil(item.balance_amount * 100) / 100}
                details={{
                  undefined,
                  selectedItems: [item.id],
                  invoices: [item],
                  firmBranchClientData,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default InvoicePayCard;

const styles = ScaledSheet.create({
  icon: {
    marginRight: moderateScale(4),
  },
});
