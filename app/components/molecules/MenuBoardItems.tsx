import {Label} from '@components/atoms/Labels';
import Circle from '@components/atoms/Circle/Circle';
import {colors} from '@theme';
import {MenuBoardItemProps} from '@types/components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

const MenuBoardItem: React.FC<MenuBoardItemProps> = ({
  size,
  fontWeight,
  title,
  iconName,
  onPress,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Circle
        size={size}
        background={backgroundColor}
        iconName={iconName}
        iconColor={undefined}
      />
      <View style={styles.menulabel}>
        <Label
          size={size}
          fontWeight={fontWeight}
          title={title}
          color={colors.Grey600}
          style={styles.label}
          align={undefined}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MenuBoardItem;

const styles = ScaledSheet.create({
  MenuContainer: {
    flexDirection: 'row',
  },
  rupeecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  maincontainer: {
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(22),
    paddingBottom: moderateScale(20),
    backgroundColor: colors.white,
    width: moderateScale(343),
    height: moderateScale(107),
    borderRadius: moderateScale(8),
    // borderColor:colors.black,
    //     borderWidth:1,
  },
  menuItem: {
    alignItems: 'center',
    // justifyContent:'center',
    marginHorizontal: moderateScale(9),
    backgroundColor: 'white',
  },
  menulabel: {
    // marginTop: moderateScale(7),
  },
  label: {
    marginTop: moderateScale(10), // Adjust the margin top as needed
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  paginationDot: {
    width: moderateScale(4),
    height: moderateScale(4),
    borderRadius: moderateScale(4),
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(1),
  },
  activeDot: {
    backgroundColor: colors.primaryDark,
    width: moderateScale(24),
    height: moderateScale(4),
  },
  hiddenItem: {
    opacity: 0, // Make the item transparent
  },
});
