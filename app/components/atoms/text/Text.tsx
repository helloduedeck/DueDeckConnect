import {StyleSheet, Text as RNText, View} from 'react-native';
import React, {useMemo} from 'react';
import fontsize from '@theme/fontstyle';
import {colors, fonts} from '@theme';
type IProps = {
  children: any;
  style?: any;
  isBold?: boolean;
  isSemiBold?: boolean;
};

const Text: React.FC<IProps> = ({children, style, isBold, isSemiBold}) => {
  const textStyle = useMemo(() => {
    const textStyle: any = [styles.normal];
    if (isBold) {
      textStyle.push(styles.bold);
    }
    if (isSemiBold) {
      textStyle.push(styles.semiBold);
    }

    if (style) {
      textStyle.push(style);
    }

    return textStyle;
  }, [isBold, isSemiBold, style]);

  return <RNText style={textStyle}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  normal: {
    fontSize: fontsize.medium, //regular5
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
