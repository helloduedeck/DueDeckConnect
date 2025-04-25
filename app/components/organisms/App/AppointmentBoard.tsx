import React, {useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import CircleImage from '@components/atoms/Circleimage/CircleImage';
import AppointedConsultant from '@components/atoms/Dashboard/AppointedConsultant';
import AppointmentMenu from '@components/atoms/Dashboard/AppointmentMenu';
import AppointmentDate from '@components/molecules/Dashboard/AppointmentDate';
import AppointmentTime from '@components/molecules/Dashboard/AppointmentTime';
import AppointmentStatus from '@components/molecules/Dashboard/AppointmentStatus';
import AppointmentContent from '@components/molecules/Dashboard/ApointmentContent';
import AppointedEmployee from '@components/atoms/Dashboard/AppointedEmployee';
import {
  useAcceptAppointmentMutation,
  useRejectAppointmentMutation,
} from '@api/appointments';
import {toast} from '@utils';

import {colors} from '../../../themev1';

import {useAppSelector} from '@hooks/redux_hooks';
import ResheduleAppointment from './ResheduleAppointment';
import SubLabel from '@components/atoms/SubLabel/SubLabel';
import {Image} from 'react-native';

type IAppointmentBoardProps = {
  appointedEmployeeProps: any;
  circleImageProps: any;
  AppointmentContentPropType: any;
  AppointedConsultantPropsType: any;
  AppointmentStatusPropsType: any;
  AppointmentDatePropsType: any;
  AppointmentTimePropsType: any;
  id: string | number;
  onRefresh: () => void;
  ref: any;
  employeeId: string | number;
  status: boolean;
  selectedTab?: string | number;
  isLapsed?: number;
  canReject: boolean;
  canAccept: boolean;
};

const AppointmentBoard = ({
  appointedEmployeeProps,
  circleImageProps,
  AppointmentContentPropType,
  AppointedConsultantPropsType,
  AppointmentStatusPropsType,
  AppointmentDatePropsType,
  AppointmentTimePropsType,
  id,
  onRefresh,
  ref,
  status,
  onCancel,
  employeeId,
  selectedTab,
  isLapsed,
  canReject,
  canAccept,
}: IAppointmentBoardProps) => {
  const user = useAppSelector(state => state?.user.user);

  const [rejectAppointments] = useRejectAppointmentMutation();

  const [acceptAppointment] = useAcceptAppointmentMutation();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const showCancelConfirmationDialog = () => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure, want to cancel the appointment?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => onCancelAppointment()},
      ],
    );
  };

  const onAppointmentAccepted = async () => {
    const reqData = {
      appointment_id: id,
    };
    await acceptAppointment(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.failure(data?.message ?? 'Something went wrong!!!');
        }
      })
      .finally(() => {
        onRefresh();
      })
      .catch(e => {
        console.log('ERROR PENDING LIST', e);
      });
  };

  const onCancelAppointment = async () => {
    const reqData = {
      appointment_id: id,
    };
    await rejectAppointments(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.failure(data?.message ?? 'Something went wrong!!!');
        }
      })
      .finally(() => {
        onRefresh();
      })
      .catch(e => {
        console.log('ERROR PENDING LIST', e);
      });
  };
  const onReshedulAppointment = () => {
    setIsSheetOpen(true);
  };
  console.log(id, 'appoint id ');

  return (
    <View style={styles.boardcontainer}>
      {id && (
        <>
          <View style={styles.container}>
            <View>
              <CircleImage {...circleImageProps} />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.name}>
                <AppointedEmployee {...appointedEmployeeProps} />
                <AppointedConsultant {...AppointedConsultantPropsType} />
              </View>
              {status !== false && ( // Conditionally render AppointmentMenu
                <View style={styles.menu}>
                  {selectedTab === 2  && (
                    <AppointmentMenu
                      onResheduleAppointment={function (): void {
                        onReshedulAppointment();
                      }}
                      onCancelAppointment={function (): void {
                        showCancelConfirmationDialog();
                      }}
                      onAppointmentAccepted={function (): void {
                        onAppointmentAccepted();
                      }}
                      canReject={canReject}
                      canAccept={canAccept}
                    />
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={styles.content}>
            <AppointmentContent {...AppointmentContentPropType} />
          </View>

          <View style={styles.datentime}>
            <AppointmentDate {...AppointmentDatePropsType} />
            <View style={styles.time}>
              <AppointmentTime {...AppointmentTimePropsType} />
            </View>
            <View style={styles.status}>
              <AppointmentStatus {...AppointmentStatusPropsType} />
            </View>
          </View>
        </>
      )}

      {isSheetOpen && (
        <ResheduleAppointment
          AppointmentContent={{
            ...AppointmentContentPropType,
            selectedDateTime: AppointmentTimePropsType.title,
          }}
          onRefresh={function (): void {
            onRefresh();
          }}
          onClose={function (): void {
            setIsSheetOpen(false);
          }}
          id={id}
          employeeId={employeeId}
          showActionSheet={isSheetOpen}
        />
      )}

      {/* No appointment view  */}

      {!id && (
        <View
          style={{
            flexDirection: 'row',
            // marginTop: moderateScale(15),
            marginHorizontal: 15,
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            // width: '100%',
            flex: 1,
          }}>
          {/* //../../asset/Images/No_Appointment.png */}
          <View
            style={{
              marginLeft: moderateScale(8),
              justifyContent: 'center',
              paddingBottom: 10,
            }}>
            <Image
              source={require('../../../assets/images//No_Appointment.png')}
              width={63}
              height={63}
            />
          </View>
          <View
            style={{
              marginLeft: moderateScale(8),
              justifyContent: 'center',
            }}>
            <SubLabel
              size={'small'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={'You Have No Meetings'}
              color={undefined}
              align={undefined}
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  boardcontainer: {
    width: moderateScale(341),
    backgroundColor: colors.white,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    paddingBottom: moderateScale(20),
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
    position: 'absolute',
    bottom: moderateScale(1),
    right: moderateScale(7),

    // marginLeft: moderateScale(73),
  },
  menu: {
    alignItems: 'flex-end',
  },
});

export default React.memo(AppointmentBoard);
