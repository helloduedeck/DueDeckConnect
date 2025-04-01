import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '@theme';
import Card from '../Card/Card';
import Text from '../Text';
import fontsize from '@theme/fontstyle';
import {ROUTES} from '@routes';
import moment from 'moment';
import {Sublabel} from '../Labels';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Path} from 'react-native-svg';
type IProps = {
  item: any;
  isPending?: boolean;
  isCompleted?: boolean;
  viewableItems: any;
  date: any;
};

const NoticeCard: React.FC<IProps> = ({
  item,
  isPending,
  isCompleted,
  viewableItems,
  date,
}) => {
  const navigation = useNavigation<any>();

  const onDetailPress = () => {
    navigation.navigate(ROUTES.NOTICEDETAILS, {
      id: item.id,
    });
  };
  // const moment = require('moment');

  // Input date in the format DD/MM/YY
  const inputDate = date;

  // Use Moment.js to parse and format the date
  const convertedDate = moment(inputDate, 'DD/MM/YY').format('YYYY[-]YY');

  console.log(convertedDate);
  const getHeaderText = (heading: string, length: number) => {
    try {
      return heading.length < length
        ? `${heading}`
        : `${heading.substring(0, length)}..`;
    } catch (error) {
      return '';
    }
  };
  const timestamp = moment(date);
  const isDateValid = timestamp.isValid();
  // Determine whether to display the month name ahead of days
  const displayMonthAhead = isDateValid && moment().diff(timestamp, 'days') > 7;

  const formattedTimestamp = isDateValid
    ? displayMonthAhead
      ? timestamp.fromNow() // Display month name ahead of days
      : timestamp.format('MMM Do, YYYY')
    : date;

  const formattedDateOfNotice = moment(item.dateofnotice, 'DD/MM/YYYY').format(
    'MMM Do, YYYY',
  );
  const Arrow = ({status}: {status: string}) => {
    let color = '';

    // Set color based on task status
    switch (status) {
      case 'Assigned':
        color = colors.semorange;
        break;
      case 'completed':
        color = 'green';
        break;
      default:
        color = 'black';
    }

    return (
      <Svg width={4} height={6} viewBox="0 0 4 6" fill="none">
        <Path
          d="M0.970625 5.4689L3.51937 3.28484C3.56044 3.24963 3.59339 3.20596 3.61599 3.15682C3.63859 3.10768 3.65029 3.05423 3.65029 3.00015C3.65029 2.94606 3.63859 2.89262 3.61599 2.84348C3.59339 2.79434 3.56044 2.75067 3.51937 2.71546L0.970625 0.531398C0.727344 0.322961 0.351562 0.495773 0.351562 0.816086V5.18483C0.351562 5.50515 0.727344 5.67796 0.970625 5.4689Z"
          fill={color}
        />
      </Svg>
    );
  };

  return (
    <Card
      onPress={onDetailPress}
      viewableItems={viewableItems}
      item={item}
      borderStartColor={
        isPending ? colors.orange : isCompleted ? colors.green : colors.graish
      }>
      <View style={{position: 'absolute', top: 0, right: 0}}>
        <View
          style={{
            // backgroundColor: colors.strokeW,
            // width: '80%',
            position: 'absolute',
            right: 11,
            top: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
            borderRadius: 3,
          }}>
          <View
            style={{
              backgroundColor: colors.smoke,
              paddingHorizontal: moderateScale(4),
              paddingVertical: moderateScale(2),
              borderRadius: 3,
            }}>
            <Sublabel
              size={'exsmall'}
              fontWeight={'normal'}
              title={item.act_name}
              color={colors.GRey800}
              align={undefined}
              fontStyle={'normal'}
            />
          </View>
        </View>
        <Text
          style={{
            // backgroundColor: getStatusColor(item.task_status),
            width: moderateScale(100),
            height: moderateScale(25),
            color: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: moderateScale(17),
            paddingTop: moderateScale(5),
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 8,
            fontSize: fontsize.medium10,
          }}
          children={undefined}>
          {/* {item.act_name} */}
        </Text>
      </View>
      <TouchableOpacity onPress={onDetailPress}>
        <Text isSemiBold style={styles.title}>
          {getHeaderText(item.service_name, 15)}

          <Text
            style={{
              fontSize: fontsize.small,
              fontWeight: '700',
              color: colors.GRey800,
            }}
            children={undefined}>
            {/* {item.act_name} */}
          </Text>
        </Text>
      </TouchableOpacity>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
            <MaterialCommunityIcons
              name={'calendar-blank-outline'}
              color={getStatusColor(item.task_status)}
              size={12}
              style={{
                marginLeft: moderateScale(15),
                marginRight: moderateScale(4),

                marginTop: moderateScale(3),
              }}
            />
            <Text
              style={{
                // color: colors.hexgray,
                color: getStatusColor(item.task_status),
                marginLeft: moderateScale(2),
                fontWeight: '700',
                fontSize: fontsize.medium,
                marginTop: moderateScale(1),
              }}>
              {formattedDateOfNotice}
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <Icon
              size={14}
              name="user"
              color={colors.hexgray}
              style={{
                marginLeft: moderateScale(15),
                marginTop: moderateScale(4),
              }}
            />
            <Text
              style={{
                color: colors.hexgray,
                marginLeft: moderateScale(2),
                fontWeight: '700',
                fontSize: fontsize.medium,
                marginTop: moderateScale(1),
              }}>
              {item.emp_name}
            </Text>
          </View> */}
        </View>
        <View style={{flexDirection: 'row', marginLeft: moderateScale(13)}}>
          <View
            style={{
              marginTop: moderateScale(15),
              marginRight: moderateScale(5),
            }}>
            <Arrow status={''} />
          </View>
          <Text
            style={{
              color: getStatusColor(item.task_status),
              marginLeft: 0,
              fontWeight: '500',
              fontSize: fontsize.medium,
              marginTop: moderateScale(10),
            }}>
            {item.task_status == 'WIP' ? 'In Progress' : item.task_status}
          </Text>

          <Icon
            size={12}
            name="rupee"
            color={colors.hexgray}
            style={{
              marginLeft: moderateScale(8),
              // alignContent:'center'
              marginTop: moderateScale(13),
            }}
          />
          <View
            style={{
              marginLeft: moderateScale(8),
              // alignContent:'center'
              marginTop: moderateScale(12),
            }}></View>
          <Text
            style={{
              color: colors.hexgray,
              marginLeft: moderateScale(-4),
              fontWeight: 'normal',
              fontSize: fontsize.medium,
              marginTop: moderateScale(10),
            }}
            children={item.fees}></Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: moderateScale(2),
            right: 0,
          }}>
          {/* <Icon
            size={12}
            name="check"
            color={getStatusColor(item.task_status)}
            style={{
              marginLeft: moderateScale(15),
              marginTop: moderateScale(25),
            }}
          /> */}
          <Text
            style={{
              marginLeft: moderateScale(2),
              fontWeight: '500',
              fontSize: fontsize.small,
              marginTop: moderateScale(10),
            }}>
            FY : {item.fyear}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Complete Received':
    case 'Completed':
      return colors.green;
    case 'Cancelled':
      return colors.graish;
    case 'Pending':
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

export default NoticeCard;

const styles = StyleSheet.create({
  title: {
    fontSize: fontsize.medium14,
    paddingBottom: moderateScale(10),
    fontWeight: '700',

    color: colors.GRey800,
    marginLeft: moderateScale(13),
    maxWidth: '65%',
    marginTop: moderateScale(10),
  },
  topRightTextContainer: {},

  topRightText: {
    color: colors.white, // You can adjust the color
    fontSize: fontsize.medium,
    fontWeight: '700',
    backgroundColor: colors.semorange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
