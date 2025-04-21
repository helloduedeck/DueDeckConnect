import React from 'react';
import { Image, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';

const LOGOwhite = () => {
  return (
   <View style={{backgroundColor:'white',paddingTop:moderateScale(5),borderRadius:4,paddingHorizontal:2}}>
   <Image 
      source={require('../../../assets/images//DC.png')}       
    />
   </View>
  );
};

export default LOGOwhite;
