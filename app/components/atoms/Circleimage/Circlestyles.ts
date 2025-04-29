import {colors} from '@theme';
import {Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
// import {colors} from '../../../themev1';

export default StyleSheet.create({
  smallcircle: {
    height: moderateScale(32),
    width: moderateScale(32),
    borderWidth: 0.5,
    borderRadius: moderateScale(32) / 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        //elevation: 5,
      },
    }),
  },
  mediumcircle: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderWidth: 0.5,
    borderRadius: moderateScale(90) / 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        //elevation: 5,
      },
    }),
  },
  Imagestyle: {
    width: '100%',
    height: '100%',
  },
});
