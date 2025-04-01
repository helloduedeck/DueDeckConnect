import {StyleSheet, View} from 'react-native';
import React from 'react';

type IProps = {
  children: any;
};

const Container: React.FC<IProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242,245,247)',
  },
});
