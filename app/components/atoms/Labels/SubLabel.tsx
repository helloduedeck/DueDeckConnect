import React from 'react';
import {Text} from 'react-native';
import Sublabelstyles from './Sublabelstyles';
import {SubLabelPropsType} from '@types/components';

const Sublabel = (props: SubLabelPropsType) => {
  let SubLabelsizes;
  switch (props.size) {
    case 'exsmall':
      SubLabelsizes = Sublabelstyles.extrasmalllabel;
      break;
    case 'small':
      SubLabelsizes = Sublabelstyles.smallsublabel;
      break;
    case 'medium':
      SubLabelsizes = Sublabelstyles.mediumsublabel;
      break;

    case 'large':
      SubLabelsizes = Sublabelstyles.largesublabel;
      break;
    default:
      SubLabelsizes = Sublabelstyles.largesublabel;
  }

  const fontWeight =
    props.fontWeight === 'bold'
      ? 'bold'
      : props.fontWeight === 'semibold'
      ? '500'
      : 'normal';

  const fontStyle = props.fontStyle === 'italic' ? 'italic' : 'normal';
  return (
    <Text
      style={[
        SubLabelsizes,
        {fontWeight, fontStyle},
        {color: props.color},
        {textAlign: props.align ?? 'left'},
        {textAlignVertical: 'center'},
      ]}>
      {props?.maxLength
        ? props?.title?.substring(0, props?.maxLength)
        : props.title}
    </Text>
  );
};
export default Sublabel;
