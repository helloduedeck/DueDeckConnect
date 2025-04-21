import React, {useState} from 'react';
import {SectionList, View} from 'react-native';
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

type IDashboardProps = {
  isDataLoading: boolean;
  onAppointmentAddedOrCancelled: () => void;
  onRefresh: () => void;
};
const DashBoardContainer: React.FC<IDashboardProps> = ({
  isDataLoading,
  onAppointmentAddedOrCancelled,
  onRefresh,
}) => {
  const dashboardData = useAppSelector(state => state?.dashboard);
  const navigation = useNavigation();
  const [yscroll, setyscroll] = useState(0);

  const [showServiceSheet, setShowServiceSheet] = useState(false);

  const [showAppointmentSheet, setShowAppointmentSheet] = useState(false);

  const appointmentData =
    dashboardData?.appoinmentSection?.['appointment-card'];

    console.log("dashboardData?.notificationBoard?.label",dashboardData?.notificationBoard)
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
        <ServiceBoard
          onNewServiceRequest={function (): void {
            setShowServiceSheet(true);
          }}
        />
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
            {/* <View style={{marginBottom: moderateScale(-40),}}>
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
              />
            </View> */}
          </>
        </Content>
      </ParentContainer>
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
});

export default React.memo(DashBoardContainer);
