import React from 'react';
import {Text, View} from 'react-native';
import {LabelPropsType} from '../../../types/components';
import {useTheme} from '../../../theme/useTheme';
import Labelstyles from './Labelstyles';
import {colors} from '../../../themev1';

const Label = (props: LabelPropsType) => {
  const {theme} = useTheme();
  let Labelsizes;
  switch (props.size) {
    case 'exsmall':
      Labelsizes = Labelstyles.xsmalllabel;
      break;
    case 'small':
      Labelsizes = Labelstyles.smalllabel;
      break;
      case 'xmedium':
        Labelsizes = Labelstyles.xmedium;
        break;
    case 'medium':
      Labelsizes = Labelstyles.mediumlabel;
      break;

    case 'large':
      Labelsizes = Labelstyles.largelabel;
      break;
    default:
      Labelsizes = Labelstyles.mediumlabel;
  }

  const fontWeight =
    props.fontWeight === 'bold'
      ? 'bold'
      : props.fontWeight === 'semibold'
      ? '500'
      : 'normal';

  return (
    <Text style={[Labelsizes, {fontWeight}, {color: props.color}]}>
      {props.title}
    </Text>
  );
};
export default Label;
