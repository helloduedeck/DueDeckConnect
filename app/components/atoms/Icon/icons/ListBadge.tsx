// SVGIcon.tsx
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
      <Svg width={width} height={height} viewBox="0 0 12 13" fill="none">
        <Circle cx={6} cy={6.7207} r={6} fill="white" />
        <Line x1={3} y1={4.5} x2={10.2222} y2={4.5} stroke="#6C6C6C" />
        <Line x1={3} y1={7.30078} x2={10.2222} y2={7.30078} stroke="#6C6C6C" />
        <Line x1={3} y1={10.1006} x2={10.2222} y2={10.1006} stroke="#6C6C6C" />
      </Svg>
    </View>
  );
};

export default ListBadgeIcon;
