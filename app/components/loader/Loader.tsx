import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {lotties} from '../../assets';
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
      source={lotties.Loading}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
