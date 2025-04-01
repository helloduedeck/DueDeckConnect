import React from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import Sublabel from '@components/atoms/Labels/SubLabel';
import {colors} from '@theme';
import {Label} from '@components/atoms/Labels';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

export interface ImagePropsType {
  //  source:any;
  leftTitle: string;
  rightTitle: string;
  color: string;
  onRightTextPress?: () => void;
}

const LeftRightText: React.FC<ImagePropsType> = ({
  leftTitle,
  rightTitle,
  color,
  onRightTextPress,
}) => {
  return (
    <>
      <View style={styles.serviceupdate}>
        <Label
          size={'small'}
          fontWeight={'semibold'}
          title={leftTitle}
          color={colors.GRey800}
          align={undefined}
        />
      </View>
      <TouchableOpacity
        onPress={onRightTextPress}
        style={styles.servicerequest}>
        <Sublabel
          size={'small'}
          fontWeight={'bold'}
          color={color}
          align={undefined}
          fontStyle={'normal'}
          title={rightTitle}
        />
      </TouchableOpacity>
    </>
  );
};
export default LeftRightText;

const styles = ScaledSheet.create({
  serviceContainer: {
    backgroundColor: colors.grayLight,
    // borderColor:colors.black,
    // borderWidth:1,
    width: moderateScale(343),
    height: moderateScale(146),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  serviceupdate: {
    position: 'absolute',
    top: moderateScale(20),
    left: moderateScale(20),
  },
  servicerequest: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
  },
  servicecards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(40),
  },
});
