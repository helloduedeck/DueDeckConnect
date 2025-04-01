import {Pressable, View} from 'react-native';
import React from 'react';
import Text from '../text/Text';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import Icon from '../Icon';
import fontsize from '@theme/fontstyle';
type IProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

const CheckBox: React.FC<IProps> = ({label, isSelected, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon onPress={onPress} name="CheckSquare" size={20} />
      {!isSelected ? <View style={styles.square} /> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default CheckBox;

const styles = ScaledSheet.create({
  label: {
    color: colors.Grey600,
    paddingStart: moderateScale(10, 0.3),
    fontSize: fontsize.medium,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: moderateScale(15, 0.3),
    height: moderateScale(15, 0.3),
    borderWidth: 2,
    borderColor: colors.Grey600,
    borderRadius: moderateScale(2),
    marginHorizontal: moderateScale(1),
    marginVertical: moderateScale(3),
    position: 'absolute',
    backgroundColor: colors.white,
    left: moderateScale(0.9),
  },
});
