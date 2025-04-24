import React from 'react';
import {View, FlatList} from 'react-native';
import {colors} from '../../../themev1';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import DetailContent from '@components/templates/Details/DetailContent';
import {moderateScale} from 'react-native-size-matters';
import LogBoard from '@components/organisms/ServiceDetails/LogBoard';
import LogDate from '@components/molecules/Logs/LogDate';

const Logs = ({route, navigation}: any) => {
  const {logs, serviceData} = route.params;
  const getGStatusColor = (gStatus: string) => {
    switch (gStatus) {
      case 'Overdue':
        return colors.semorange;
      case 'Due':
        return colors.primary;
      case 'Upcoming':
        return colors.SemGreen500;
      default:
        return colors.primary;
    }
  };

  const getHeaderText = (heading: string, length: number) => {
    try {
      return heading.length < length
        ? `${heading}`
        : `${heading.substring(0, length)}..`;
    } catch (error) {
      return '';
    }
  };
  // Alert.alert('ff',(JSON.stringify(logs)))
  const renderItem = ({item}: any) => (
    <>
      <View
        style={{
          marginHorizontal: 24,
        }}>
        {/* /** *TO-DO NEED TO CONFIRM THE KEY HERE */}
        <LogDate date={item.date} />
      </View>
      <LogBoard details={item} />
    </>
  );

  return (
    <View style={{backgroundColor: colors.Dashboard, flex: 1}}>
      <CustomHeader title="Logs" />

      <View style={{marginVertical: moderateScale(5)}}>
        <DetailContent
       LabelPropsType={{
        size: 'medium',
        fontWeight: 'semibold',
        title: getHeaderText(serviceData.service_name,30),
        color: colors.GRey800,
        align: {undefined},
      }}
      LabelPropsType1={{
        size: 'small',
        fontWeight: 'semibold',
        title: 'ACT :  ',
        color: colors.GRey800,
        align: {undefined},
      }}
      LabelPropsType2={{
        size: 'small',
        fontWeight: 'normal',
        title: getHeaderText(serviceData?.act_name,30),
        color: colors.GRey800,
        align: {undefined},
      }}
      LabelPropsType3={{
        size: 'small',
        fontWeight: 'normal',
        title: serviceData?.due_date, //'Mar 3, 2024'
        color: colors.GRey800,
        align: {undefined},
      }}
      SubLabelPropsType={{
        size: 'exsmall',
        fontWeight: 'bold',
        fontStyle: 'italic',
        title: serviceData?.g_status,
        color: getGStatusColor(serviceData?.g_status),
        align: undefined,
      }}
      clientName={getHeaderText(serviceData.client_name,30)}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={logs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
export default Logs;
