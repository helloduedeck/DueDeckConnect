import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import Image from 'react-native-scalable-image';

type IProps = {
  name: string;
  size: number;
  onPress?: () => void;
  height?: number;
  style?: any;
};

const Icon: React.FC<IProps> = ({name, size, onPress, height, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {name ? (
        <Image
          source={require('../../assets/images/CheckSquare.png')}
          width={size}
          height={height}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default Icon;
