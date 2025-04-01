import React from 'react';
import {Text} from 'react-native';
import {LabelPropsType} from '../../../types/components';
import {useTheme} from '../../../theme/useTheme';
import Labelstyles from './Labelstyles';

const Label = (props: LabelPropsType) => {
  const {theme} = useTheme();
  let Labelsizes;
  switch (props.size) {
    case 'small':
      Labelsizes = Labelstyles.smalllabel;
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
    <Text style={[Labelsizes, props.style, {fontWeight}, {color: props.color}]}>
      {props.title}
    </Text>
  );
};
export default Label;
