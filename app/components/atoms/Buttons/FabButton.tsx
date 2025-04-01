import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {FabPropsType} from '../../../types/components';
import {colors} from '../../../themev1';

// import Circle from "../../molecules/Circle/Circle";
import Icon from 'react-native-vector-icons/FontAwesome';
// import fontsize from '../../../themev1/fonts';

import {Sublabel} from '@components/atoms/SubLabel';
import Circle from '@components/atoms/Circle/Circle';
import {Label} from '@components/atoms/Label';
import Button from '@components/atoms/button/Button';

import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import {FAB} from 'react-native-paper';
import ResheduleAppointment from '@components/organisms/App/ResheduleAppointment';
import fontsize from '../../../themev1/fontstyle';
import {useNewTaskRequestMutation} from '@api/services';
import {toast} from '@utils';
import {useAppSelector} from '@hooks/redux_hooks';

const FabButton = (props: FabPropsType) => {
  const dashboardState = useAppSelector(state => state?.dashboard);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showServiceView, setShowServiceView] = useState(false);
  const [showAppointmentView, setShowAppointmentView] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const [createNewTask] = useNewTaskRequestMutation();

  const [serviceNotes, setServiceNotes] = useState('');

  const {showServiceSheet, showAppointmentSheet, onRefresh} = props;

  useEffect(() => {
    if (showServiceSheet) {
      setShowServiceView(true);
    } else if (showAppointmentSheet) {
      setShowAppointmentView(true);
    }
  }, [props]);

  const toggleBottomSheet = () => {
    setIsSheetOpen(!isSheetOpen);
    setModalVisible(false);
  };

  const closeActionsheet = () => {
    setIsSheetOpen(false);
  };

  const handleChangeText = (text: string) => {
    setServiceNotes(text);
    setCharacterCount(text.length);
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

  const closeResheduleActionSheet = () => {
    setIsSheetOpen(false);
  };
  const onNewService = async () => {
    if (!serviceNotes) {
      return toast.failure('Please Enter Manadatory Field!!!');
    }

    const reqData: any = {
      task_note: serviceNotes,
    };

    await createNewTask(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          toast.success(data?.message);
          onRefresh?.();
        } else {
          toast.failure(data?.message ?? 'Please Enter Manadatory Fields!!!');
        }
      })
      .finally(() => {
        setServiceNotes('');
        setShowServiceView(false);
        props?.onSheetClose?.();
      })
      .catch(e => {
        toast.failure('Please Enter Manadatory Fields!!!');
      });
  };

  return (
    <View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            props?.onSheetClose?.();
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
                  align={undefined}
                />
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: moderateScale(10),
                  right: moderateScale(24),
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  props?.onSheetClose?.();
                }}>
                <Icon name="close" size={16} color={colors.GRey800} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  toggleBottomSheet(); // Open the bottom sheet
                  setShowServiceView(true);
                  setShowAppointmentView(false);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{flexDirection: 'row', padding: moderateScale(20)}}>
                    <View style={{marginRight: moderateScale(8)}}>
                      <Circle
                        size={'exsmall'}
                        background={`${colors.primary}20`}
                        iconName={'task-primary'}
                        iconColor={colors.primary}
                      />
                    </View>
                    <Sublabel
                      size={'large'}
                      fontWeight={'normal'}
                      fontStyle={'normal'}
                      title={'Task Request'}
                      color={colors.GRey800}
                      align={undefined}
                    />
                  </View>

                  <Icon
                    name="chevron-right"
                    size={16}
                    color={colors.primary}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  toggleBottomSheet(); // Open the bottom sheet
                  setShowServiceView(false);
                  setShowAppointmentView(true);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{flexDirection: 'row', padding: moderateScale(20)}}>
                    <View style={{marginRight: moderateScale(8)}}>
                      <Circle
                        size={'exsmall'}
                        background={`${colors.primary}20`}
                        iconName={'appointment-primary'}
                        iconColor={colors.primary}
                      />
                    </View>
                    <Sublabel
                      size={'large'}
                      fontWeight={'normal'}
                      fontStyle={'normal'}
                      title={'Appointment'}
                      color={colors.GRey800}
                      align={undefined}
                    />
                  </View>

                  <Icon
                    name="chevron-right"
                    size={16}
                    color={colors.primary}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <ResheduleAppointment
            AppointmentContent={undefined}
            onRefresh={() => onRefresh?.()}
            onClose={function (): void {
              setShowAppointmentView(false);
              props?.onSheetClose?.();
            }}
            showActionSheet={showAppointmentView}
          />
          <ActionSheet
            disableableClosePressingBackDrop={true}
            onClose={() => {
              setIsSheetOpen(false);
              props?.onSheetClose?.();
              closeActionsheet();
            }}
            isVisible={showServiceView}>
            <View>
              {/* view of New Service*/}
              {showServiceView && (
                <View>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Label
                      size={'medium'}
                      fontWeight={'semibold'}
                      title={'New Task Request'}
                      color={colors.GRey800}
                      align={undefined}
                    />
                    <Label
                      size={'small'}
                      fontWeight={'semibold'}
                      title={'From ' + dashboardState.activeBranch?.branch_name}
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
                    <TextInput
                      placeholder="Type"
                      maxLength={250}
                      value={serviceNotes}
                      onChangeText={handleChangeText}
                    />
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
                        title={`${characterCount}/250`}
                        color={undefined}
                        align={undefined}
                      />
                    </View>

                    <View>
                      <Button
                        label={'Submit Request'}
                        onPress={() => {
                          onNewService();
                        }}
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

                    <View style={{marginTop: -20}}>
                      <Button
                        label={'Cancel'}
                        onPress={() => {
                          setTimeout(() => {
                            closeActionsheet();
                            setShowServiceView(false);
                            setServiceNotes('');
                            props?.onSheetClose?.();
                          }, 150);
                        }}
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
            </View>
          </ActionSheet>
        </View>
      </View>
      <FAB
        style={{
          position: 'absolute',
          margin: 5,
          right: 20,
          bottom: 60,
          backgroundColor: colors.primary,
          borderRadius: 60,
        }}
        icon="plus"
        color="white"
        size="medium"
        onPress={() => setModalVisible(true)}
      />
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
    bottom: 10,
    left: 10,
  },
  mediumcircle: {
    height: moderateScale(90),
    width: moderateScale(90),

    borderRadius: moderateScale(45),

    backgroundColor: colors.primary, // Set blue background color
    position: 'absolute',
    bottom: 10,
    right: 10,
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
