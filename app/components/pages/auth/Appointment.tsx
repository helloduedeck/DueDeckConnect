import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
// import { TopTab} from '../../components';
import Container from '@components/atoms/Container';

import {
  useSheduledAppointmentMutation,
  usePendingAppointmentsMutation,
  useRejectedAppointmentsMutation,
  useClosedAppointmentsMutation,
  useBranchEmployeesMutation,
} from '@api/appointments';
import {useAppDispatch, useAppSelector} from '@hooks/redux_hooks';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Text from '@components/atoms/Text';

import Content from '@components/content/Content';
import {useSharedValue} from 'react-native-reanimated';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import AppointmentBoard from '@components/organisms/App/AppointmentBoard';
import {FAB} from 'react-native-paper';
import {setBranchEmployess} from '@store/slices/dashboardSlice';

import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import {Sublabel} from '@components/atoms/SubLabel';
import {Label} from '@components/atoms/Label';
import Dropdown from '../ActionSheet/Dropdown';
import Button from '@components/atoms/button/Button';
import ResheduleAppointment from '@components/organisms/App/ResheduleAppointment';
import colors from '../../../themev1/colors';
import fontsize from '../../../themev1/fontstyle';
import {useFocus} from '@utils/useFocus';
import FeatureDisableComp from '@components/molecules/TopHeader/FeatureDisableComp';
import { getHeaderText } from '@components/organisms/ServiceItem/ServiceItemCard';

const tabs = [
  {
    id: 1,
    name: 'Scheduled',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Pending,
  },
  {
    id: 2,
    name: 'Pending',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Completed,
  },
  {
    id: 3,
    name: 'Rejected',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Cancelled,
  },
  {
    id: 4,
    name: 'Closed',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Cancelled,
  },
];
const Appointment = () => {
  const dashboardState = useAppSelector(state => state?.dashboard);

  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [listCount, setListCount] = useState(0);

  const [showResheduleSheet, setShowResheduleSheet] = useState(false);
  const [sheduledAppointments] = useSheduledAppointmentMutation();
  const [pandingAppointments] = usePendingAppointmentsMutation();
  const [rejectedAppointments] = useRejectedAppointmentsMutation();
  const [closedAppointments] = useClosedAppointmentsMutation();

  const [getBranchesEmployee] = useBranchEmployeesMutation();

  const [moduleStatus, setModuleStatus] = useState();
  const [packagesDisbaleMessage, setPackageDisableMessage] = useState();

  const dispatch = useAppDispatch();

  const {isFocused} = useFocus();

  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );

  const viewableItems = useSharedValue<ViewToken[]>([]);
  const user = useAppSelector(state => state.user?.user);

  useEffect(() => {
    if (isFocused) {
      setSelectedId(1);
      getListData();
    }
  }, [isFocused]);

  const getListData = async () => {
    setIsLoading(true);

    const request = {
      client_id: dashboardState?.activeClient?.id,
      branch_id: dashboardState?.activeBranch?.id,
      sortstatus: 'desc',
    };
    console.log('requestrequest ', request);
    if (selectedId === 1) {
      await sheduledAppointments()
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.module_status === 1 ? data?.data?.length : 0);
            setModuleStatus(data?.module_status); //
            setPackageDisableMessage(
              data?.module_message ?? 'This feature is not enabled',
            );
          } else {
            setListData([]);
            setListCount(0);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          setListData([]);
          setListCount(0);

          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 2) {
      await pandingAppointments(request)
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          setListData([]);
          setListCount(0);

          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 3) {
      await rejectedAppointments(request)
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          setListData([]);
          setListCount(0);

          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 4) {
      await closedAppointments(request)
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          setListData([]);
          setListCount(0);

          console.log('ERROR PENDING LIST', e);
        });
    }
  };

  useEffect(() => {
    getListData();
  }, [selectedId]);

  const onListRefresh = () => {
    getListData();
  };

  const onTabSelect = (id: number) => {
    if (id != selectedId) {
      setListCount(0);
    }
    setSelectedId(id);
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  return (
    <Container isSubLabel={true} backLabel={['Dashboard', 'Notice']}>
      <CustomHeader title="Appointment" />

      <View style={{marginHorizontal: 0}}>
        <ScrollView horizontal style={{flexGrow: 0}}>
          {tabs?.map(item => {
            return (
              <Pressable
                style={[
                  styles.tabContainer,
                  selectedId === item.id ? {backgroundColor: colors.white} : {},
                ]}
                disabled={moduleStatus === 0}
                onPress={() => {
                  onTabSelect(item.id);
                }}>
                <Text
                  style={{
                    color:
                      selectedId === item.id ? item.selectedColor : item.color,
                  }}>
                  {item.name}
                </Text>
                {selectedId === item.id && (
                  <View style={styles.countContainer}>
                    <Text
                      style={{
                        color:
                          selectedId === item.id
                            ? item.selectedColor
                            : item.color,
                        backgroundColor:
                          selectedId === item.id
                            ? item.selectedbackgroundColor
                            : item.backgroundColor,
                        paddingHorizontal: moderateScale(4),
                        borderRadius: 80,
                        paddingVertical: moderateScale(1),
                        fontSize: fontsize.medium10,
                      }}>
                      {listCount}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      {moduleStatus === 0 ? (
        <FeatureDisableComp title={packagesDisbaleMessage} />
      ) : (
        <Content isLoading={isLoading} style={styles.container}>
          <>
            <FlatList
              data={listData}
              contentContainerStyle={styles.content}
              onViewableItemsChanged={viewableItem}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={onListRefresh}
                />
              }
              ListEmptyComponent={
                packageStatus == false ? null : (
                  <EmptyOther navigation={undefined}  style={{marginTop:'40%'}}/>
                )
              }
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => {
                const {
                  appointment_status,
                  client_name,
                  designation_name,
                  id,
                  purpose,
                  datetime,
                  emp_name,
                  is_lapsed,
                  emp_id,
                  canreject,
                  canAccept,
                  status
                } = item;
                console.log('AppointmentBoard====', item);

                let message= ''
                if(canAccept === 0 && status===4 || status===1){
                   message="from "+ getHeaderText(emp_name,15)
                }else if(canAccept ===1 && status===4 || status===1 ){
                  message="from you"
                }
                return (
                  <View
                    style={{
                      // backgroundColor: colors.white,
                      borderRadius: 4,
                      marginVertical: moderateScale(10),
                      marginHorizontal: moderateScale(12),
                    }}>
                    <AppointmentBoard
                      appointedEmployeeProps={{
                        size: 'medium',
                        color: colors.GRey800,
                        title: emp_name,
                        fontWeight: 'semibold',
                      }}
                      circleImageProps={{
                        size: 'small',
                        color: colors.white,
                        title: emp_name,
                        backgroundColor: colors.primary,
                        align: 'center',
                        source: undefined,
                      }}
                      AppointmentStatusPropsType={{
                        status: appointment_status,
                        message: message
                      }}
                      AppointmentContentPropType={{
                        color: colors.Grey600,
                        size: 'exsmall',
                        title: purpose,
                        fontWeight: '',
                      }}
                      AppointedConsultantPropsType={{
                        size: 'exsmall',
                        color: colors.Grey600,
                        title:
                          designation_name +
                          ' ( ' +
                          dashboardState.activeBranch?.branch_name +
                          ' )',
                        fontWeight: '',
                      }}
                      AppointmentDatePropsType={{
                        size: 'xxsmall',
                        color: colors.primary,
                        title: datetime,
                        fontWeight: 'semibold',
                      }}
                      AppointmentTimePropsType={{
                        size: 'xxsmall',
                        color: colors.primary,
                        title: datetime,
                        fontWeight: 'semibold',
                      }}
                      id={id}
                      employeeId={emp_id}
                      onRefresh={() => onListRefresh()}
                      status={true}
                      isLapsed={is_lapsed}
                      selectedTab={selectedId}
                      canReject={canreject === 0 ? false : true}
                      canAccept={canAccept === 0 ? false : true}
                    />
                  </View>
                );
              }}
            />
            {showResheduleSheet && (
              <ResheduleAppointment
                AppointmentContent={undefined}
                onRefresh={function (): void {
                  onListRefresh();
                }}
                onClose={function (): void {
                  setShowResheduleSheet(false);
                }}
                showActionSheet={showResheduleSheet}
              />
            )}
            <FAB
              style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
                backgroundColor: colors.primary,
                borderRadius: 60,
              }}
              icon="plus"
              color="white"
              size="medium"
              onPress={() => setShowResheduleSheet(true)}
            />
          </>
        </Content>
      )}
    </Container>
  );
};

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90@ms',
    height: '30@ms',
    margin: '6@ms',
    borderRadius: 4,
  },
  countContainer: {},
});

export default Appointment;
