import React from 'react';
import {Platform, TextInput, TouchableOpacity, View} from 'react-native';
import {Sublabel} from '../../atoms/SubLabel';
import {colors} from '../../../themev1';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Fontisto';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IProps = {
  onTextChange: ((text: string) => void) | undefined;
  onSearch: () => void;
  onFilter: () => void;
  searchText: string;
};
const SearchBox: React.FC<IProps> = ({
  onTextChange,
  onSearch,
  onFilter,
  searchText,
}) => {
  return (
    <View style={{marginVertical: moderateScale(16),marginStart:moderateScale(18)}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.search}>
          <TextInput
            style={{flex: 1,color:colors.GRey800}} // Take up remaining space
            placeholder="Search services"
            placeholderTextColor={colors.payment}
            value={searchText}
            onChangeText={onTextChange}
            returnKeyType="search"
            // onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={onSearch}>
            <Ionicons name="search" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SearchBox;
const styles = ScaledSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    height: 40,
    // paddingBottom:moderateScale(7),
    paddingHorizontal: moderateScale(15),
    borderRadius: 12,
    flex: 0.95,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
