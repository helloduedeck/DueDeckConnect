import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
// import { Sublabel } from '../atoms/SubLabel';
import {moderateScale} from 'react-native-size-matters';
import fontsize from '../../../themev1/fontstyle';
import {Sublabel} from '@components/atoms/SubLabel';
import {colors} from '../../../themev1';

const ProfileInputContact: React.FC = props => {
  return (
    <View style={styles.inputLabelContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.label}>
          <Sublabel
            size={'small'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Contact No'}
            color={undefined}
            align={undefined}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Number"
          maxLength={10}
          value={props.contactNumber}
          editable={false}
        />
      </View>
    </View>
  );
};
export default ProfileInputContact;

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
  },
  label: {
    position: 'absolute',
    top: -11,
    left: 25,
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
    color: `${colors.primary}13`, // Blue color for the button text
  },
});
