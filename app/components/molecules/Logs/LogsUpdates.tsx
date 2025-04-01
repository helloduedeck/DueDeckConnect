import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../themev1';
import {Sublabel} from '../../atoms/SubLabel';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

const LogsUpdates = ({iconname, sublabel}: any) => {
  return (
    <View>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={iconname} // Dynamic icon name
          color={colors.logicon}
          size={8}
          style={{position:'absolute',top:moderateScale(7),left:moderateScale(-20)}}
        />

        <Sublabel
          size={'small'}
          fontWeight={'normal'}
          fontStyle={'normal'}
          title={sublabel} // Dynamic sublabel text
          color={undefined}
          align={undefined}
        />
      </View>
    </View>
  );
};

export default LogsUpdates;

const styles = ScaledSheet.create({
  Logtitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Adjust the margin as per your requirement
  },
});
