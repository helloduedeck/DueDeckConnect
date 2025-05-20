import {FlatList, Keyboard, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Text from '@components/atoms/Text'; // Assuming Text is your custom component

type IProps = {
  isVisible: boolean;
  onClose: () => void;
  data: any[]; // data for the options
  selectedItem: any;
  onItemChange: (item: any) => void;
  label: string; // label for the action sheet
};

const ActionSheetFilter: React.FC<IProps> = ({
  isVisible,
  data,
  selectedItem,
  onItemChange,
  label,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '70%', '80%'], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef?.current?.present();
    } else {
      bottomSheetRef?.current?.close();
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      console.log('Keyboard Opened');
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      console.log('Keyboard Closed');
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isVisible]);

  const renderBackDrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={'close'}
        {...props}
      />
    );
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackDrop}
      onDismiss={onClose}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={{padding: 20}}>
        {/* Header Section */}
        <View style={{alignItems: 'center', marginBottom: 15}}>
          <Text style={{fontSize: 18}}>{label}</Text>
        </View>

        {/* List of Items */}
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                onItemChange(item);
                onClose(); // Close action sheet when item is selected
              }}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}
            >
              <Text style={{fontSize: 16, color: '#333'}}>{item.branch_name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ActionSheetFilter;
