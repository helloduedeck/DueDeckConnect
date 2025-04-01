import {Pressable, View} from 'react-native';
import React from 'react';
// import Icon from '../icon/Icon';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import fontsize from '@theme/fontstyle';
import {colors} from '@theme';
import Checkbox from '@components/atoms/CheckBox/CheckBox';
import Text from '@components/atoms/Text';
import Icon from '@components/atoms/Icon';
type IProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

const CheckBoxMolecule: React.FC<IProps> = ({label, isSelected, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon onPress={onPress} name="CheckSquare" size={20} />
      {!isSelected ? <View style={styles.square} /> : null}
      <Checkbox isChecked={isSelected} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default CheckBoxMolecule;

const styles = ScaledSheet.create({
  label: {
    color: colors.primary,
    paddingStart: moderateScale(10, 0.3),
    fontSize: fontsize.medium14,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: moderateScale(15, 0.3),
    height: moderateScale(15, 0.3),
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: moderateScale(2),
    marginHorizontal: moderateScale(1),
    marginVertical: moderateScale(3),
    position: 'absolute',
    backgroundColor: colors.white,
    left: moderateScale(0.9),
  },
});
