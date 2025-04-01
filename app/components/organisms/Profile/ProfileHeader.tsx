import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../themev1';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Label} from '../../atoms/Label';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Logo } from '@components/atoms/Logo';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name={'arrow-left'}
          color={colors.Grey600}
          size={20}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Label
        size={'medium'}
        fontWeight={'semibold'}
        title={'Your Profile'}
        color={colors.GRey800}
        align={'center'}
      />
    
    </View>
  );
};

export default ProfileHeader;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: moderateScale(9),
  },
});
