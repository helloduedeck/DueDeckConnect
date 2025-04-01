import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fontsize, colors} from '../../../themev1';
import ProfileField from '@components/molecules/Profile/ProfileField';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import DetailContent from './DetailContent';
import ServiceDetailRow from '@components/organisms/ServiceDetails/ServiceDetailRow';
import DropdownTable from '@components/molecules/dropdown/DownTable';
import {useGetSingleNoticeMutation} from '@api/notice';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import OrderingStageaCollapsable from '@components/molecules/dropdown/OrderingStageaCollapsable';
type IProps = {
  id: number;
};
const NoticeDetailBoard = ({id}: IProps) => {
  const [getSingleNotice] = useGetSingleNoticeMutation();
  const [noticeDetails, setNoticeDetails] = useState({});
  const [orderingStageData, setOrderingStageData] = useState();
  const [hearingStageData, setHearingStageData] = useState();
  const route = useRoute();

  const orderingStateData = async orderingStageData => {
    const mData = orderingStageData.hearingdetails?.filter(detaials => {
      return detaials.stage_type === 'Ordering Stage';
    });
    mData?.length && setOrderingStageData(mData);
  };

  const hearingStateData = async orderingStageData => {
    const mData = orderingStageData.hearingdetails?.filter(detaials => {
      return detaials.stage_type === 'Hearing Stage';
    });
    mData?.length && setHearingStageData(mData);
  };
  const getDetails = async () => {
    if (!route || !route.params || !route.params.id) {
      return;
    }
    await getSingleNotice(route?.params.id)
      .unwrap()
      .then(data => {
        if (data?.data) {
          ///Alert.alert('', JSON.stringify(route?.params.id))
          setNoticeDetails({...data?.data});
          orderingStateData(data?.data);
          hearingStateData(data?.data);
          // Alert.alert('', JSON.stringify({...data?.data}))
          // console.log(...data?.data)
        }
      })
      .catch(e => {
        console.log('ERROR', e);
        // Alert.alert('', JSON.stringify(route?.params.id))
        // Alert.alert('', JSON.stringify(e))
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

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
      case 'In Progress':
        return colors.semblue;
      case 'Hold':
        return colors.darkred;
      default:
        return colors.primary;
    }
  };

  const formatDate = (date: string) => {
    return moment(date, 'DD/MM/YYYY').format('MMM Do, YYYY');
  };

  return (
    <View>
      <View>
        <CustomHeader
          LabelPropsType={{
            size: 'Medium',
            fontWeight: 'semibold',
            title: 'Notice Details',
            color: colors.GRey800,
            align: {undefined},
          }}
          title="Notice Details"
        />
      </View>
      <ScrollView>
        <View style={{marginVertical: moderateScale(17)}}>
          <DetailContent
            SubLabelPropsType={{
              size: 'exsmall',
              fontWeight: 'bold',
              fontStyle: 'italic',
              title: noticeDetails?.singlenotice?.task_status,
              color: getStatusColor(noticeDetails?.singlenotice?.task_status),
              align: undefined,
            }}
            LabelPropsType={{
              size: 'medium',
              fontWeight: 'semibold',
              title: noticeDetails?.singlenotice?.service_name,
              color: colors.GRey800,
              align: {undefined},
            }}
            LabelPropsType1={{
              size: 'small',
              fontWeight: 'semibold',
              title: 'Notice ACT :',
              color: colors.GRey800,
              align: {undefined},
            }}
            LabelPropsType2={{
              size: 'small',
              fontWeight: 'normal',
              title: noticeDetails?.singlenotice?.act_name,
              color: colors.GRey800,
              align: {undefined},
            }}
            LabelPropsType3={{
              size: 'small',
              fontWeight: 'normal',
              title: formatDate(noticeDetails?.singlenotice?.duedate),
              color: colors.GRey800,
              align: {undefined},
            }}
            clientName={noticeDetails?.singlenotice?.client_name}
          />
        </View>

        <View
          style={{
            marginBottom: moderateScale(12),
          }}>
          <ServiceDetailRow
            SubLabelPropsType={{
              size: 'small',
              color: colors.darkgray,
              title: 'Status',
            }}
            LabelPropsType={{
              size: 'small',
              color: getStatusColor(noticeDetails?.singlenotice?.task_status),
              title: noticeDetails?.singlenotice?.task_status,
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
              title: noticeDetails?.singlenotice?.emp_name,
              fontWeight: 'semibold',
            }}
            SubLabelPropsType2={{
              size: 'small',
              color: colors.darkgray,
              title: 'Liability Raised ',
            }}
            LabelPropsType2={{
              size: 'small',
              color: colors.GRey800,
              title: noticeDetails?.singlenotice?.potential_liability,
              fontWeight: 'semibold',
            }}
          />
        </View>
        <View style={{marginBottom: moderateScale(12)}}>
          <ServiceDetailRow
            SubLabelPropsType={{
              size: 'small',
              color: colors.darkgray,
              title: 'Hearing Date',
            }}
            LabelPropsType={{
              size: 'small',
              color: colors.GRey800,
              title: noticeDetails?.singlenotice?.hearingdate,
              fontWeight: 'semibold',
            }}
            SubLabelPropsType1={{
              size: 'small',
              color: colors.darkgray,
              title: 'Time',
            }}
            LabelPropsType1={{
              size: 'small',
              color: colors.GRey800,
              title: noticeDetails?.singlenotice?.hearingtime,
              fontWeight: 'semibold',
              flex: 0.8,
            }}
          />
        </View>

        <View style={{marginBottom: moderateScale(5)}}>
          <ServiceDetailRow
            SubLabelPropsType={{
              size: 'small',
              color: colors.darkgray,
              title: 'Received By',
            }}
            LabelPropsType={{
              size: 'small',
              color: colors.GRey800,
              title: noticeDetails?.singlenotice?.receivedby,
              fontWeight: 'semibold',
            }}
            SubLabelPropsType1={{
              size: 'small',
              color: colors.darkgray,
              title: 'Issuing Officer',
            }}
            LabelPropsType1={{
              size: 'small',
              color: colors.SemGreen500,
              title: noticeDetails?.singlenotice?.issuing_officer,
              fontWeight: 'semibold',
            }}
            SubLabelPropsType2={{
              size: 'small',
              color: colors.darkgray,
              title: 'FY',
            }}
            LabelPropsType2={{
              size: 'small',
              color: colors.GRey800,
              title: noticeDetails?.singlenotice?.fyear,
              fontWeight: 'semibold',
            }}
          />
        </View>
        <View style={{marginBottom: moderateScale(5)}}>
          <ServiceDetailRow
            SubLabelPropsType={{
              size: 'small',
              color: colors.darkgray,
              title: 'Fee',
            }}
            LabelPropsType={{
              size: 'small',
              color: colors.GRey800,
              title: noticeDetails?.singlenotice?.fees,
              fontWeight: 'semibold',
            }}
            SubLabelPropsType1={{
              size: 'small',
              color: colors.darkgray,
              title: 'Fee Comment',
            }}
            LabelPropsType1={{
              size: 'small',
              color: colors.SemGreen500,
              title: noticeDetails?.singlenotice?.fees_comments,
              fontWeight: 'semibold',
              flex: 0.85,
            }}
          />
        </View>

        {hearingStageData && (
          <View
            style={{
              marginHorizontal: moderateScale(17),
              marginBottom: moderateScale(5),
            }}>
            <DropdownTable id={route?.params.id} data={hearingStageData} />
          </View>
        )}
        {orderingStageData?.length && (
          <View
            style={{
              marginHorizontal: moderateScale(17),
              marginBottom: moderateScale(17),
            }}>
            <OrderingStageaCollapsable
              id={route?.params.id}
              data={orderingStageData}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default React.memo(NoticeDetailBoard);
