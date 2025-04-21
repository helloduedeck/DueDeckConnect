import {StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

type IProps = {
  children: any;
  borderStartColor?: string;
  viewableItems?: any;
  item?: any;
  isNoCard?: boolean;
  style?: any;
  onPress?: () => void;
  onCancel?: () => void;
};

const Taskrequestcard: React.FC<IProps> = ({
  children,
  borderStartColor = colors.white,
  isNoCard,
  style,
  onPress,
  onCancel
}) => {
  return (
    <TouchableOpacity
    disabled
      onPress={() => onPress?.()}
      style={[
        styles.container(borderStartColor),
        !isNoCard && styles.card,
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default Taskrequestcard;

const cardStyle: any = (color: string) => ({
  borderRadius: moderateScale(8),
  padding: moderateScale(13, 0.25),
  borderStyle: 'solid',
  borderColor: color,
  backgroundColor: colors.white,
  borderStartWidth: moderateScale(4, 0.25),
});

const styles = StyleSheet.create({
  container: cardStyle,
  card: {
    marginVertical: moderateScale(4, 0.25),
    marginHorizontal: moderateScale(15, 0.25),
    shadowColor: colors.charcoal,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    flex: 1,
  },
});
