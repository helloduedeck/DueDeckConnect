import {Keyboard, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

type IProps = {
  isVisible: boolean;
  onClose: () => void;
  children: any;
  disableableClosePressingBackDrop?: boolean;
    overlayPointerEvents?:any // <-- Add this line
IsEditMode?:any
};

const ProfileActionSheet: React.FC<IProps> = ({
  isVisible,
  children,
  onClose,
  IsEditMode,
  disableableClosePressingBackDrop = false,
  overlayPointerEvents
}) => {
  const isPaymentPageOpened = useSelector(
    (state: any) => state.dashboard?.isPaymentPageOpened,
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '33%', '33%'], []);
  const [snapPoint, setsnapPoint] = useState('93%');

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef?.current?.present();
    } else {
      bottomSheetRef?.current?.close();
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
  // const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
  //   return <BottomSheetBackdrop {...props} pressBehavior={'close'} />;
  // }, []);
  const renderBackDrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={disableableClosePressingBackDrop ? 'collapse' : 'close'}
        {...props}
      />
    );
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={isPaymentPageOpened ? 3 : 1}
      snapPoints={snapPoints}
      handleComponent={() => {
        return null;
      }}
      backdropComponent={renderBackDrop}
      detached={true}
      onDismiss={onClose}
      enablePanDownToClose={true}>
      <TouchableOpacity
        style={{
          borderBottomWidth: moderateScale(4),
          marginVertical: moderateScale(15),
          marginStart: moderateScale(160),
          marginEnd: moderateScale(160),
          alignItems: 'center',
          borderRadius: moderateScale(18),
        }}
      />
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default ProfileActionSheet;
