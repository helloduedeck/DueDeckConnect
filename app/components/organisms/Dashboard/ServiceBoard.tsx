import React from 'react';
import {Platform, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import LeftRightText from '@components/molecules/LeftRightText';
import ServiceCard from '@components/molecules/ServiceCard';
import {useAppSelector} from '@hooks/redux_hooks';
import {getServiceBackgroundColor} from '@utils/helper';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '@routes/routes';

const ServiceBoard = (props: any) => {
  const serviceBoard = useAppSelector(state => state?.dashboard.serviceBoard);
  const navigation = useNavigation();

  const onServiceCardPress = (serviceTitle: string) => {
    switch (serviceTitle) {
      case 'In Progress':
        return navigation.navigate(ROUTES.SERVICES, {selectedTab: 2});
      case 'On Hold':
        return navigation.navigate(ROUTES.SERVICES, {selectedTab: 3});
      case 'Completed':
        return navigation.navigate(ROUTES.SERVICES, {selectedTab: 4});
      default:
        return null
    }
  };

  const serviceList = () => {
    return serviceBoard?.data?.map((item: any, index: number) => {
      const {title, icon} = item;
      return (
        <>
          <View
            key={index}
            style={{
              paddingRight:
                serviceBoard.data.length - 1 === index ? moderateScale(5) : 5,
              paddingTop: moderateScale(10),
              flex: 1,
            }}>
            <ServiceCard
              serviceName={title}
              serviceCount={item['service-count']}
              backgroundColor={getServiceBackgroundColor(item.title)}
              rightIcon={icon}
              boderColor={colors.Completed}
              key={index}
              onCardPress={() => onServiceCardPress(item.title)}
            />
            <View style={{width: 5}} />
          </View>
        </>
      );
    });
  };
  return (
    <View style={styles.serviceContainer}>
      <LeftRightText
        leftTitle={serviceBoard.title}
        rightTitle={serviceBoard['right-button-label'] ?? 'View Services'}
        color={colors.primary}
        onRightTextPress={() =>
          serviceBoard['right-button-label'] === 'View Tasks'
            ? onServiceCardPress('')
            : props?.onNewServiceRequest?.()
        }
      />
      <View style={styles.servicecards}>{serviceList()}</View>
    </View>
  );
};
export default ServiceBoard;

const styles = ScaledSheet.create({
  serviceContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: moderateScale(343),
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),

    borderRadius: 8,
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
  serviceupdate: {
    position: 'absolute',
    top: moderateScale(20),
    left: moderateScale(20),
  },
  servicerequest: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
  },
  servicecards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: moderateScale(20),
    //left: moderateScale(20),
    marginBottom: moderateScale(30),
    width: '100%',
    flex: 1,
  },
});
