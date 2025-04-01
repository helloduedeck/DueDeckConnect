// SVGIcon.tsx
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const EyeOffIcon: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
     <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
        <G clipPath="url(#clip0_8887_12630)">
          <Path
            d="M6.59935 2.82699C7.05824 2.71958 7.52806 2.66588 7.99935 2.66699C12.666 2.66699 15.3327 8.00033 15.3327 8.00033C14.928 8.7574 14.4454 9.47015 13.8927 10.127M9.41268 9.41366C9.22958 9.61016 9.00878 9.76776 8.76345 9.87707C8.51812 9.98639 8.25328 10.0452 7.98474 10.0499C7.7162 10.0546 7.44946 10.0052 7.20042 9.90465C6.95139 9.80406 6.72516 9.65434 6.53525 9.46443C6.34533 9.27451 6.19561 9.04829 6.09502 8.79925C5.99443 8.55022 5.94503 8.28347 5.94977 8.01493C5.95451 7.74639 6.01329 7.48156 6.1226 7.23622C6.23191 6.99089 6.38952 6.77009 6.58602 6.58699M0.666016 0.666992L15.3327 15.3337M11.9593 11.9603C10.8197 12.829 9.43209 13.3102 7.99935 13.3337C3.33268 13.3337 0.666016 8.00033 0.666016 8.00033C1.49528 6.45492 2.64544 5.10473 4.03935 4.04033L11.9593 11.9603Z"
            stroke="#667085"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_8887_12630">
            <Rect width={width} height={height} fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default EyeOffIcon;
