import {StyleSheet, Text as RNText} from 'react-native';
import React, {useMemo} from 'react';
import {colors, fonts} from '../../theme';
import fontsize from '../../theme/fontstyle';

type IProps = {
  children: any;
  style?: any;
  isBold?: boolean;
  isSemiBold?: boolean;
};

const Text: React.FC<IProps> = ({children, style, isBold, isSemiBold}) => {
  const textStyle = useMemo(() => {
    const textStyles: any = [styles.normal];
    if (isBold) {
      textStyles.push(styles.bold);
    }
    if (isSemiBold) {
      textStyles.push(styles.semiBold);
    }

    if (style) {
      textStyles.push(style);
    }

    return textStyles;
  }, [isBold, isSemiBold, style]);

  return <RNText style={textStyle}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  normal: {
    fontSize: fontsize.medium14, //regular5
    fontFamily: fonts.Normal,
    color: colors.charcoal,
    letterSpacing: 0,
  },
  bold: {
    fontFamily: fonts.Bold,
  },
  semiBold: {
    fontFamily: fonts.SemiBold,
  },
});
