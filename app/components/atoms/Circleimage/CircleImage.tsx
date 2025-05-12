import React, { useState } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CircleImagePropsType} from '../../../types/components';
import {useTheme} from '../../../theme/useTheme';
import Circlestyles from './Circlestyles';
import {getInitials} from '@utils/helper';

const CircleImage = (props: CircleImagePropsType) => {
  const {theme} = useTheme();
  let Circlesizes;
  switch (props.size) {
    case 'small':
      Circlesizes = Circlestyles.smallcircle;
      break;
    case 'medium':
      Circlesizes = Circlestyles.mediumcircle;
      break;
    default:
      Circlesizes = Circlestyles.mediumcircle;
  }
  
  const [imageError, setImageError] = useState(false);

  return (
    <View>
       <View style={[Circlesizes, { backgroundColor: props.backgroundColor }]}>
      {props.source && !imageError ? (
        <Image
          style={[Circlesizes, styles.image]}
          source={props.source}
          resizeMode="stretch"
          onError={() => setImageError(true)} // Catch image load error
        />
      ) : (
        <Text style={[styles.text, { color: props.color }]}>
          {getInitials(props.title)}
        </Text>
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
export default CircleImage;
