import React from 'react';
import {Platform, View} from 'react-native';
import {Label} from '../../atoms/Label';
import {colors} from '../../../themev1';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Sublabel} from '../../atoms/SubLabel';
import Svg, { Line } from 'react-native-svg';
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
  const VerticalLine = () => (
    <Svg width="1" height="89" viewBox="0 0 1 89" fill="none">
      <Line x1="0.5" y1="89.0078" x2="0.5" y2="0.985085" stroke="#DDDDDD" />
    </Svg>
  );
  return (
    <View style={styles.container}>
      <View style={{width:'65%'}}>
      <View style={styles.consultancy}>
        <Label {...LabelPropsType}></Label>
      </View>
      <View style={styles.act}>
        <Label {...LabelPropsType1}></Label>
        <Label {...LabelPropsType2}></Label>
      </View>
      <View style={styles.name} >
        <Icon name="building" size={12} style={styles.icon} />
        <Label
          size={'small'}
          fontWeight={'normal'}
          title={clientName ?? ''}
          color={colors.Grey600}
          align={undefined}></Label>
      </View>
      </View>
      <View style={{width:'10%'}}>
      <VerticalLine/>
      </View>

      <View >
        <MaterialCommunityIcons
          name={'calendar-blank-outline'}
          color={colors.Grey600}
          size={30}
          style={styles.icon1}
        />
        <View style={{width:'60%',marginLeft:moderateScale(10)}}>
        <Label {...LabelPropsType3} fontWeight={'bold'}></Label>
        </View>
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
    marginTop: moderateScale(-13),
    marginBottom:26,
    flexDirection:'row',
    width:'100%',
    backgroundColor:'white',
    paddingVertical:10,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  act: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: moderateScale(5),
    marginStart:moderateScale(30)
  },
  consultancy: {
    marginStart:moderateScale(30)
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  company: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: moderateScale(10),
    marginBottom: moderateScale(-10),
  },
  company1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    flexDirection: 'row',
    alignItems: 'center',
     justifyContent: 'center',
     marginRight:9
  },
  icon: {
    marginRight: moderateScale(6),
    color:colors.GRey800
  },
  icon1: {
    marginLeft: moderateScale(8),
    marginBottom:3
  },
  task: {
    marginLeft: moderateScale(8),
  },
});
