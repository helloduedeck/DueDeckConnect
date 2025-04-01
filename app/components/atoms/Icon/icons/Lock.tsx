// SVGIcon.tsx
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const LockIcon: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
       <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.8333 9.16699H4.16667C3.24619 9.16699 2.5 9.91318 2.5 10.8337V16.667C2.5 17.5875 3.24619 18.3337 4.16667 18.3337H15.8333C16.7538 18.3337 17.5 17.5875 17.5 16.667V10.8337C17.5 9.91318 16.7538 9.16699 15.8333 9.16699Z"
        stroke="#667085"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.83398 9.16699V5.83366C5.83398 4.72859 6.27297 3.66878 7.05437 2.88738C7.83577 2.10598 8.89558 1.66699 10.0007 1.66699C11.1057 1.66699 12.1655 2.10598 12.9469 2.88738C13.7283 3.66878 14.1673 4.72859 14.1673 5.83366V9.16699"
        stroke="#667085"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </View>
  );
};

export default LockIcon;
