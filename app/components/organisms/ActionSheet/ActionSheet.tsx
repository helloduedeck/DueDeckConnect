import {Keyboard, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

type IProps = {
  isVisible: boolean;
  onClose: () => void;
  children: any;
};

const ActionSheet: React.FC<IProps> = ({isVisible, children, onClose}) => {
  const isPaymentPageOpened = true;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '50%', '60%', '76%',], []);
  const [snapPoint, setsnapPoint] = useState('53%');

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current.close();
    }
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('true');
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setsnapPoint('50%');

        console.log('false');
      },
    );
    //
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isVisible]);

  const handleGestureEvent = useCallback(
    (event: {nativeEvent: {translationX: number}}) => {
      if (
        event.nativeEvent.translationX > 50 ||
        event.nativeEvent.translationX < -50
      ) {
        onClose();
      }
    },
    [onClose],
  );
  // renders
  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop {...props} pressBehavior={'close'} />;
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={isPaymentPageOpened ? 3 : 1}
      snapPoints={snapPoints}
      enablePanDownToClose={false} // disables pull-down gesture to close
      handleComponent={() => {
        return null;
      }}
      backdropComponent={renderBackdrop}
      detached={true}
onDismiss={() => {
  onClose(); // This should set isVisible = false in parent
}}
      >
      <TouchableOpacity
        style={{
          borderBottomWidth: moderateScale(4),
          marginVertical: moderateScale(15),
          marginStart: moderateScale(160),
          marginEnd: moderateScale(160),
          alignItems: 'center',
          borderRadius: moderateScale(18),
        }}></TouchableOpacity>

      {children}
    </BottomSheetModal>
  );
};

export default ActionSheet;
