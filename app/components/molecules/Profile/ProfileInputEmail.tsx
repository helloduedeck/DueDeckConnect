import {Sublabel} from '@components/atoms/SubLabel';
import {colors, fontsize} from '../../../themev1';

import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const ProfileInputEmail: React.FC = props => {
  const handleLabelChange = () => {
    // Handle label change logic here
    console.log('Label changed');
  };
  return (
    <View style={styles.inputLabelContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.label}>
          <Sublabel
            size={'small'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Email ID'}
            color={undefined}
            align={undefined}></Sublabel>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          maxLength={255}
          value={props.email}
          editable={false}
        />
      </View>
      <TouchableOpacity
        style={styles.changeLabelButton}
        onPress={handleLabelChange}
        disabled>
        <View style={styles.changeLabelButtonText}>
          <Sublabel
            size={'small'}
            fontWeight={'semibold'}
            fontStyle={'normal'}
            //title={'Change'}
            color={colors.gray}
            align={undefined} title={''}></Sublabel>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileInputEmail;

const styles = StyleSheet.create({
  inputLabelContainer: {
    marginBottom: moderateScale(8),
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: moderateScale(40),
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: moderateScale(16),
    borderColor: colors.profileinput,
    backgroundColor: 'white',
    // marginHorizontal: moderateScale(24),
  },
  label: {
    position: 'absolute',
    top: -11,
    left: 26,
    paddingHorizontal: 5,
    fontSize: fontsize.medium14,
    color: '#666',
    backgroundColor: 'white',
    zIndex: 1, // Ensure the label is above the border
  },
  changeLabelButton: {
    position: 'absolute',
    top: moderateScale(6),
    right: moderateScale(30),
    padding: 5,
  },
  changeLabelButtonText: {
    fontSize: fontsize.medium,
    color: `${colors.primary}93`, // Blue color for the button text
  },
});
