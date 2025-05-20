import React, {useState} from 'react';
import {View, Text, Modal, TextInput, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '../../themev1';
import {FabPropsType} from '../../types/components';

// import Circle from "../../molecules/Circle/Circle";
import Icon from 'react-native-vector-icons/FontAwesome';
import fontsize from '../../themev1/fontstyle';

import {Sublabel} from '@components/atoms/SubLabel';
import Circle from '@components/atoms/Circle/Circle';
import {Label} from '@components/atoms/Label';
import Button from '@components/atoms/button/Button';
import Dropdown from '@components/molecules/dropdown/Dropdown';
import AppointmentDate from '@components/molecules/Dashboard/AppointmentDate';
import AppointmentTime from '@components/molecules/Dashboard/AppointmentTime';
import ActionSheet from '@components/atoms/actionSheet/ActionSheet';

const FabButton = (props: FabPropsType) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showServiceView, setShowServiceView] = useState(false);
  const [showAppointmentView, setShowAppointmentView] = useState(false);

  const toggleBottomSheet = () => {
    setIsSheetOpen(!isSheetOpen);
    setModalVisible(false);
  };

  const onApplyFilterPress = () => {
    setIsSheetOpen(false);
  };
  const dropdownData = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  const renderServiceView = () => {
    setShowServiceView(true);
    setShowAppointmentView(false);
  };

  const renderAppointmentView = () => {
    setShowServiceView(false);
    setShowAppointmentView(true);
  };
  let Fabsizes;
  switch (props.size) {
    case 'small':
      Fabsizes = styles.smallcircle;
      break;
    case 'medium':
    default:
      Fabsizes = styles.mediumcircle;
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={Fabsizes}>
          <MaterialCommunityIcons name="plus" size={30} color={colors.white} />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.title}>
              <Sublabel
                size={'large'}
                fontWeight={'semibold'}
                fontStyle={'normal'}
                title={'New'}
                color={colors.GRey800}
                align={undefined}></Sublabel>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: moderateScale(10),
                right: moderateScale(24),
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" size={16} color={colors.GRey800} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', padding: moderateScale(20)}}>
                <View style={{marginRight: moderateScale(8)}}>
                  <Circle
                    size={'exsmall'}
                    background={colors.primary}
                    iconName={'tasklist-white'}
                    iconColor={colors.primary}
                  />
                </View>
                <Sublabel
                  size={'large'}
                  fontWeight={'normal'}
                  fontStyle={'normal'}
                  title={'Service'}
                  color={colors.GRey800}
                  align={undefined}></Sublabel>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  toggleBottomSheet(); // Open the bottom sheet
                  setShowServiceView(true);
                  setShowAppointmentView(false);
                }}>
                <Icon
                  name="chevron-right"
                  size={16}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', padding: moderateScale(20)}}>
                <View style={{marginRight: moderateScale(8)}}>
                  <Circle
                    size={'exsmall'}
                    background={colors.primary}
                    iconname={'appointment-white'}
                    iconColor={colors.primary}
                  />
                </View>
                <Sublabel
                  size={'large'}
                  fontWeight={'normal'}
                  fontStyle={'normal'}
                  title={'Appointment'}
                  color={colors.GRey800}
                  align={undefined}></Sublabel>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  toggleBottomSheet(); // Open the bottom sheet
                  setShowServiceView(false);
                  setShowAppointmentView(true);
                }}>
                <Icon
                  name="chevron-right"
                  size={16}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <ActionSheet
          onClose={() => setIsSheetOpen(false)}
          isVisible={isSheetOpen}>
          <View>
            {/* view of New Service*/}
            {showServiceView && (
              <View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Label
                    size={'medium'}
                    fontWeight={'semibold'}
                    title={'New Service'}
                    color={colors.GRey800}
                    align={undefined}
                  />
                  
                  <Label
                    size={'small'}
                    fontWeight={'semibold'}
                    title={'From VSAP & Company'}
                    color={colors.Grey600}
                    align={undefined}
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: moderateScale(23),
                    marginVertical: moderateScale(30),
                  }}>
                  <Sublabel
                    size={'small'}
                    fontWeight={'bold'}
                    fontStyle={'normal'}
                    title={'Service You Are Looking For'}
                    color={undefined}
                    align={undefined}
                  />
                  <TextInput placeholder="Type" maxLength={250} />
                  <View
                    style={{
                      borderWidth: 0.3,
                      borderColor: colors.Grey600,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: moderateScale(10),
                      bottom: moderateScale(95),
                    }}>
                    <Sublabel
                      size={'small'}
                      fontWeight={'bold'}
                      fontStyle={'normal'}
                      title={'0/250'}
                      color={undefined}
                      align={undefined}
                    />
                  </View>

                  <View>
                    <Button
                      label={'Submit Request'}
                      onPress={() => {}}
                      containerStyle={{
                        height: moderateScale(36),
                        marginVertical: moderateScale(30),
                        backgroundColor: colors.primary,
                        borderColor: colors.date,
                      }}
                      labelStyle={{
                        color: colors.white,
                        fontWeight: 'semibold',
                        fontSize: fontsize.medium,
                      }}
                    />
                  </View>

                  <View>
                    <Button
                      label={'Cancel'}
                      onPress={() => {}}
                      containerStyle={{
                        height: moderateScale(36),
                        marginVertical: moderateScale(0),
                        backgroundColor: colors.Buttongrey,
                        borderColor: colors.date,
                      }}
                      labelStyle={{
                        color: colors.Grey600,
                        fontWeight: 'semibold',
                        fontSize: fontsize.medium,
                      }}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* view of New Appointment  */}
            {showAppointmentView && (
              <View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Label
                    size={'medium'}
                    fontWeight={'semibold'}
                    title={'New Appointment'}
                    color={colors.GRey800}
                    align={undefined}></Label>
                  <Label
                    size={'small'}
                    fontWeight={'semibold'}
                    title={'with VSAP & Company'}
                    color={colors.Grey600}
                    align={undefined}></Label>
                </View>
                <View style={{marginVertical: moderateScale(27)}}>
                  <View style={{marginStart: moderateScale(23)}}>
                    <Sublabel
                      size={'small'}
                      fontWeight={'bold'}
                      fontStyle={'normal'}
                      title={'Meet'}
                      color={undefined}
                      align={undefined}></Sublabel>
                  </View>
                  <Dropdown
                    data={dropdownData}
                    value={selectedOption}
                    onItemChange={value => setSelectedOption(value)}
                    containerStyle={{width: '100%'}} // Adjust width as needed
                    itemTextStyle={{color: colors.black}} // Adjust text color
                    arrowColor={colors.primary}
                  />
                </View>

                <View
                  style={{
                    marginHorizontal: moderateScale(23),
                    marginVertical: moderateScale(-20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: moderateScale(1),
                      marginBottom: moderateScale(20),
                    }}>
                    <View style={{flex: 0.4}}>
                      <Sublabel
                        size={'small'}
                        fontWeight={'bold'}
                        fontStyle={'normal'}
                        title={'Select Date'}
                        color={undefined}
                        align={undefined}></Sublabel>
                      <View style={{marginVertical: moderateScale(6)}}>
                        <AppointmentDate
                          color={undefined}
                          size={'small'}
                          fontWeight={'bold'}
                          fontStyle={'normal'}
                          title={'Mar 4, 2024'}
                        />
                      </View>
                    </View>

                    <View style={{flex: 0.4}}>
                      <Sublabel
                        size={'small'}
                        fontWeight={'bold'}
                        fontStyle={'normal'}
                        title={'Select Time'}
                        color={undefined}
                        align={undefined}></Sublabel>
                      <View style={{marginVertical: moderateScale(6)}}>
                        <AppointmentTime
                          color={undefined}
                          size={'small'}
                          fontWeight={'bold'}
                          fontStyle={'normal'}
                          title={'10:00 pm'}
                        />
                      </View>
                    </View>
                  </View>

                  <View>
                    <Sublabel
                      size={'small'}
                      fontWeight={'bold'}
                      fontStyle={'normal'}
                      title={'Purpose'}
                      color={undefined}
                      align={undefined}></Sublabel>
                  </View>
                  <TextInput placeholder="Type" maxLength={250} />
                  <View
                    style={{
                      borderWidth: 0.3,
                      borderColor: colors.Grey600,
                    }}></View>
                  <View
                    style={{
                      position: 'absolute',
                      right: moderateScale(10),
                      bottom: moderateScale(95),
                    }}>
                    <Sublabel
                      size={'small'}
                      fontWeight={'bold'}
                      fontStyle={'normal'}
                      title={'0/250'}
                      color={undefined}
                      align={undefined}></Sublabel>
                  </View>

                  <View>
                    <Button
                      label={'Submit Request'}
                      onPress={() => {}}
                      containerStyle={{
                        height: moderateScale(36),
                        marginVertical: moderateScale(30),
                        backgroundColor: colors.primary,
                        borderColor: colors.date,
                      }}
                      labelStyle={{
                        color: colors.white,
                        fontWeight: 'semibold',
                        fontSize: fontsize.medium,
                      }}
                    />
                  </View>

                  <View>
                    <Button
                      label={'Cancel'}
                      onPress={() => {}}
                      containerStyle={{
                        height: moderateScale(36),
                        marginVertical: moderateScale(-20),
                        backgroundColor: colors.Buttongrey,
                        borderColor: colors.date,
                      }}
                      labelStyle={{
                        color: colors.Grey600,
                        fontWeight: 'semibold',
                        fontSize: fontsize.medium,
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </ActionSheet>
      </View>
    </View>
  );
};

export default FabButton;

const styles = ScaledSheet.create({
  smallcircle: {
    height: moderateScale(48),
    width: moderateScale(48),

    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, // Set blue background color
    position: 'absolute',
    bottom: 140,
    left: 125,
  },
  mediumcircle: {
    height: moderateScale(90),
    width: moderateScale(90),

    borderRadius: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, // Set blue background color
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 327,
    height: 178,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 30,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIcon: {
    fontSize: 20,
  },
  icon: {
    marginEnd: moderateScale(24),
  },
  title: {
    position: 'absolute',
    top: moderateScale(10),
    left: moderateScale(24),
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: 'black',
    marginHorizontal: moderateScale(24),
  },
});
