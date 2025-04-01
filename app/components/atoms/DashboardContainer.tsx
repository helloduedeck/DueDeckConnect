import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type IProps = {
  children: any;
};

const DashboardContainer: React.FC<IProps> = ({children}) => {
  return (
    <LinearGradient
      colors={['#0789B5', '#0789B5', '#ffff']}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

export default DashboardContainer;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
