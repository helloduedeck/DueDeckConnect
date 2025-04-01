import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';

interface DropdownBottomSheetProps {
  data: { label: string; value: any }[];
  onItemSelected: (item: { label: string; value: any }) => void;
  isVisible: boolean;
  onClose: () => void;
}

const DropdownBottomSheet: React.FC<DropdownBottomSheetProps> = ({
  data,
  onItemSelected,
  isVisible,
  onClose,
}) => {
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: any } | null>(null);

  const handleItemSelected = (item: { label: string; value: any }) => {
    setSelectedItem(item);
    onItemSelected(item);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
      <View>
      
        <FlatList
          data={data}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemSelected(item)}>
              <View>
                <Text>{item.label}</Text>
             
              </View>
            </TouchableOpacity>
          )}
        />

        {/* You can also add a close button or any other controls */}
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DropdownBottomSheet;

