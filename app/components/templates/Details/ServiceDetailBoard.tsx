import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import DetailContent from './DetailContent';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import ServiceDetailRow from '@components/organisms/ServiceDetails/ServiceDetailRow';
import {colors, fontsize} from '../../../themev1';
import ProfileField from '@components/molecules/Profile/ProfileField';
import {ROUTES} from '@routes';
import {useGetSingleTaskMutation} from '@api/services';
import Content from '@components/content/Content';
import moment from 'moment';
import CustomHeaderW from '@components/organisms/Headers/CustomHeaderW';
type IProps = {
  id: number;
};
const ServiceDetailBoard = ({id}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const [serviceData, setServiceData] = useState([]);
  const [logsData, setLogseData] = useState([]);

  const [commentsData, setCommentsData] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);

  const [getSingleTask] = useGetSingleTaskMutation();

  useEffect(() => {
    setIsLoading(true);
    fetchDetails();
  }, []);


   const getHeaderText = (heading: string, length: number) => {
    try {
      return heading.length < length
        ? `${heading}`
        : `${heading.substring(0, length)}..`;
    } catch (error) {
      return '';
    }
  };
  const fetchDetails = async () => {
    const reqData: any = {
      id: id,
    };
    await getSingleTask(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          setServiceData(data?.data.singletask);
          console.log(data?.data.singletask.document_count,'taskidd');
          setLogseData(data?.data.singletask.logs);
          setCommentsData(data?.data.singletask.comments);
          setDocumentsData(data?.data.singletask.documents);
        } else {
          setServiceData([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        console.log('getServiceDetails ', e);
      });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete Received':
      case 'Completed':
        return colors.green;
      case 'Cancelled':
        return colors.graish;

      case 'Assigned':

      case 'Part Received':
        return colors.orange;

      case 'WIP':
        return colors.semblue;
      case 'Hold':
        return colors.darkred;
      default:
        return colors.primary;
    }
  };
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
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  }

  // const formattedTime = moment.duration(serviceData?.estimated_time, 'minutes').format('hh:mm', { trim: false });
  return (
    <View style={styles.main}>
      <View style={{marginHorizontal: -2, backgroundColor: colors.Dashboard}}>
        <View style={{backgroundColor:colors.primary,justifyContent:'center',alignItems:'center',height:40}}>
        <CustomHeaderW
          LabelPropsType={{
            size: 'large',
            fontWeight: 'semibold',
            title: 'Task Details',
            color: colors.GRey800,
            align: {undefined},
          }}
          title="Task Details"
        />
        </View>
      </View>
      <View style={{marginVertical: moderateScale(17)}}>
        {!isLoading && (
          <DetailContent
            LabelPropsType={{
              size: 'medium',
              fontWeight: 'semibold',
              title: getHeaderText(serviceData.service_name,25),
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
              title:getHeaderText( serviceData?.act_name,25),
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
              title: serviceData?.due_in,
              color: getGStatusColor(serviceData?.g_status),
              align: undefined,
            }}
            clientName={getHeaderText(serviceData.client_name,25)}
          />
        )}
      </View>
      <Content isLoading={isLoading} style={{flex: 1}}>
        <>
          <View style={{marginBottom: moderateScale(12)}}>
            <ServiceDetailRow
              SubLabelPropsType={{
                size: 'small',
                color: colors.darkgray,
                title: 'Status',
              }}
              LabelPropsType={{
                size: 'small',
                color: getStatusColor(serviceData?.task_status),
                title:
                  serviceData?.task_status == 'WIP'
                    ? 'In Progress'
                    : serviceData?.task_status, //'In progress',

                fontWeight: 'semibold',
              }}
              SubLabelPropsType1={{
                size: 'small',
                color: colors.darkgray,
                title: 'Assigned To',
              }}
              LabelPropsType1={{
                size: 'small',
                color: colors.GRey800,
                title: serviceData?.emp_name,
                fontWeight: 'semibold',
              }}
              SubLabelPropsType2={{
                size: 'small',
                color: colors.darkgray,
                title: 'Priority',
              }}
              LabelPropsType2={{
                size: 'small',
                color: colors.darkred,
                title: serviceData?.priority_name,
                fontWeight: 'semibold',
              }}
            />
          </View>
          <View style={{marginBottom: moderateScale(12)}}>
            <ServiceDetailRow
              SubLabelPropsType={{
                size: 'small',
                color: colors.darkgray,
                title: 'Period',
              }}
              LabelPropsType={{
                size: 'small',
                color: colors.GRey800,
                title: serviceData?.period_name ?? serviceData?.fyear,
                fontWeight: 'semibold',
              }}
              SubLabelPropsType1={{
                size: 'small',
                color: colors.darkgray,
                title: 'Frequency',
              }}
              LabelPropsType1={{
                size: 'exsmall',
                color: colors.GRey800,
                title: serviceData?.frequency_name,
                fontWeight: 'semibold',
              }}
              SubLabelPropsType2={{
                size: 'small',
                color: colors.darkgray,
                title: 'Branch',
              }}
              LabelPropsType2={{
                size: 'small',
                color: colors.GRey800,
                title: serviceData?.branch,
                fontWeight: 'semibold',
              }}
            />
          </View>

          <View style={{marginBottom: moderateScale(5)}}>
            <ServiceDetailRow
              SubLabelPropsType={{
                size: 'small',
                color: colors.darkgray,
                title: 'Estd. Time',
              }}
              LabelPropsType={{
                size: 'small',
                color: colors.GRey800,
                title: serviceData?.estimated_time
                  ? formatTime(serviceData?.estimated_time)
                  : 'NA', // '5h 30m',

                fontWeight: 'semibold',
              }}
              SubLabelPropsType1={{
                size: 'small',
                color: colors.darkgray,
                title: 'Spent Time',
              }}
              LabelPropsType1={{
                size: 'small',
                color: colors.SemGreen500,
                title: '-', //serviceData?.spent_time ? formatTime(serviceData?.spent_time) : "-"
                fontWeight: 'semibold',
              }}
              SubLabelPropsType2={{
                size: 'small',
                color: colors.darkgray,
                title: 'Fee',
              }}
              LabelPropsType2={{
                size: 'small',
                color: colors.GRey800,
                title: serviceData?.fees,
                fontWeight: 'semibold',
              }}
            />
          </View>

          <View
            style={{
              marginHorizontal: moderateScale(17),
              marginBottom: moderateScale(17),
            }}>
            <ProfileField
            showicon={true}
              title={'Documents ' +  serviceData.document_count}
              color={colors.GRey800}
              size={fontsize.medium}
              fontWeight={'semibold'}
              onPress={() =>
                navigation.navigate(ROUTES.DOCUMENTUPLOADPANEL, {
                  serviceData: serviceData,
                  documentsData: documentsData,
                  taskId: id,
                  onDataBack: (data: any) => {
                    setDocumentsData(data);
                  },
                })
              }
            />
            <ProfileField
            showchaticon={true}
              title={'Comments'}
              color={colors.GRey800}
              size={fontsize.medium}
              fontWeight={'semibold'}
              onPress={function (): void {
                navigation.navigate(ROUTES.COMMENTS, {
                  serviceData: serviceData,
                  commentsData: commentsData,
                  taskId: id,
                  onDataBack: (data: any) => {
                    setCommentsData(data);
                  },
                });
              }}
            />
            <ProfileField
            showlogicon={true}
              title={'Logs'}
              color={colors.GRey800}
              size={fontsize.medium}
              fontWeight={'semibold'}
              onPress={function (): void {
                navigation.navigate(ROUTES.LOGS, {
                  taskId: id,
                  logs: logsData,
                  serviceData: serviceData,
                });
              }}
            />
          </View>
        </>
      </Content>
    </View>
  );
};
export default ServiceDetailBoard;
const styles = StyleSheet.create({
  main: {
    // margin: moderateScale(17),
    backgroundColor: colors.Dashboard,
    flex: 1,
  },
});
