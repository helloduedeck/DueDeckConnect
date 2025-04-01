// EyeOpenIcon.tsx
import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const EyeOpenIcon: FC<SVGIconProps> = ({ width = 24, height = 24 }) => {
  return (
    <View>
    <Svg width={24} height={18} viewBox="0 0 14 12" fill="none">
      <Path
        d="M8.99984 5.99968C8.99984 7.10425 8.10441 7.99968 6.99984 7.99968C5.89527 7.99968 4.99984 7.10425 4.99984 5.99968C4.99984 4.89511 5.89527 3.99968 6.99984 3.99968C8.10441 3.99968 8.99984 4.89511 8.99984 5.99968Z"
        stroke="#6D6C68"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0.638672 5.99965C1.48819 3.29493 4.01504 1.33301 7.00013 1.33301C9.98523 1.33301 12.5121 3.29495 13.3616 5.9997C12.5121 8.70443 9.98523 10.6663 7.00014 10.6663C4.01504 10.6663 1.48817 8.7044 0.638672 5.99965Z"
        stroke="#6D6C68"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
  );
};

export default EyeOpenIcon;
