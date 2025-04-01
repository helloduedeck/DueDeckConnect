import React from 'react';
import {View} from 'react-native';
import {Label} from '../../atoms/Label';
import {colors} from '../../../themev1';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Sublabel} from '@components/atoms/SubLabel';

const DebitCreditCard = ({onPdfButtonPress, item}) => {
  console.log('DebitCreditCard', item);
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
          height: 18,
          position: 'absolute',
          left: 0,
          top: 0,
          justifyContent: 'center',
          // alignItems: 'center',
          paddingHorizontal: 8,
          borderTopLeftRadius: 4,
        }}>
        <Sublabel
          size={'exsmall'}
          fontWeight={'semibold'}
          title={item.voucher_type + '-' + item.voucher_no}
          color={colors.GRey800}
          align={undefined}
          fontStyle={'normal'}
        />
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(21),
          paddingVertical: moderateScale(16),
        }}>
        <View
          style={{
            marginTop: moderateScale(12),
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingLeft:moderateScale(-40)
          }}>
          <View style={{marginLeft: moderateScale(-11)}}>
            <Label
              size={'small'}
              fontWeight={'normal'}
              title={item.client_name}
              color={colors.GRey800}
              align={undefined}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Sublabel
                size={'small'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'Invoice No. ' + item.invoice_no}
                color={undefined}
                align={undefined}
              />
            </View>
            <Icon
              name="file-pdf"
              size={16}
              color={colors.red}
              style={{marginLeft: moderateScale(9)}}
              onPress={onPdfButtonPress}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: moderateScale(8),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(-12),
              marginLeft: moderateScale(-5),
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(-6),
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: moderateScale(-2),
              }}>
              <Sublabel
                size={'small'}
                fontWeight={'semibold'}
                fontStyle={'normal'}
                title={'Basic Amount'}
                color={colors.Grey600}
                align={undefined}
              />
            </View>
            <View
              style={{
                alignItems: 'baseline',
                marginLeft: moderateScale(10),
              }}>
              <Label
                size={'exsmall'}
                fontWeight={'semibold'}
                title={'₹ ' + item.amount}
                color={colors.Grey600}
                align={undefined}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: moderateScale(-20),
              }}>
              <Sublabel
                size={'small'}
                fontWeight={'semibold'}
                fontStyle={'normal'}
                title={'Total Amount'}
                color={colors.Grey600}
                align={undefined}
              />

              <Label
                size={'exsmall'}
                fontWeight={'semibold'}
                title={'₹' + item.total}
                color={colors.Grey600}
                align={undefined}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: moderateScale(1),
              }}>
              <Sublabel
                size={'small'}
                fontWeight={'semibold'}
                fontStyle={'normal'}
                title={'Unadjusted Amount'}
                color={colors.Grey600}
                align={undefined}
              />

              <Label
                size={'exsmall'}
                fontWeight={'semibold'}
                title={'₹ ' + item.balance_amount}
                color={colors.semorange}
                align={undefined}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default DebitCreditCard;

const styles = ScaledSheet.create({
  icon: {
    marginRight: moderateScale(4),
  },
});
