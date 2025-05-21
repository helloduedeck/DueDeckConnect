import React, {useState} from 'react';
import {Alert, Modal, Pressable, SectionList, TextInput, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import DocumentLabel from '@components/organisms/Dashboard/DocumentLabel';
import {colors} from '@theme';
import Logo from '@components/atoms/Logo/Logo';
import MenuBoard from '@components/organisms/Dashboard/MenuBoard';
import ServiceBoard from '@components/organisms/Dashboard/ServiceBoard';
import AppointmentBoard from '@components/organisms/App/AppointmentBoard';
import DashboardContainer from '@components/atoms/DashboardContainer';
import {useAppSelector} from '@hooks/redux_hooks';
import ParentContainer from '@components/templates/ParentContainer/ParentContainer';
import PaymentBoard from '@components/organisms/Payment/PaymentBoard';
import FabButton from '@components/atoms/Buttons/FabButton';
import Content from '@components/content/Content';
import LinearGradient from 'react-native-linear-gradient';
import AppointmentTitle from '@components/atoms/Dashboard/AppointmentTitle';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '@routes/routes';
import { Sublabel } from '@components/atoms/SubLabel';
import { Label } from '@components/atoms/Label';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Circle from '@components/atoms/Circle/Circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@components/atoms/button/Button';
import fontsize from '../../themev1/fontstyle';
import { toast } from '@utils';
import { useNewTaskRequestMutation } from '@api/services';
import ActionSheet from '@components/organisms/ActionSheet/ActionSheet';

type IDashboardProps = {
  isDataLoading: boolean;
  onAppointmentAddedOrCancelled: () => void;
  onRefresh: () => void;
  onReqNewLabelPressed: () => void;
};
const DashBoardContainer: React.FC<IDashboardProps> = ({
  isDataLoading,
  onAppointmentAddedOrCancelled,
  onRefresh,
  onReqNewLabelPressed,
}) => {
  const dashboardData = useAppSelector(state => state?.dashboard);
  const navigation = useNavigation();
  const [yscroll, setyscroll] = useState(0);

  const [showServiceSheet, setShowServiceSheet] = useState(false);

  const [showAppointmentSheet, setShowAppointmentSheet] = useState(false);
  const [showTaskRequestModal, setShowTaskRequestModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showServiceView, setShowServiceView] = useState(false);
  const [showAppointmentView, setShowAppointmentView] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [taskmodalVisible, setTaskModalVisible] = useState(false);
  const dashboardState = useAppSelector(state => state?.dashboard);
  const [createNewTask] = useNewTaskRequestMutation();

  const toggleBottomSheet = () => {
    setIsSheetOpen(!isSheetOpen);
    setModalVisible(false);
  };

  const closeActionsheet = () => {
    setIsSheetOpen(false);
    setCharacterCount(0)
  };

  const handleChangeText = (text: string) => {
    setServiceNotes(text);
    setCharacterCount(text.length);
  };
  const onNewService = async () => {
    if (!serviceNotes || serviceNotes.trim() === '') {
      return Alert.alert('Please enter a valid service note!');
    }
  
      setTaskModalVisible(true);
  
    const reqData: any = {
      task_note: serviceNotes.trim(), // Trimmed before sending
    };
  
    await createNewTask(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          toast.success(data?.message);
          // onRefresh?.();
             // ✅ Call parent (Dashboard) to open modal
      // props.onTaskRequestCreated?.();
        } else {
          toast.failure(data?.message ?? 'Please enter the required fields!');
        }
      })
      .finally(() => {
        setServiceNotes('');
        setShowServiceView(false);
        setTaskModalVisible(true);
        console.log('service created ');
        
      })
      .catch(e => {
        toast.failure('Something went wrong! Please try again.');
      });
  };

  const [serviceNotes, setServiceNotes] = useState('');
  const appointmentData = dashboardData?.appoinmentSection?.['appointment-card'];

  const data = [
    {
      id: 1,
      title: 'Menu Board',
      component: <MenuBoard />,
    },
    {
      id: 2,
      title: 'Service Board',
      component: (
        <View>
          <ServiceBoard
            onNewServiceRequest={function (): void {
              setShowServiceView(false); // Step 1: Force it to false first
              setTimeout(() => {
                setShowServiceView(true); // Step 2: Reopen after a short delay
              }, 50); // Small delay to ensure state change is registered
            }}
          />

          <ActionSheet
             disableableClosePressingBackDrop={false}
            onClose={() => {
              setIsSheetOpen(false);
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
                      color={colors.GRey800}
                      align={undefined}
                    />
                    <TextInput
                      placeholder="Type"
                      placeholderTextColor={colors.Grey600}
                      maxLength={250}
                      value={serviceNotes}
                      onChangeText={handleChangeText}
                      style={{color:colors.GRey800}}
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
                        color={colors.GRey800}
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
                            // props?.onSheetClose?.();
                          }, 150);
                        }}
                        containerStyle={{
                          height: moderateScale(36),
                          marginVertical: moderateScale(0),
                          backgroundColor: colors.Dashboard,
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
        
      ),
    },
    {
      id: 3,
      title: 'Document Label',
      component: (
         dashboardData?.notificationBoard?.count > 0 && <DocumentLabel
          DocumentAlertPropsType={{
            size: 'xxsmall',
            color: colors.Grey600,
            title: dashboardData?.notificationBoard?.label, //'Document(s) To Upload:',
            fontWeight: 'semibold',
          }}
          DocumentStatusPropsType={{
            size: 'exsmall',
            color: colors.Grey600,
            title: dashboardData?.notificationBoard?.description,
            fontWeight: 'semibold',
            fontStyle: 'italic',
          }}
          onPress={function (): void {
            navigation.navigate(ROUTES.DOCUMENT);
          }}
        />
      ),
    },
    {
      id: 4,
      title: 'Service Board',
      component: (
        <AppointmentTitle
          id={appointmentData?.id}
          onSheduleNew={function (): void {
           setShowAppointmentSheet(true);
          }}
        />
      ),
    },
    {
      id: 5,
      title: 'Appointment Board',
      component: (
        <AppointmentBoard
          id={appointmentData?.id}
          appointedEmployeeProps={{
            size: 'small',
            color: colors.GRey800,
            title: appointmentData?.name,
            fontWeight: 'semibold',
          }}
          circleImageProps={{
            size: 'small',
            color: colors.white,
            title: appointmentData?.name,
            backgroundColor: colors.primary,
            align: 'center',
            source: '',
          }}
          AppointmentStatusPropsType={{
            status: appointmentData?.['apppintment-status'],
          }}
          AppointmentContentPropType={{
            color: colors.Grey600,
            size: 'exsmall',
            title: appointmentData?.description,
            fontWeight: '',
          }}
          AppointedConsultantPropsType={{
            size: 'exsmall',
            color: colors.Grey600,
            title:
              appointmentData?.designation +
              ' ( ' +
              dashboardData.activeBranch?.branch_name +
              ' )',
            fontWeight: '',
          }}
          AppointmentDatePropsType={{
            size: 'xxsmall',
            color: colors.primary,
            title: appointmentData?.['apppintment-date']?.label,
            isdashboard: true,
            fontWeight: 'semibold',
          }}
          AppointmentTimePropsType={{
            size: 'xxsmall',
            color: colors.primary,
            isdashboard: true,
            title: appointmentData?.['apppintment-time']?.label,
            fontWeight: 'semibold',
          }}
          onRefresh={onAppointmentAddedOrCancelled}
          status={false}
          employeeId={''}
          canReject={appointmentData?.canreject ?? false}
          canAccept={appointmentData?.canAccept ?? false}
        />
      ),
    },
    //{id: 6, title: 'Payment Board', component: <PaymentBoard />},
    {
      id: 7,
      title: 'Logo',
      component: <Logo size={'medium'} style={{marginBottom: 85}} />,
    },
  ];
  const handleScroll = (event: any) => {
    // setyscroll(Math.round(event.nativeEvent.contentOffset.y));
  };
  return (
    <DashboardContainer>
      <ParentContainer>
        <Content isLoading={isDataLoading}>
          <>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.55}}
              colors={['#0789B5', 'white', '#F4F6F8']}
              locations={[0, 0.3, 0.3]}
              style={styles.linearGradient}>
              <View style={styles.container}>
                <SectionList
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  sections={[{title: '', data: data}]}
                  keyExtractor={(item, index) => '' + item.id}
                  renderItem={({item}) => (
                    <View
                      style={{
                        alignItems: 'center',
                        marginTop: moderateScale(16),
                      }}>
                      {item.component}
                    </View>
                  )}
                />
              </View>
            </LinearGradient>
            <View style={{bottom:-120,right:135.5, zIndex:0
         }}>
              <FabButton
                size={'small'}
                background={colors.primary}
                iconName={'plus'}
                showAppointmentSheet={showAppointmentSheet}
                showServiceSheet={showServiceSheet}
                onSheetClose={() => {
                  setShowAppointmentSheet(false);
                  setShowServiceSheet(false);
                }}
                onRefresh={onRefresh}
                onTaskRequestCreated={() => setShowTaskRequestModal(true)} // <<<<<< Added this
              />
            </View>
          </>
          
        </Content>
      </ParentContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={taskmodalVisible}
        onRequestClose={() => setTaskModalVisible(true)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: 343,
              height: 230,
              backgroundColor: 'white',
              borderRadius: 4,
              alignItems: 'center',
              padding: moderateScale(24),
              justifyContent: 'center',
            }}
          >
            <Pressable
              style={{position:'absolute',right:10,top:10}}
               onPress={() =>
                setTaskModalVisible(false)
 }
            >
              <MaterialCommunityIcons
                name="close"
                size={20}
                color={colors.black}
              />
            </Pressable>
            <View>
              <MaterialCommunityIcons
                name={'checkbox-marked-circle-outline'}
                color={colors.SemGreen500}
                size={50}
                style={{
                  marginLeft: moderateScale(75),
                  justifyContent: 'center',
                  marginBottom: moderateScale(16),
                }}
              />
              <Label
                size={'small'}
                fontWeight={'semibold'}
                title={'New Taskrequest has been created!'}
                color={colors.GRey800}
              />
            </View>

            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  setTaskModalVisible(false);
                 navigation.navigate(ROUTES.TASKREQUESTS)
                }}
              >
                <Sublabel
                  size={'medium'}
                  fontWeight={'semibold'}
                  fontStyle={'normal'}
                  title={'View Task Request'}
                  color={colors.primary}
                  align={undefined}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        
  
    </DashboardContainer>
  );
};

const styles = ScaledSheet.create({
  dashboardheader: {
    flexDirection: 'row',
    padding: moderateScale(16),
    justifyContent: 'space-between',
    backgroundColor: colors.Header,
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: moderateScale(10),
    height: '100%',
    // paddingBottom:-19
    // backgroundColor: `${colors.primary}33`,
  },
  linearGradient: {
    flex: 1,
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
});

export default React.memo(DashBoardContainer);
