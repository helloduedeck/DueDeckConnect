import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ServiceCardPropsType} from '../../../types/components';
import ActionSheet from './ActionSheet';
import {Label} from '@components/atoms/Label';
import {colors} from '../../../themev1';

type IProps = {
  actionSheetVisible: boolean;
  closeActionSheet: () => void;
  onDone: () => void;
};

const SearchFilter: React.FC<IProps> = ({
  actionSheetVisible,
  closeActionSheet,
  onDone,
}) => {
  return (
    <ActionSheet isVisible={actionSheetVisible} onClose={closeActionSheet}>
      <View>
        <View
          style={{
            paddingLeft: moderateScale(30),
            padding: moderateScale(16),
            borderBottomWidth: 1,
            borderColor: colors.strokeW,
          }}>
          <Label
            size={'small'}
            fontWeight={'bold'}
            title={'All Task Filter'}
            color={colors.GRey800}
          />
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(16),
          }}></View>
      </View>
    </ActionSheet>
  );
};

export default SearchFilter;
