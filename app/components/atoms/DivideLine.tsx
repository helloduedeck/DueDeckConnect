import {colors} from '@theme';
import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const DivideLine = () => {
  return <View style={styles.org} />;
};

export default DivideLine;

const styles = ScaledSheet.create({
  org: {
    borderBottomWidth: 1,
    borderColor: colors.red,
  },
});
