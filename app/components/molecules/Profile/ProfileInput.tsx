import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
// import { Sublabel } from '../atoms/SubLabel';
import {moderateScale} from 'react-native-size-matters';
import Sublabel from '../../atoms/SubLabel/SubLabel';
import {colors} from '../../../themev1';
import fontsize from '../../../themev1/fontstyle';
// import { colors } from '../../themev1';

const ProfileInput: React.FC = props => {
  return (
    <View style={styles.inputLabelContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.label}>
          <Sublabel
            size={'small'}
            fontWeight={'bold'}
            fontStyle={'normal'}
            title={'Full Name'}
            color={colors.Grey600}
            align={undefined}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          maxLength={25}
          value={props.userName}
          editable={false}
        />
      </View>
    </View>
  );
};
export default ProfileInput;

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
    color:colors.GRey800
  },
  label: {
    position: 'absolute',
    top: -11,
    left: 26,
    paddingHorizontal: 5,
    fontSize: fontsize.medium14,
    color:colors.GRey800,
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
