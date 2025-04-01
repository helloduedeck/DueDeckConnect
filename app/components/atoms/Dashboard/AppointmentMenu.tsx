import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../themev1';
import {Sublabel} from '../SubLabel';
import {IAppointmentMenuProps} from '@types/components';
const AppointmentMenu = ({
  onResheduleAppointment,
  onCancelAppointment,
  onAppointmentAccepted,
  canReject,
  canAccept,
}: IAppointmentMenuProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const popoverRef = useRef(null);
  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const handleOptionSelection = (option: string) => {
    handlePress();
    setSelectedOption(option);
    if (option === 'Reschedule') {
      onResheduleAppointment();
    } else if (option === 'Accept') {
      onAppointmentAccepted();
    } else if (option === 'Cancel') {
      onCancelAppointment();
    }
  };

  const closePopover = () => {
    setIsPressed(isPressed);
  };

  return (
    <TouchableWithoutFeedback onPress={closePopover}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            borderRadius: 50,
            backgroundColor: isPressed ? colors.profileinput : 'transparent',
          }}>
          <View>
            <MaterialCommunityIcons
              name={'dots-vertical'}
              color={colors.Grey600}
              size={16}
            />
          </View>
        </TouchableOpacity>
        {isPressed && (
          <View style={styles.popoverContainer} ref={popoverRef}>
            {canAccept && (
              <TouchableOpacity
                onPress={() => handleOptionSelection('Accept')}
                style={[
                  styles.option,
                  selectedOption === 'Accept' && styles.selectedOption,
                ]}>
                <Sublabel
                  size={'small'}
                  fontWeight={'semibold'}
                  fontStyle={'normal'}
                  title={'Accept'}
                  color={colors.GRey800}
                  align={undefined}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => handleOptionSelection('Reschedule')}
              style={[
                styles.option,
                selectedOption === 'Reschedule' && styles.selectedOption,
              ]}>
              <Sublabel
                size={'small'}
                fontWeight={'semibold'}
                fontStyle={'normal'}
                title={'Reschedule'}
                color={colors.GRey800}
                align={undefined}
              />
            </TouchableOpacity>
            {canReject && (
              <TouchableOpacity
                onPress={() => handleOptionSelection('Cancel')}
                style={[
                  styles.option,
                  selectedOption === 'Cancel' && styles.selectedOption,
                ]}>
                <Sublabel
                  size={'small'}
                  fontWeight={'semibold'}
                  fontStyle={'normal'}
                  title={'Cancel'}
                  color={colors.GRey800}
                  align={undefined}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  popoverContainer: {
    position: 'absolute',
    top: -1, // adjust the top position as per your need
    right: 18,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingVertical: 4,
    zIndex: 1,
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
    }), // to make sure popover is above other components
  },
  option: {
    height: 24,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: colors.Grey600,
  },
  selectedOption: {
    backgroundColor: colors.profileinput,
  },
});

export default AppointmentMenu;
