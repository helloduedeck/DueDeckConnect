// SVGIcon.tsx
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const LoaderOutlineIcon: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
          stroke="#2A4F87"
          strokeOpacity={0.15}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default LoaderOutlineIcon;
