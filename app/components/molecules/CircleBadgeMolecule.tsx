import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CircleImage from '@components/atoms/Circleimage/CircleImage';
import Circle from '@components/atoms/Circle/Circle';
import {Sublabel} from '@components/atoms/Labels';
import {colors} from '@theme';
import {CircleBadgePropsType} from '@types/components';

const wavingHand = '\u{1F44B}';

const CircleBadge: React.FC<CircleBadgePropsType> = ({
  userName,
  profilePic,
  onProfileIconPress,
}) => {
  //(props: CircleBadgePropsType) => {
  const getInitials = (fullName: string) => {
    const allNames = fullName?.trim().split(' ');
    const initials = allNames?.reduce((acc, curr, index) => {
      if (index === 0 || index === allNames?.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, '');
    return initials;
  };

  console.log(profilePic,'profilePicprofilePicprofilePic');
  
  return (
    <TouchableOpacity style={styles.container} onPress={onProfileIconPress}>
      <View>
        <CircleImage
          size={'small'}
          IsOutlined={false}
          title={userName}
          color={colors.white}
          align={'center'}
          onPress={() => {
            throw new Error('Function not implemented.');
          }}
          backgroundColor={colors.primary}
          source={profilePic} // commented sourcepic on dashboard for getting initials
        />
        <View style={styles.badge}>
          <Circle
            size={'small'}
            iconName={'list-badge'}
            background={undefined}
            iconColor={undefined}
          />
        </View>
      </View>

      <Text style={styles.username}>
        <Sublabel
          size={'small'}
          fontWeight={'bold'}
          title={` Hi, ${userName}`}
          color={colors.white}
          align={'center'}
          fontStyle={'normal'}
        />
      </Text>
      <Text style={styles.wavinghand}>{wavingHand}</Text>
    </TouchableOpacity>
  );
};
export default CircleBadge;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  badge: {
    position: 'absolute',
    top: moderateScale(7),
    left: moderateScale(14),
    zIndex: 1,
  },
  username: {
    textAlignVertical: 'center',
    marginLeft: moderateScale(8),
  },
  wavinghand: {
    textAlignVertical: 'center',
    color: colors.NotieYellow,
  },
});
