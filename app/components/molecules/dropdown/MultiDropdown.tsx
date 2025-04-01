import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {colors, fonts} from '../../theme';
import Text from '../text/Text';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../store';
import {
  Dropdown as EDropdown,
  MultiSelect as EMultiSelect,
} from 'react-native-element-dropdown';
import fontsize from '../../theme/fontstyle';
import { moderateScale } from 'react-native-size-matters';

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

const MultiDropdown: React.FC<IProps> = ({
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
      {React.createElement(isMultiSelect ? EMultiSelect : EDropdown, {
        style: styles.dropdown,
      
      
        placeholderStyle: styles.placeholderStyle,
        selectedTextStyle: [styles.textStyle, styles.selectedTextStyle],
        itemTextStyle: styles.textStyle,
 
        data: data,
        maxHeight: 140,
        labelField: fieldLabel,
        dropDownDirection: 'TOP',
        valueField: fieldValue,
        placeholder: placeholder,
        value: value,
        dropDownIcon:styles.dropdown11,
        activeColor: colors.grayLight,
        onChange: onItemChange,
        // inside: true,

        renderSelectedItem: () => {
          return <View></View>;
        },
      })}
    
    </View>
  );
};

export default MultiDropdown;

const styles = StyleSheet.create({
  dropDownContainer: {
    borderWidth: 0.5,
    borderRadius: moderateScale(4),
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
  dropdown11:{
    fontSize:fontsize.medium,
    color:colors.red
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
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    borderColor: colors.charcoal,
  },
  textStyle: {
    fontFamily: fonts.Normal,
    fontSize: fontsize.medium15,
    color: colors.GRey800,
    fontWeight:'500'
  },
  selectedTextStyle: {
    color: colors.black,
  },
  label: {
    paddingBottom: moderateScale(5),
    color:colors.grayMedium,
    marginStart:moderateScale(12),
    opacity: 0.8,
    fontSize: fontsize.medium,
  },
  placeholderStyle: {
    fontFamily: fonts.Normal,
    fontSize: fontsize.Regular5,
    color: colors.charcoal,
  },
});
