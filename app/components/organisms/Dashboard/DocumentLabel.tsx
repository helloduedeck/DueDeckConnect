import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '@theme';
import DocumentAlert from '@components/molecules/Dashboard/DocumentAlert';
import DocumentStatus from '@components/atoms/Dashboard/DocumentStatus';

interface DocumentLabelPropsType {
  DocumentAlertPropsType: any;
  DocumentStatusPropsType: any;
  onPress: () => void;
}

const DocumentLabel = ({
  DocumentAlertPropsType,
  DocumentStatusPropsType,
  onPress,
}: DocumentLabelPropsType) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.rowContainer}>
        <DocumentAlert {...DocumentAlertPropsType} />
        <View style={styles.center}>
          <DocumentStatus {...DocumentStatusPropsType} />
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.chevronContainer}>
            <Icon name="chevron-right" size={16} color={colors.Grey600} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentLabel;

const styles = ScaledSheet.create({
  container: {
    margin: moderateScale(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Doclabel,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(15),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    right: moderateScale(30),
  },
  chevronContainer: {
    marginLeft: 'auto',
    paddingEnd: moderateScale(10),
  },
});
