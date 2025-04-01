// SVGIcon.tsx
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const FilterWhite: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 12H18M3 6H21M9 18H15"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </View>
  );
};

export default FilterWhite;
