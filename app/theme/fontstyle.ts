import {Dimensions, PixelRatio} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const {width, height} = Dimensions.get('window');

const getAndroidFontSize = () => {
  const scale = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();

  // Calculate the approximate font size based on screen dimensions and scale factors
  const screenWidth = width < height ? width : height;
  const fontSize = Math.round((screenWidth / 320) * 14 * scale * fontScale);

  return fontSize;
};

const mfont = getAndroidFontSize();

const fontsize = {
  xssmall: moderateScale(4, 0.25),
  small: moderateScale(8, 0.25),
  medium10: moderateScale(10, 0.25),
  medium11: moderateScale(11, 0.25),
  medium: moderateScale(12, 0.25),
  medium13: moderateScale(13, 0.25),
  medium14: moderateScale(14, 0.25),
  medium15: moderateScale(15, 0.25),
  large: moderateScale(16, 0.25),
  large18: moderateScale(18, 0.25),
  xlarge: moderateScale(20, 0.25),
  xlarge22: moderateScale(22, 0.25),
  xxlarge: moderateScale(24, 0.25),
  xxxlarge: moderateScale(28, 0.25),
  Regular0: mfont - 28,
  Regular1: mfont - 28 - 2,
  Regular2: mfont - 28 - 4,
  Regular3: mfont - 28 - 1,
  Regular4: mfont - 28 - 3,
  Regular5: mfont - 28 - 6,
  Regular6: mfont - 28 - 1.5,
  Regular7: mfont - 28 + 4,
  Regular8: mfont - 28 - 8,
  Regular9: mfont - 28 + 2,
};

export default fontsize;
