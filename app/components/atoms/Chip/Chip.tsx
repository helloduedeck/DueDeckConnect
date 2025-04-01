import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from '../text/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import fontsize from '@theme/fontstyle';

type IProps = {
  item: any;
  onDeletePress: (item: any) => void;
  length: number;
};

const Chip: React.FC<IProps> = ({item, onDeletePress, length}) => {
  const onClosePress = () => {
    onDeletePress(item[0]);
  };

  if (!item[1]) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{getChipText(item[1].name, length)}</Text>
      <TouchableOpacity onPress={onClosePress} style={styles.iconContainer}>
        <AntDesign name="closecircleo" color={colors.primary} size={13} />
      </TouchableOpacity>
    </View>
  );
};

export default Chip;

const getChipText = (heading: string, length: number) => {
  try {
    return heading.length < length
      ? `${heading}`
      : `${heading.substring(0, length)}..`;
  } catch (error) {
    return '';
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(0.5),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
    marginEnd: moderateScale(10),
    flexDirection: 'row',
    borderColor: colors.primaryDark,
  },
  parentContainer: {},
  name: {
    fontSize: fontsize.medium,
    color: colors.primaryDark,
  },
  iconContainer: {
    paddingStart: moderateScale(5),
  },
});
