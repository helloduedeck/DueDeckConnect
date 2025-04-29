import React from 'react';
import {View} from 'react-native';
import {Label} from '../../atoms/Label';
import {colors} from '../../../themev1';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Sublabel} from '../../atoms/SubLabel';
interface DetailContentPropsType {
  SubLabelPropsType: any;
  LabelPropsType: any;
  LabelPropsType1: any;
  LabelPropsType2: any;
  LabelPropsType3: any;
  clientName: string;
  SubLabelPropsType1: any;
}
const DetailContent = ({
  SubLabelPropsType,
  LabelPropsType,
  LabelPropsType1,
  LabelPropsType2,
  LabelPropsType3,
  clientName,
  SubLabelPropsType1,
}: DetailContentPropsType) => {
  return (
    <View style={styles.container}>
      <View style={styles.consultancy}>
        <Label {...LabelPropsType}></Label>
      </View>
      <View style={styles.act}>
        <Label {...LabelPropsType1}></Label>
        <Label {...LabelPropsType2}></Label>
      </View>
      <View style={styles.company1}>
        <Icon name="building" size={12} style={styles.icon} />
        <Label
          size={'small'}
          fontWeight={'normal'}
          title={clientName ?? ''}
          color={colors.Grey600}
          align={undefined}></Label>
      </View>

      <View style={styles.company}>
        <MaterialCommunityIcons
          name={'calendar-blank-outline'}
          color={colors.GRey800}
          size={11}
          style={styles.icon1}
        />
        <Label {...LabelPropsType3}></Label>
        <View style={styles.task}>
          <Sublabel {...SubLabelPropsType}></Sublabel>
        </View>
      </View>
    </View>
  );
};

export default DetailContent;
const styles = ScaledSheet.create({
  container: {
    marginVertical: moderateScale(15),
  },
  act: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(5),
  },
  consultancy: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  company: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(10),
    marginBottom: moderateScale(-10),
  },
  company1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: moderateScale(6),
    color:colors.GRey800
  },
  icon1: {
    marginRight: moderateScale(8),
  },
  task: {
    marginLeft: moderateScale(8),
  },
});
