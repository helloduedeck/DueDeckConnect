import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DocumentAlertPropsType} from '../../../types/components';
import {colors} from '@theme';
import Svg, { Path } from 'react-native-svg';

const DocumentAlert = (props: DocumentAlertPropsType) => {
  let Labelsizes;
  switch (props.size) {
    case 'xxsmall':
      Labelsizes = styles.xxsmall;
      break;
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


      const Documenticon = () => (
        <View>
          <Svg width={10} height={12} viewBox="0 0 10 12" fill="none">
            <Path
              d="M6 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H8C8.26522 11 8.51957 10.8946 8.70711 10.7071C8.89464 10.5196 9 10.2652 9 10V4M6 1L9 4M6 1V4H9M7 6.5H3M7 8.5H3M4 4.5H3"
              stroke="#6D6C68"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      );
  return (
    <View style={styles.Docalert}>
      {/* <Icon name="file-text" size={12} color={colors.Grey600} /> */}
      <Documenticon/>
      <View style={styles.doctitle}>
        <Text style={[Labelsizes, {fontWeight}, {color: props.color}]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};
export default DocumentAlert;
const styles = ScaledSheet.create({
  Docalert: {
    flexDirection: 'row',
  },
  doctitle: {
    marginLeft: moderateScale(8),
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
