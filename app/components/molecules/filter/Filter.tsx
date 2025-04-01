import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../dropdown/Dropdown';
import {moderateScale} from 'react-native-size-matters';
import Text from '@components/text/Text';
import {colors} from '@theme';
import fontsize from '@theme/fontstyle';
import Button from '@components/atoms/button/Button';
import Chip from '@components/atoms/Chip/Chip';
import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import {useAppSelector} from '@hooks/redux_hooks';

type IProps = {
  isSort?: any;
  point?: string;
  refetch?: any;
  button?: {
    label: string;
    onPress: () => void;
    leftIcon?: string;
  };
  store?: string;
  filter?: {
    name: string;
    param: string;
  }[];
  isInitialSet?: boolean;
};

const Filter: React.FC<IProps> = ({
  button,
  filter: metaData,
  store,
  isSort = true,
  point,
  refetch,
  isInitialSet = false,
}) => {
  const isFilterLoading = useSelector(
    (state: any) => state[store]?.isFilterLoading,
  );
  const data = useSelector((state: any) => state[store]?.filterData);
  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const filter = useSelector((state: any) => state[store]?.filter);
  const isInitialFilterSet = useSelector(
    (state: any) => state[store]?.isInitialSet,
  );

  console.log(isInitialFilterSet, ' initial filter data');
  const [isUpdated, setUpdated] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [key, setKey] = useState(0);
  const disptach = useDispatch();

  const onSheetOpenPress = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (isInitialSet && data && !isInitialFilterSet) {
      setInitailFilter();
    }
  }, [data, isInitialFilterSet, filter]);

  useEffect(() => {
    console.log('POINT1', point);
    console.log('POINT2', filter);
    console.log('POINT3', data);
    console.log('POINT4', filter);
  }, [point]);
  const onSheetClose = () => {
    setVisible(false);
    if (isUpdated) {
      refetch && refetch();
      setUpdated(false);
    }
  };

  const setInitailFilter = () => {
    try {
      const pointFilter = {};
      metaData.forEach(item => {
        const selectedItem = data[item.name][0];
        pointFilter[item.name] = {
          ...selectedItem,
          param: item.param,
        };
      });
      let newFilter = {};
      if (filter) {
        newFilter = {
          ...filter,
          [point]: pointFilter,
        };
      } else {
        newFilter = {
          [point]: pointFilter,
        };
      }

      // disptach(
      //   actions[store].setValues({
      //     filter: newFilter,
      //     isInitialSet: true,
      //   }),
      // );
    } catch (error) {}
  };

  const onFilterSelect = (selectedItem: any, name: any, param: any) => {
    let reqData = {};
    setKey(key + 1);
    console.log('onFilterSelect', param);
    console.log('onFilterSelect 2 ', name);
    console.log('onFilterSelect selectedItem  ', selectedItem);

    const selectedItem1 = {id: 474, name: '1234rtyu'};

    if (filter) {
      reqData = {
        ...filter,
        [point]: {
          ...filter[point],
          [name]: {...selectedItem, param},
        },
      };
    } else {
      reqData = {
        [point]: {
          [name]: {...selectedItem, param},
        },
      };
    }

    // disptach(
    //   actions[store].setValues({
    //     filter: reqData,
    //   }),
    // );

    // setUpdated(true);
  };

  const onDeletePress = (key: any) => {
    const newFilter = {
      ...filter,
      [point]: {
        ...filter[point],
        [key]: null,
      },
    };

    // disptach(
    //   actions[store].setValues({
    //     filter: newFilter,
    //   }),
    // );

    refetch();
  };

  return (
    <View style={styles.container}>
      <ScrollView key={key} style={styles.scrollContainer} horizontal>
        <View style={styles.startContainer}>
          {button && packageStatus == true ? (
            <Button {...button} isSmall containerStyle={styles.button} />
          ) : null}

          {filter && filter[point]
            ? Object.entries(filter[point]).map((item: any) => (
                <Chip
                  length={button ? 10 : 20}
                  onDeletePress={onDeletePress}
                  key={item[0]}
                  item={item}
                />
              ))
            : null}
        </View>
      </ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onSheetOpenPress} style={styles.iconButton}>
          <FontAwesome5Icon size={13} color={colors.primary} name="filter" />
        </TouchableOpacity>
      </View>
      <ActionSheet isVisible={isVisible} onClose={onSheetClose}>
        <View style={styles.sheetContainer}>
          <View style={styles.titleConatiner}>
            <Text isSemiBold={true} style={styles.title}>
              {`${point} ${store} Filter`}
            </Text>
          </View>
          <View style={styles.sheetContent}>
            {data && metaData
              ? metaData.map((item, index) => {
                  return (
                    <View key={item.name} style={[styles.dropdownContainer]}>
                      <Dropdown
                        data={data[item.name]}
                        fieldLabel="name"
                        fieldValue="id"
                        label={item.name}
                        placeholder={`Please Select ${item.name}`}
                        onItemChange={selectedItem => {
                          onFilterSelect(selectedItem, item.name, item.param);
                        }}
                        value={
                          filter && filter[point]
                            ? filter[point][item.name]?.id
                            : ''
                        }
                      />
                    </View>
                  );
                })
              : null}
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: moderateScale(10),
  },
  container: {
    backgroundColor: colors.white,
    height: moderateScale(50),
    flexDirection: 'row',
  },
  labelStyle: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),

    fontSize: fontsize.medium,
  },
  button: {
    marginEnd: moderateScale(10),
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingStart: moderateScale(7),
    borderStartWidth: 1,
    borderStartColor: colors.grayLight,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    paddingEnd: moderateScale(10),
  },
  scrollContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingStart: moderateScale(15),
  },
  iconButton: {
    padding: moderateScale(3),

    backgroundColor: colors.primaryLight,
    borderRadius: 4,
  },
  iconSortButton: {
    padding: moderateScale(7),
    marginStart: moderateScale(15),
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sheetContainer: {
    minHeight: moderateScale(350),
    paddingVertical: moderateScale(20),
    zIndex: moderateScale(10),
  },
  titleConatiner: {
    paddingBottom: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  title: {
    fontSize: fontsize.medium,
    color: colors.black,
    textTransform: 'capitalize',
  },
  sheetContent: {
    paddingHorizontal: moderateScale(15),
  },
  filterContainer: {
    flexGrow: 1,
  },
});
