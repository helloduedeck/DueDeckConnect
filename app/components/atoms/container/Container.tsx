import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme';
import Header from '../header/Header';
import Content from '../content/Content';
import SubHeader from '../subheader/SubHeader';
import Card from '../card/Card';
import AlerCard from '../../container/dashboard/components/alertCard/AlertCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import fontsize from '../../theme/fontstyle';
import Loader from '../loader/Loader';
import LabelValueStatus from '../labelValueStatus/LabelValueStatus';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment, {Moment} from 'moment';

type IProps = {
  item: any;
  viewableItems: any;
  children: any;
  isFailed?: boolean;
  isLoading?: boolean;
  backLabel?: any;
  isSubLabel?: boolean;
  isSubHeader?: boolean;
  isBottomPadding?: boolean;
  value2: any;
  date: any;
};

const Container: React.FC<IProps> = ({
  item,
  viewableItems,
  children,
  isLoading,
  isFailed,
  backLabel,
  isSubLabel,
  isBottomPadding,
  isSubHeader,
  date,
  value2,
  ...props
}) => {
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

  const displayMonthAhead = isDateValid && moment().diff(timestamp, 'days') > 7;


  const formattedTimestamp = isDateValid
    ? displayMonthAhead
      ? timestamp.fromNow()
      : timestamp.format('MMM Do, YYYY')
    : date;

  console.log('container date format', formattedTimestamp);
  console.log('container month', displayMonthAhead);
  console.log('container date', isDateValid);
  console.log('calculateDaysDifference  ', calculateDaysDifference(timestamp));
  console.log('containeritem', item);

  return (
    <View style={[styles.container, styles.iosStatusBar]}>
      <View style={styles.iosStatusBar} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
        {!isSubHeader ? <Header {...props} /> : null}

        {isSubLabel ? (
          <SubHeader backLabel={backLabel} isBottomPadding={isBottomPadding} />
        ) : null}
        {isSubHeader ? (
          <View style={{height: moderateScale(110), width: '100%'}}>

              style={[
                styles.taskdetail,
                {borderColor: getStatusColor(item.g_status)},
              ]}>
              <View>
                <Text style={styles.title}>
                  {getHeaderText(item.service_name, 20)} |{' '}
                  <Text
                    style={{
                      fontSize: fontsize.medium10,
                      fontWeight: '700',
                      color: colors.GRey800,
                      marginLeft: moderateScale(5),
                    }}>
                    {getHeaderText(item.act_name, 20)}
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingStart: moderateScale(27),
                    paddingTop: moderateScale(5),
                  }}>
                  <AntDesign
                    name="user"
                    size={moderateScale(12)}
                    color={colors.hexgray}
                    style={{paddingTop: moderateScale(0)}}
                  />
                  <Text
                    style={{
                      fontSize: fontsize.medium,
                      marginLeft: moderateScale(5),
                      color: colors.hexgray,
                      fontWeight: '700',
                    }}>
                    {item.emp_name}{' '}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingStart: moderateScale(27),
                    paddingTop: moderateScale(-12),
                  }}>
                  <AntDesign
                    name="clockcircleo"
                    size={moderateScale(12)}
                    color={colors.hexgray}
                    style={{paddingTop: moderateScale(5)}}
                  />
                  <Text
                    style={{
                      fontSize: fontsize.medium10,
                      color: colors.hexgray,
                      fontWeight: '700',
                      paddingBottom: moderateScale(18),
                      paddingTop: moderateScale(4),
                      paddingStart: moderateScale(7),
                    }}>
                    {item.end_date_mob}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontsize.medium10,
                      color: colors.hexgray,
                      fontWeight: '500',
                      marginLeft: moderateScale(8),
                      paddingTop: moderateScale(4),
                    }}>

        {calculateDaysDifference( moment(item.end_date,'DD/MM/YYYY').format('YYYY-MM-DD'))}
                  </Text>
                  <View></View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: moderateScale(0),
                    right: moderateScale(0),
                  }}>
                  <Text
                    style={{
                      backgroundColor: getStatusColor(item.g_status),
                      width: moderateScale(100),
                      height: moderateScale(25),
                      color: colors.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: moderateScale(20),
                      paddingTop: moderateScale(6),
                      fontSize: fontsize.medium,
                    }}>

                  </Text>

              </View>


          </View>
        ) : null}
        <Content isFailed={isFailed} isLoading={isLoading}>
          {children}
        </Content>
      </SafeAreaView>
    </View>
  );
};

export default Container;
const calculateDaysDifference = (givenDate: Moment) => {
  const proxyDate =  moment();
  console.log('givenDateTime',givenDate);
  const currentDate = new Date();
  const givenDateTime = new Date(givenDate);

  const differenceInMilliseconds = currentDate - givenDateTime;


  const differenceInDays = Math.floor(
    differenceInMilliseconds / (24 * 60 * 60 * 1000),
  );
  console.log('differ', differenceInDays);
  return differenceInDays > 0
    ? differenceInDays + ' days ago'
    : Math.abs(differenceInDays) > 0
    ? Math.abs(differenceInDays) + ' days to go'
    : 'Today';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Overdue':
      return colors.semorange;
    case 'Upcoming':
      return colors.SemGreen500;
    case 'Due':
      return colors.semblue;
    default:
      return colors.primary;
  }
};

const iconContainerStyle: any = (isLoading: boolean) => {
  return {
    backgroundColor: isLoading ? colors.graish : colors.primary,
    borderRadius: moderateScale(5),
    marginEnd: moderateScale(15),
    height: moderateScale(25),
    width: moderateScale(100, 0.25),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iosStatusBar: {
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontsize.large,
    fontWeight: '700',
    color: colors.GRey800,
    maxWidth: '95%',
    paddingStart: moderateScale(30),
    paddingTop: moderateScale(20),
    marginRight: moderateScale(9, 0.25),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: iconContainerStyle,
  headerContainer: {
    paddingBottom: moderateScale(5),
    maxWidth: '50%',
  },
  labelContainer: {
    flexDirection: 'row',
    marginStart: moderateScale(-200),
    justifyContent: 'space-around',
    marginTop: moderateScale(10),
    fontSize: fontsize.medium14,
    paddingStart: moderateScale(1),
  },
  value: {
    color: colors.black,

    fontSize: fontsize.small, 
  },
  labelValueContainer: {
    marginTop: moderateScale(10),
    marginLeft: moderateScale(27),
    justifyContent: 'space-between',

    flexDirection: 'row',
    maxWidth: '60%',
    paddingBottom: moderateScale(4),
    fontSize: fontsize.medium14,
  },

  status: {
    color: colors.white,
    fontSize: fontsize.medium,
  },
  taskdetail: {
    marginTop: moderateScale(3),
    borderTopWidth: moderateScale(2),
    borderBottomWidth: moderateScale(2),
  },
});
