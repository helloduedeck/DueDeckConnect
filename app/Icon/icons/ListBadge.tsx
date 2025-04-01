// SVGIcon.tsx
import colors from '../../themev1/colors';
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Line,
  Path,
  Rect,
} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const ListBadgeIcon: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
     <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
      <Circle cx={5.5} cy={5.5} r={5.5} fill="white" />
      <Rect x={3} y={3} width={5} height={1} fill="#6D6C68" />
      <Rect x={3} y={5} width={5} height={1} fill="#6D6C68" />
      <Rect x={3} y={7} width={5} height={1} fill="#6D6C68" />
    </Svg>
    </View>
  );
};

export default ListBadgeIcon;
