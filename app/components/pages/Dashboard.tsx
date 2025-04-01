import React from 'react';
import {ScrollView, SectionList, Text, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import DocumentLabel from '@components/organisms/Dashboard/DocumentLabel';
import {colors} from '@theme';
import Icon from '@components/atoms/Icon';
import Logo from '@components/atoms/Logo/Logo';
import FabButton from '@components/atoms/Buttons/FabButton';
import MenuBoard from '@components/organisms/Dashboard/MenuBoard';
import ServiceBoard from '@components/organisms/Dashboard/ServiceBoard';
import AppointmentBoard from '@components/organisms/App/AppointmentBoard';
import CircleBadge from '@components/molecules/CircleBadgeMolecule';
import GlobalFilter from '@components/molecules/GlobalFilter';
import DashboardContainer from '@components/atoms/DashboardContainer';

const DashBoard = () => {
  const data = [
    {title: 'Menu Board', component: <MenuBoard />},
    {title: 'Service Board', component: <ServiceBoard />},
    {
      title: 'Document Label',
      component: (
        <DocumentLabel
          DocumentAlertPropsType={{
            size: 'xxsmall',
            color: colors.Grey600,
            title: 'Document(s) To Upload:',
            fontWeight: 'semibold',
          }}
          DocumentStatusPropsType={{
            size: 'exsmall',
            color: colors.Grey600,
            title: '13 Documents Pending',
            fontWeight: 'semibold',
            fontStyle: 'italic',
          }}
        />
      ),
    },
    {
      title: 'Appointment Board',
      component: (
        <AppointmentBoard
          appointedEmployeeProps={{
            size: 'medium',
            color: colors.GRey800,
            title: 'Sahil Gaikwad',
            fontWeight: 'semibold',
          }}
          circleImageProps={{
            size: 'small',
            color: colors.white,
            title: 'SG',
            backgroundColor: colors.primary,
            align: 'center',
            source: require('../../assets/images/v sir.png'),
          }}
          AppointmentStatusPropsType={{
            status: 'accepted',
          }}
          AppointmentContentPropType={{
            color: colors.Grey600,
            size: 'exsmall',
            title: 'Discuss about saving property tax & recent land deal',
            fontWeight: '',
          }}
          AppointedConsultantPropsType={{
            size: 'exsmall',
            color: colors.Grey600,
            title: 'Article Assistant (VSAP & Company)',
            fontWeight: '',
          }}
          AppointmentDatePropsType={{
            size: 'xxsmall',
            color: colors.primary,
            title: 'Mar 5, 2024',
            fontWeight: 'semibold',
          }}
          AppointmentTimePropsType={{
            size: 'xxsmall',
            color: colors.primary,
            title: '10:30 PM',
            fontWeight: 'semibold',
          }}
        />
      ),
    },
    // {title: 'Payment Board', component: <PaymentBoard />},
    {title: 'Payment Board', component: ''},
    {title: 'Logo', component: <Logo size={'small'} style={undefined} />},
    {
      title: 'Fab Butto',
      component: (
        <FabButton
          size={'small'}
          background={colors.primary}
          iconname={'plus'}
          labelstyle={undefined}
        />
      ),
    },
  ];

  return (
    <DashboardContainer>
      <View style={styles.dashboardheader}>
        <View>
          <CircleBadge />
        </View>
        <View>
          <GlobalFilter />
        </View>
      </View>

      <View style={styles.container}>
        <SectionList
          sections={[{title: '', data: data}]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={{alignItems: 'center', marginTop: moderateScale(16)}}>
              {item.component}
            </View>
          )}
        />
      </View>
    </DashboardContainer>
  );
};
export default DashBoard;

const styles = ScaledSheet.create({
  dashboardheader: {
    flexDirection: 'row',
    padding: moderateScale(16),
    justifyContent: 'space-between',
    backgroundColor: colors.Header,
  },
  container: {
    padding: 16,
    backgroundColor: `${colors.gray}33`,
  },
});
