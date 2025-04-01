// SVGIcon.tsx
import React, {FC} from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

interface SVGIconProps {
  width?: number;
  height?: number;
}

const TasklistWhiteIcon: FC<SVGIconProps> = ({width = 24, height = 24}) => {
  return (
    <View style={{width, height}}>
      <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.125 6.5625H5.625V4.6875H18.125V6.5625Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.125 10.9375H5.625V9.0625H18.125V10.9375Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.125 15.3125H5.625V13.4375H18.125V15.3125Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 5C1.875 4.65482 2.15482 4.375 2.5 4.375H3.75C4.09518 4.375 4.375 4.65482 4.375 5V6.25C4.375 6.59518 4.09518 6.875 3.75 6.875H2.5C2.15482 6.875 1.875 6.59518 1.875 6.25V5Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 9.375C1.875 9.02982 2.15482 8.75 2.5 8.75H3.75C4.09518 8.75 4.375 9.02982 4.375 9.375V10.625C4.375 10.9702 4.09518 11.25 3.75 11.25H2.5C2.15482 11.25 1.875 10.9702 1.875 10.625V9.375Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 13.75C1.875 13.4048 2.15482 13.125 2.5 13.125H3.75C4.09518 13.125 4.375 13.4048 4.375 13.75V15C4.375 15.3452 4.09518 15.625 3.75 15.625H2.5C2.15482 15.625 1.875 15.3452 1.875 15V13.75Z"
        fill="white"
      />
    </Svg>
    </View>
  );
};

export default TasklistWhiteIcon;
