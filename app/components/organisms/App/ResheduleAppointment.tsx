import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppointmentDate from '@components/molecules/Dashboard/AppointmentDate';
import AppointmentTime from '@components/molecules/Dashboard/AppointmentTime';
import {
  useCreateAppointmentMutation,
  useRescheduleAppointmentMutation,
} from '@api/appointments';
import {toast} from '@utils';
// import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import {Sublabel} from '@components/atoms/SubLabel';
import {Label} from '@components/atoms/Label';
import Button from '@components/atoms/button/Button';
import {fontsize, colors} from '../../../themev1';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '@hooks/redux_hooks';
import {IResheduleAppointment} from '@types/components';
import DropDownPickerComp from '../ActionSheet/DropDownPickerComp';
import moment from 'moment';
import ActionSheet from '../ActionSheet/ActionSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ResheduleAppointment = ({
  AppointmentContent,
  id,
  onRefresh,
  showActionSheet,
  onClose,
  employeeId,
  rescheduledate
}: IResheduleAppointment) => {
  const dashboardData = useAppSelector(state => state?.dashboard);

  const [resheduleAppointments] = useRescheduleAppointmentMutation();
  const [createAppointments] = useCreateAppointmentMutation();
  const [openPicker, setOpenPicker] = useState('');
  const [purpose, setPurpose] = useState(AppointmentContent?.title);

  const [isSheetOpen, setIsSheetOpen] = useState(showActionSheet);
  const [showPicker, setShowPicker] = useState(false);
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date()); //moment(new Date()).format('MMM Do, YYYY')
  const [time, setTime] = useState(new Date()); //new Date()).format('HH:MM a')
  const [apptime, setappTime] = useState(moment(rescheduledate).format('HH:mm:ss'));
  const [appdate, setappDate] = useState(moment(rescheduledate).format('YYYY-MM-DD'));
  const [characterCount, setCharacterCount] = useState(0);

  const [selectedEmployee, setSelectedEmployee] = useState({id: employeeId});
  const dashboardState = useAppSelector(state => state?.dashboard);
  useEffect(() => {
    setIsSheetOpen(showActionSheet);
    setSelectedEmployee({id: employeeId});
    setDate(AppointmentContent?.selectedDateTime ?? new Date());
    setTime(AppointmentContent?.selectedDateTime ?? new Date());
    setPurpose(AppointmentContent?.title);
  }, [showActionSheet]);
  const [disabled, setDisabled] = useState(false);

  const onDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const onTimeChange = (selectedDate: Date) => {
    setTime(selectedDate);
    setShowPicker(false);
  };

  const handleChangeText = (text: string) => {
    setPurpose(text);
    setCharacterCount(text.length);
  };

  const onReshedule = async () => {
    if (!purpose) {
      return toast.failure('Please fill purpose');
    }
    if (!selectedEmployee?.id) {
      return toast.failure('Please select employee');
    }

  const appointmentTime = moment(time).format('hh:mm A');
    const datetime = formattedDate+' '+appointmentTime;
    const reqData = {
      client_id: dashboardState.activeClient.id,
      branch_id: dashboardState.activeBranch.id,
      datetime: datetime,
      emp_id: selectedEmployee?.id, //TO-DO NEED TO CONFIRM WHAT TO SEND HERE IE. id OR user_id
      
      purpose: purpose,
      status: selectedEmployee?.status, //1,//TO-DO NEED TO CONFIRM WHAT TO SEND HERE IE. status OR 1
      appointment_id: id,
    };

    if (id) {
      resheduleAppointment(reqData);
    } else {
      createNewAppointment(reqData);
    }
  };

  const createNewAppointment = async (reqData: Object) => {
    await createAppointments(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          toast.success(data?.message);
          clearFilledData();  
          onRefresh();
          onClose();
        } else {
          toast.failure(data?.message ?? 'Something went wrong!!!');
        }
      })
      .finally(() => {})
      .catch(e => {
        console.log('ERROR PENDING LIST', e);
      });
  };

  const clearFilledData = () => {
    setSelectedEmployee(undefined);
    setPurpose('');
    setCharacterCount(0);
  };

  const resheduleAppointment = async (reqData: Object) => {
    await resheduleAppointments(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          toast.success(data?.message);
          clearFilledData();
          onRefresh();
          onClose();
        } else {
          toast.failure(data?.message ?? 'Something went wrong!!!');
        }
      })
      .finally(() => {})
      .catch(e => {
        console.log('ERROR PENDING LIST', e);
      });
  };
  const toggleBottomSheet =()=>{
    setIsSheetOpen(false);
  }

  const closeResheduleActionSheet = () => {
    clearFilledData();
    setIsSheetOpen(false);
    setTime(new Date());
    onClose();
  };

  const onSelectEmp = (data: any) => {
    setSelectedEmployee(data);
  };

  const timeIsValid = time => {
    var momentDate = moment(time);


    const selectedTime = moment(time, 'YYYY-MM-DDTHH:MM:SSZ').format(
      'HH:MM:SS',
    );

    const dateA = moment(date, 'DD-MM-YYYY');
    const currentTime = new Date();
    const dateB = moment(currentTime, 'DD-MM-YYYY');
    const dateTimeDiff = dateA.diff(dateB, 'milliseconds');
    if (dateTimeDiff < 0) return time > currentTime;
    else return true;
  };

  const onOpen = pickername => {
    setOpenPicker(pickername);
  };

  const onClosePicker = () => {
    setOpenPicker('');
  };
  const formattedDate = moment(date).format("DD/MM/YYYY");


  const showResheduleAction = () => (
    <ActionSheet
      onClose={() => closeResheduleActionSheet()}
      isVisible={isSheetOpen}>
      <View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flexDirection:'row',}}>
          <Label
            size={'medium'}
            fontWeight={'semibold'}
            title={!id ? 'New Appointment' : 'Reschedule Appointment'}
            color={colors.GRey800}
            align={undefined}
          />
              </View>
          <Label
            size={'small'}
            fontWeight={'semibold'}
            title={'with ' + dashboardData.activeBranch?.branch_name}
            color={colors.Grey600}
            align={undefined}
          />
        </View>
        <View
          style={{
            marginVertical: moderateScale(27),
            marginHorizontal: moderateScale(-20),
          }}>
          <View style={{marginStart: moderateScale(44)}}>
            <Sublabel
              size={'small'}
              fontWeight={'bold'}
              fontStyle={'normal'}
              title={'Meet'}
              color={colors.Grey600}
              align={undefined}
            />
          </View>

          {/* <View style={{borderBottomWidth:0.3,borderColor:colors.Grey600}}> */}
          <DropDownPickerComp
            pickername={'selectemployee'}
            isOpen={openPicker === 'selectemployee'}
            onOpen={onOpen}
            onClose={onClosePicker}
            fieldLabel="emp_name"
            fieldValue="id"
            data={dashboardData.branchEmployees}
            placeholder="Select Employee"
            onItemChange={onSelectEmp}
            value={selectedEmployee?.id}
            containerStyle={{width: '100%'}}
            itemTextStyle={{color: colors.black}}
            arrowColor={colors.primary}
            onPickerPress={value => {}}
          />
          <View
            style={{
              borderBottomWidth: 0.3,
              borderColor: colors.Grey600,
              marginHorizontal: moderateScale(42),
            }}
          />
          {/* </View> */}
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
            <View style={{flex: 0.42}}>
              <Sublabel
                size={'small'}
                fontWeight={'bold'}
                fontStyle={'normal'}
                title={'Select Date'}
                color={colors.Grey600}
                align={undefined}
              />
              <TouchableOpacity
                style={{
                  marginRight: moderateScale(12),
                  marginTop: moderateScale(12),
                }}
                onPress={() => {
                  setShowDatePicker(true);
                }}>
                <AppointmentDate
                  color={colors.primary}
                  size={'small'}
                  fontWeight={'bold'}
                  fontStyle={'normal'}
                  title={date}
                  iconsize={14}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 0.4}}>
              <Sublabel
                size={'small'}
                fontWeight={'bold'}
                fontStyle={'normal'}
                title={'Select Time'}
                color={colors.Grey600}
                align={undefined}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPicker(true);
                }}
                style={{
                  marginLeft: moderateScale(2),
                  marginTop: moderateScale(12),
                }}>
                <AppointmentTime
                  color={colors.primary}
                  size={'small'}
                  fontWeight={'bold'}
                  fontStyle={'normal'}
                  title={time}
                  iconsize={14}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Sublabel
              size={'small'}
              fontWeight={'bold'}
              fontStyle={'normal'}
              title={'Purpose'}
              color={colors.Grey600}
              align={undefined}
            />
          </View>
          <TextInput
            placeholder="Write a purpose"
            placeholderTextColor={colors.Grey600}
            maxLength={100}
            value={purpose}
            onChangeText={handleChangeText}
            style={{color:colors.GRey800}}
          />
          <View style={{borderWidth: 0.3, borderColor: colors.Grey600}} />
          <View
            style={{
              position: 'absolute',
              right: moderateScale(10),
              bottom: moderateScale(80),
            }}>
            <Sublabel
              size={'small'}
              fontWeight={'bold'}
              fontStyle={'normal'}
              title={`${characterCount}/100`}
              color={colors.Grey600}
              align={undefined}
            />
          </View>

          <View>
            <Button
              label={'Submit Request'}
              onPress={onReshedule}
              containerStyle={{
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
              onPress={() => closeResheduleActionSheet()}
              containerStyle={{
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

          <DateTimePickerModal
            date={new Date()}
            isVisible={showDatepicker}
            mode={'date'}
            is24Hour={true}
            onConfirm={changedDate => {
              setShowDatePicker(false);
              if (changedDate) {
                onDateChange(changedDate);
              }
            }}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            timePickerModeAndroid="default"
            minimumDate={new Date()}
          />
          <DateTimePickerModal
            date={new Date()}
            isVisible={showPicker}
            mode={'time'}
            is24Hour={false}
            locale="en_GB"
            // onConfirm={onTimeChange}
            onConfirm={changedDate => {
              setShowPicker(false);
              onTimeChange(changedDate);
            }}
            onCancel={() => {
              setShowPicker(false);
            }}
            minimumDate={time ?? new Date()}
            timePickerModeAndroid="spinner"
          />
        </View>
      </View>
    </ActionSheet>
  );

  return <View style={styles.boardcontainer}>{showResheduleAction()}</View>;
};
const styles = ScaledSheet.create({
  boardcontainer: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
  },
  name: {
    marginLeft: moderateScale(8),
    flex: 1,
  },
  iconContainer: {
    backgroundColor: colors.SemGreen500,
    width: moderateScale(9),
    height: moderateScale(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  content: {
    marginVertical: moderateScale(12),
  },
  datentime: {
    flexDirection: 'row',
  },
  time: {
    marginLeft: moderateScale(8),
  },
  status: {
    marginLeft: moderateScale(76),
  },
  menu: {
    alignItems: 'flex-end',
  },
});

export default React.memo(ResheduleAppointment);
