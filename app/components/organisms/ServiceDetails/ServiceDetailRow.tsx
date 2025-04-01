import React from 'react';
import {Platform, View} from 'react-native';
import {Label} from '../../atoms/Label';
import {Sublabel} from '../../atoms/SubLabel';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '../../../themev1';

const ServiceDetailRow = ({
  SubLabelPropsType,
  LabelPropsType,
  SubLabelPropsType1,
  LabelPropsType1,
  SubLabelPropsType2,
  LabelPropsType2,
}: any) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={[styles.column, {flex: 0.35}]}>
          <Sublabel {...SubLabelPropsType}></Sublabel>

          <View style={[styles.row]}>
            <Label {...LabelPropsType}></Label>
          </View>
        </View>
        <View style={[styles.column, {flexGrow: LabelPropsType1?.flex ?? 0.4}]}>
          <Sublabel {...SubLabelPropsType1}></Sublabel>
          <View style={[styles.row, {}]}>
            <Label {...LabelPropsType1}></Label>
          </View>
        </View>
        {!LabelPropsType1?.flex && LabelPropsType2?.title && (
          <View style={styles.column}>
            <Sublabel {...SubLabelPropsType2}></Sublabel>
            <View style={styles.row}>
              <Label {...LabelPropsType2}></Label>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceDetailRow;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: moderateScale(24),
    marginHorizontal: moderateScale(17),
    backgroundColor: colors.white,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  column: {flexDirection: 'column', flex: 0.35, marginLeft: 3},
  row: {
    marginBottom: moderateScale(4),
  },
});
