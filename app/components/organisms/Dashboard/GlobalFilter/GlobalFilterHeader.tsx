import {Sublabel} from '@components/atoms/Labels';
import {fontsize, colors} from '../../../../themev1';
import {GlobalFilterPropsType} from '@types/components';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import GlobalFilterModal from './GlobalFilterModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '@hooks/redux_hooks';
import { getHeaderText } from '@components/organisms/ServiceItem/ServiceItemCard';

const GlobalFilterHeader = (props: GlobalFilterPropsType) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const usersState = useAppSelector(state => state?.user.SubheaderName)

  const dashboardState = useAppSelector(state => state?.dashboard);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setIsSheetOpen(true);
        }}>
        <View>
          <View style={styles.org}>
            <Sublabel
              size={'medium'}
              fontWeight={'semibold'}
              title={
               getHeaderText(dashboardState.activeBranch?.branch_name ?? props.consultantName,18)
              }
              color={colors.white}
              align={'right'}
              fontStyle={'normal'}
              maxLength={24}
            />
          </View>
          <Sublabel
            size={'exsmall'}
            fontWeight={'normal'}
            title={getHeaderText(dashboardState.activeClient?.name ?? props.clientName,18)}
            color={colors.white}
            align={'right'}
            fontStyle={'normal'}
            maxLength={24}
          />
        </View>
        <View>
          <MaterialCommunityIcons
            name="filter-variant"
            size={moderateScale(24)}
            color={colors.white}
            style={{marginTop: moderateScale(2), paddingLeft: moderateScale(3)}}
          />
        </View>
      </TouchableOpacity>
      {isSheetOpen && (
        <GlobalFilterModal
          onClose={() => setIsSheetOpen(false)}
          isVisible={isSheetOpen}
        />
      )}
    </View>
  );
};
export default GlobalFilterHeader;

const styles = ScaledSheet.create({
  organizationtitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  consultanttitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    paddingRight: 1,
  },
  sheetContainer: {
    // paddingVertical: moderateScale(10),
    backgroundColor: colors.white,
  },
  org: {
    borderBottomWidth: 0.5,
    borderColor: colors.white,
  },
  titleConatiner: {
    paddingBottom: moderateScale(10),
    marginStart: moderateScale(32),
    // borderBottomWidth: moderateScale(1),
    // borderBottomColor: colors.grayLight,

    // marginBottom: scale(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applyButton: {
    fontSize: fontsize.medium,
    color: colors.primary,
    alignSelf: 'flex-end', // Align the button to the right
    marginBottom: moderateScale(10), // Adjust the margin to your preference
    marginEnd: moderateScale(40),
    marginTop: moderateScale(10),
  },
  sheetContent: {
    paddingHorizontal: moderateScale(15),
  },
});
