import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
// import {actions} from '../../store';
import {moderateScale} from 'react-native-size-matters';
import Text from '@components/text/Text';
import {colors, fonts} from '@theme';
import fontsize from '@theme/fontstyle';

type IProps = {
  data: Array<any>;
  fieldLabel: string;
  fieldValue: string;
  placeholder?: string;
  label?: string;
  value: any;
  onItemChange?: (item: any) => void;
  isMultiSelect?: boolean;
  zIndex?: number;
  disabled?: boolean;
};

const getMultiValue = (value: any[], data: any[]): any[] => {
  console.log('Value => ', value);
  // const newData = value.map((item: any) => {
  //   // data.find(elm  )

  //   return {};
  // });

  return [];
};

const Dropdown: React.FC<IProps> = ({
  data,
  fieldLabel,
  fieldValue,
  placeholder,
  label,
  value,
  isMultiSelect = false,
  disabled = label == 'Financial year' ? true : false,
  onItemChange,
}) => {
  const dropdownId = useMemo(() => Math.random().toString(), []);
  const activeDropdown = useSelector((s: any) => s?.general?.activeDropdown);
  const dispatch = useDispatch();
  const onPress = (isOpen: any) => {
    if (isOpen) {
      // dispatch(actions.general.setActiveDropdown(dropdownId));
    } else {
      // dispatch(actions.general.unsetDropdown());
    }
  };

  // const isTopDropdown = true;

  return (
    <View
      style={[
        styles.container,
        {zIndex: activeDropdown && activeDropdown === dropdownId ? 100 : 1},
      ]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <DropDownPicker
        items={data}
        schema={{
          label: fieldLabel,
          value: fieldValue,
        }}
        open={activeDropdown === dropdownId}
        setOpen={onPress}
        searchable={data?.length > 5}
        placeholderStyle={styles.placeholderStyle}
        textStyle={styles.textStyle}
        listItemLabelStyle={styles.dropdownItemText}
        searchPlaceholder="Type here to filter list"
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchTextInput}
        dropDownContainerStyle={{
          borderColor: colors.gray, // Specify the border color here
          // Other styles can be added here as well
        }}
        dropDownDirection="TOP"
        style={[
          styles.dropdown,
          {backgroundColor: disabled ? colors.grayLight : colors.white},
        ]}
        placeholder={placeholder}
        setValue={() => {}}
        onSelectItem={onItemChange}
        value={isMultiSelect ? getMultiValue(value, data) : value}
        selectedItemContainerStyle={styles.selectedItemContainer} // Apply custom style for selected item
        selectedItemLabelStyle={styles.selectedItemLabel} // Apply custom style for selected item label
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  scrollContentContainer: {},
  dropdownItemText: {
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium15,
    color: colors.GRey800, // Set the color to a lighter shade
    fontWeight: 'normal', // Set the font weight to normal if needed
    paddingVertical: moderateScale(0),
  },
  selectedItemContainer: {
    backgroundColor: colors.primary, // Set the background color for selected item
    borderRadius: moderateScale(5),
    borderWidth: 2, // Add a border width
    borderColor: colors.primaryLight, // Set the border color to a lighter shade of the background color
    flexDirection: 'row', // Align content horizontally
    justifyContent: 'space-between', // Distribute space between children
    alignItems: 'center', // Center align content vertically
  },
  selectedItemLabel: {
    color: colors.white, // Set the text color for selected item label
    fontSize: fontsize.medium15,
    fontWeight: 'bold',
  },
  dropDownContainer: {},
  searchTextInput: {
    borderWidth: 0,
    fontSize: fontsize.medium,
  },
  searchContainer: {
    borderBottomWidth: 0.5,
    padding: moderateScale(5),
    paddingVertical: moderateScale(5),
    borderBottomColor: colors.charcoal,
  },
  container: {},
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  dropdown: {
    minHeight: moderateScale(40),
    borderBottomWidth: 1,
    paddingHorizontal: moderateScale(15),
    borderColor: colors.white,
  },
  textStyle: {
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium15,
    color: colors.GRey800,
    fontWeight: '700',
  },
  selectedTextStyle: {
    color: colors.black,
  },
  label: {
    color: colors.grayMedium,
    paddingTop: moderateScale(4),
    marginStart: moderateScale(16),
    opacity: 0.8,
    fontSize: fontsize.medium,
  },
  placeholderStyle: {
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium,
    color: colors.charcoal,
  },
});
