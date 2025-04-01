import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {colors, fonts} from '../../theme';
import Text from '../text/Text';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../store';
import { moderateScale } from 'react-native-size-matters';
import fontsize from '../../theme/fontstyle';

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
};

const getMultiValue = (value: any[], data: any[]): any[] => {
  console.log('Value => ', value);
 

  return [];
};

const SimpleDropdown: React.FC<IProps> = ({
  data,
  fieldLabel,
  fieldValue,
  placeholder,
  label,
  value,
  isMultiSelect = false,
  onItemChange,
}) => {
  const dropdownId = useMemo(() => Math.random().toString(), []);
  const activeDropdown = useSelector((s: any) => s.general.activeDropdown);
  const dispatch = useDispatch();
  const onPress = (isOpen: any) => {
    if (isOpen) {
      dispatch(actions.general.setActiveDropdown(dropdownId));
    } else {
      dispatch(actions.general.unsetDropdown());
    }
  };

  return (
    <View
      style={[
        styles.container,
        {zIndex: activeDropdown === dropdownId ? 100 : 1},
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
        searchable={data.length > 5}
        placeholderStyle={styles.placeholderStyle}
        containerStyle={styles.container}
        textStyle={styles.textStyle}
        searchPlaceholder="Type here to filter list"
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchTextInput}
        dropDownDirection="TOP"
        dropDownContainerStyle={styles.dropDownContainer}
        style={styles.dropdown}
        placeholder={placeholder}
        setValue={() => {}}
        onSelectItem={onItemChange}
        value={isMultiSelect ? getMultiValue(value, data) : value}
      />


      
    </View>
  );
};

export default SimpleDropdown;

const styles = StyleSheet.create({
  dropDownContainer: {
    // overflow:'scroll',
    borderWidth: 0.5,
    borderRadius: 4,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: colors.charcoal,
    
  },
  searchTextInput: {
    borderWidth: 0,
  },
  searchContainer: {
    borderBottomWidth: 0.5,
    padding: moderateScale(5),
    paddingVertical: moderateScale(5),
    borderBottomColor: colors.charcoal,
  },
  container: {
    paddingTop: moderateScale(10),
  },
  dropdown: {
    // height: 30,
    // height: 20,
    minHeight: moderateScale(45),
    borderWidth: 0.5,
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    borderColor: colors.charcoal,
    // overflow:'scroll'
  },
  textStyle: {
    fontFamily: fonts.Normal,
    fontSize:fontsize.medium14,
    color: colors.charcoal,
  },
  selectedTextStyle: {
    color: colors.black,
  },
  label: {
    paddingBottom: moderateScale(5),
    opacity: 0.8,
  },
  placeholderStyle: {
    fontFamily: fonts.Normal,
    fontSize:fontsize.medium14,
    color: colors.charcoal,
  },
});
