import React from 'react';
import {Loading} from '../../../assets/lottie';
import Lottie from 'lottie-react-native';

type IProps = {
  size: number;
};

const Loader: React.FC<IProps> = ({size}) => {
  return (
    <Lottie
      style={{
        width: size,
        height: size,
      }}
      autoPlay
      loop
      source={Loading}
    />
  );
};

export default Loader;
