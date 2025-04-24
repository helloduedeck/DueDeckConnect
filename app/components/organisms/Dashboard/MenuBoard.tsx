import {Label} from '@components/atoms/Labels';
import Circle from '@components/atoms/Circle/Circle';
import MenuBoardItem from '@components/molecules/MenuBoardItems';
import {colors} from '../../../themev1';

import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@routes';
import React, {useState} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {getMenuBoarddBackgroundColor} from '@utils/helper';
import {IMenuBoardItems} from '@types/components';
import {useAppSelector} from '@hooks/redux_hooks';
import TasklistWhiteIcon from '@components/atoms/Icon/icons/TasklistWhite';
import TaskrequestCircle from '../../../components/atoms/Circle/Taskrequestcircle';
const MenuBoard = () => {
  const dashboardData = useAppSelector(state => state?.dashboard);
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const navigateTo = (screenName: string) => {
    switch (screenName) {
      case 'TaskRequests':
        return navigation.navigate(ROUTES.TASKREQUESTS);
      case 'Payments':
        return navigation.navigate(ROUTES.PAYMENTS);
      case 'Notices':
        return navigation.navigate(ROUTES.NOTICE);
      case 'Appointments':
        return navigation.navigate(ROUTES.APPOINTMENT);
      case 'Documents':
        return navigation.navigate(ROUTES.DOCUMENT);
      case 'Tasks':
        return navigation.navigate(ROUTES.SERVICES, {selectedTab: 1});
      default:
        return <div>Routes not defined,contact admin</div>;
    }
  };

  const menuBoradList = () => {
    return dashboardData.menuBoard?.slice(0, -1).map(// hide payment icon by SG for module deactivation
      (item: IMenuBoardItems, index: number) => {
        const {title, icon, background, size, status} = item;
        return (
          <>
            <MenuBoardItem
              size={size}
              iconName={icon}
              fontWeight={'semibold'}
              title={title}
              color={colors.Grey600}
              align={undefined}
              onPress={() => navigateTo(title)}
              fontStyle={'normal'}
              backgroundColor={getMenuBoarddBackgroundColor(background)}
            />
          </>
        );
      },
    );
  };
  return (
    <View style={styles.maincontainer}>
      <View style={styles.MenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={event => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / moderateScale(100));
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}>
           <View>
            <TouchableOpacity onPress={()=>{navigation.navigate(ROUTES.TASKREQUESTS)}}>
              <TaskrequestCircle size={''} background={undefined} iconName={''} iconColor={undefined}/>
              </TouchableOpacity>
           </View>
          {menuBoradList()}
        </ScrollView>
      </View>
      <View style={styles.pagination}>
        {dashboardData.menuBoard?.slice(0, -3)?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  MenuContainer: {
    flexDirection: 'row',

    // justifyContent: "space-around",
  },
  rupeecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  maincontainer: {
    marginTop: moderateScale(-5),
    marginHorizontal: moderateScale(3),
    paddingTop: moderateScale(16),
    // paddingHorizontal: moderateScale(22),
    paddingLeft:moderateScale(15),
    paddingEnd:moderateScale(23.5),
    paddingBottom: moderateScale(8),
    backgroundColor: colors.white,
    // width: moderateScale(343),
    // height: moderateScale(180),
    borderRadius: moderateScale(8),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
    // borderColor:colors.black,
    //     borderWidth:1,
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: moderateScale(9),
  },
  menulabel: {
    marginTop: moderateScale(7),
  },
  label: {
    marginTop: moderateScale(10), // Adjust the margin top as needed
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  paginationDot: {
    width: moderateScale(4),
    height: moderateScale(4),
    borderRadius: moderateScale(4),
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(1),
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activeDot: {
    backgroundColor: colors.primaryDark,
    width: moderateScale(24),
    height: moderateScale(4),
  },
  hiddenItem: {
    opacity: 0, // Make the item transparent
  },
});

export default MenuBoard;
