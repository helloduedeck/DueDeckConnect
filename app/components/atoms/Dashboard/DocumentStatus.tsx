import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import { DocumentStatusPropsType } from "../../../types/components";


const DocumentStatus = (props: DocumentStatusPropsType) => {
  let Labelsizes;
  switch (props.size) {
    case 'exsmall':
      Labelsizes = styles.exsmall;
      break;
    case 'small':
      Labelsizes = styles.smalllabel;
      break;
    case 'medium':
      Labelsizes = styles.mediumlabel;
      break;

    case 'large':
      Labelsizes = styles.largelabel;
      break;
    default:
      Labelsizes = styles.mediumlabel;
  }

  const fontWeight =
    props.fontWeight === 'bold'
      ? 'bold'
      : props.fontWeight === 'semibold'
      ? '500'
      : 'normal';
  const fontStyle = props.fontStyle === 'italic' ? 'italic' : 'normal';
  return (
    <View style={styles.docstatus}>
      <View>
        <Text
          style={[Labelsizes, {fontWeight, fontStyle}, {color: props.color}]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};
export default DocumentStatus;
const styles = ScaledSheet.create({
  docstatus: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  xxsmall: {
    fontSize: moderateScale(8),
  },
  exsmall: {
    fontSize: moderateScale(10),
  },
  smalllabel: {
    fontSize: moderateScale(12),
  },
  mediumlabel: {
    fontSize: moderateScale(16),
  },
  largelabel: {
    fontSize: moderateScale(20),
  },
});
