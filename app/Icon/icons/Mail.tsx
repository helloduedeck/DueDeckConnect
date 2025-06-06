// SVGIcon.tsx
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const MailIcon: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
        <Path
          d="M18.3327 4.99967C18.3327 4.08301 17.5827 3.33301 16.666 3.33301H3.33268C2.41602 3.33301 1.66602 4.08301 1.66602 4.99967M18.3327 4.99967V14.9997C18.3327 15.9163 17.5827 16.6663 16.666 16.6663H3.33268C2.41602 16.6663 1.66602 15.9163 1.66602 14.9997V4.99967M18.3327 4.99967L9.99935 10.833L1.66602 4.99967"
          stroke="#667085"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default MailIcon;
