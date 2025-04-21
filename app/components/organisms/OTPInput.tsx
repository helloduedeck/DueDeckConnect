import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
// import {colors, fonts} from '../../../../theme';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../themev1';
import fontsize from '../../themev1/fontstyle';
// import fontsize from '../../../../theme/fontstyle';

type IProps = {
  digits: number;
  onChange: (otp: string) => void;
  onFocus:()=> void;
  onBlur:()=>void;
};

const OTPInput: React.FC<IProps> = ({digits, onChange,onFocus,onBlur}) => {
  const textInputRef = useRef([]);
  const [otp, setOTP] = useState([]);
  const [focusedBox, setFocusedBox] = useState<any>();

  const focusPrevious = (key: string, index: number) => {
    if (key === 'Backspace' && index !== 0) {
      textInputRef.current[index - 1].focus();
    }
  };

  const focusNext = (index: number, value: string) => {
    const inputLength = textInputRef.current.length;
    if (index < inputLength - 1 && value) {
      textInputRef.current[index + 1].focus();
    }
    if (index === inputLength - 1) {
      textInputRef.current[index].blur();
    }
    setOTP(otp => {
      otp[index] = value;

      onChange(otp.join(''));
      return [...otp];
    });
  };

  const textInput = useMemo(() => {
    const inputs = Array(digits).fill(0);
    return inputs.map((_, index) => {
      return (
        <View style={styles.inputContainer(index === focusedBox)} key={index}>
          <TextInput
            ref={ref => (textInputRef.current[index] = ref)}
            keyboardType="numeric"
            value={otp[index]}
            style={styles.textInput}
            onChangeText={v => {
              focusNext(index, v);
            }}
            onFocus={() => {
              setFocusedBox(index);
              setOTP(otp => {
                otp[index] = '';
                return [...otp];
              });
              onFocus();  // Call the onFocus prop to hide heading and subheading

            }}
            onBlur={() => {
              if (index === focusedBox) {
                setFocusedBox(null);
              }
              onBlur();  // Call the onBlur prop to show heading and subheading

            }}
            onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
          />
        </View>
      );
    });
  }, [digits, otp, focusedBox]);

  return <View style={styles.container}>{textInput}</View>;
};

export default OTPInput;

const inputContainerStyle: any = (isSelected: boolean) => ({
  borderWidth: 1,
  borderColor: isSelected ? colors.primary : colors.grayLight,
  borderRadius: 4,
  width: moderateScale(50),
  paddingVertical: Platform.OS === 'android' ? 0 : 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.grayLight,
});

const styles = StyleSheet.create({
  inputContainer: inputContainerStyle,
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontSize: fontsize.large18,
    fontFamily: fonts.Normal,
    width: 70,
    textAlign: 'center',
    color:colors.GRey800
  },
});
