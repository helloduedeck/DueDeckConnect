import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme';
import Text from '../text/Text';
import Loader from '@components/atoms/Loader/Loader';
import { moderateScale } from 'react-native-size-matters';

type IProps = {
  children: any;
  isLoading?: boolean;
  isFailed?: boolean;
  style?: any;
};

const ContentW: React.FC<IProps> = ({children, isLoading, isFailed, style}) => {
  return (
    <View style={[styles.container, style]}>
      {isLoading ? (
        <View style={styles.subContainer}>{<Loader size={100} />}</View>
      ) : isFailed ? (
        <View style={styles.subContainer}>
          <Text isBold={true}>Something went wrong</Text>
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default ContentW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subContainer: {
     flex: 1,
     marginTop:moderateScale(250),
         justifyContent: 'center',
    alignItems: 'center',
  },
});
