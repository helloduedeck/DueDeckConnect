import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '@components/atoms/Container';
import {useAppSelector} from '@hooks/redux_hooks';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Text from '@components/atoms/Text';
import {colors} from '@theme';
import Content from '@components/content/Content';
import {useSharedValue} from 'react-native-reanimated';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import {
  useGetAssignedServicesMutation,
  useGetCompletedServicesMutation,
  useGetInProgressServicesMutation,
  useGetOnHoldServicesMutation,
} from '@api/services';
import SearchBox from '@components/molecules/SearchBox/SearchBox';
import {fontsize} from '../../../themev1';
import ServiceItemCard from '@components/organisms/ServiceItem/ServiceItemCard';
import {useFocus} from '@utils/useFocus';
import {useIsFocused} from '@react-navigation/native';
import FeatureDisableComp from '@components/molecules/TopHeader/FeatureDisableComp';

const tabs = [
  {
    id: 1,
    name: 'Assigned',
    background: colors.white,
    color: colors.Grey600,
    selectedColor: colors.semorange,
    selectedbackgroundColor: `${colors.semorange}13`,
  },
  {
    id: 2,
    name: 'In Progress',
    background: colors.white,
    color: colors.Grey600,
    selectedColor: colors.semblue,
    selectedbackgroundColor: `${colors.semblue}13`,
  },
  {
    id: 3,
    name: 'On Hold',
    background: colors.white,
    color: colors.Grey600,
    selectedColor: colors.darkred,
    selectedbackgroundColor: `${colors.darkred}13`,
  },
  {
    id: 4,
    name: 'Completed',
    background: colors.white,
    color: colors.Grey600,
    selectedColor: colors.SemGreen500,
    selectedbackgroundColor: `${colors.SemGreen500}13`,
  },
  // {
  //   id: 5,
  //   name: 'Requested',
  //   background: colors.white,
  //   color: colors.Grey600,
  //   selectedColor: colors.SemGreen500,
  //   selectedbackgroundColor: `${colors.SemGreen500}13`,
  // },
];
const Services = (props: any) => {
  const {isFocused} = useFocus();
  const isScreenFocused = useIsFocused();
  const [listData, setListData] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [assignedServices] = useGetAssignedServicesMutation();
  const [inProgressServices] = useGetInProgressServicesMutation();
  const [completedServices] = useGetCompletedServicesMutation();
  const [onholdServices] = useGetOnHoldServicesMutation();
  const [listCount, setListCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [moduleStatus, setModuleStatus] = useState();
  const [packagesDisbaleMessage, setPackageDisableMessage] = useState();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    isFocused && setSearchText('');
    if (isFocused && props?.route?.params?.selectedTab === 1) {
      setSelectedId(1);
      scrollViewRef &&
        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  }, [isFocused]);

  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const viewableItems = useSharedValue<ViewToken[]>([]);

  useEffect(() => {
    if (props?.route?.params?.selectedTab) {
      if (props?.route?.params?.selectedTab === 4) {
        scrollViewRef && scrollViewRef.current.scrollToEnd({animated: true});
      }
      setSelectedId(props?.route?.params?.selectedTab);
    } else {
      scrollViewRef.current.scrollTo(0);
      setSelectedId(props?.route?.params?.selectedTab ?? 1);
    }
  }, [props?.route?.params?.selectedTab]);

  useEffect(() => {
    if (isFocused) {
      getListData();
    }
  }, [selectedId, isFocused]);

  const getListData = async () => {
    setListData([]);
    setListCount(0);
    setIsLoading(true);
    if (selectedId === 1) {
      await assignedServices({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            if (data?.module_status === 1) {
              setListData(data?.data);
              setFilteredDataSource(data?.data);
            }
            setListCount(data?.module_status === 1 ? data?.data?.length : 0);
            setModuleStatus(data?.module_status); //
            setPackageDisableMessage(
              data?.module_message ?? 'This feature is not enabled',
            );
          } else {
            setListData([]);
            setListCount(0);
            setFilteredDataSource([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 2) {
      await inProgressServices({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setFilteredDataSource(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
            setFilteredDataSource([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 3) {
      await onholdServices({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setFilteredDataSource(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
            setFilteredDataSource([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 4) {
      await completedServices({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setFilteredDataSource(data?.data);
            setListCount(data?.data.length);
          } else {
            setListData([]);
            setListCount(0);
            setFilteredDataSource([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    }
  };

  const onListRefresh = () => {
    getListData();
    setSearchText('');
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  const onSearchServices = () => {
    // Check if searched text is not blank
    if (searchText) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = listData.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.service_name
          ? item.service_name.toUpperCase()
          : ''.toUpperCase();
        const textData = searchText.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(listData);
    }
  };
  const keyExtractor = (item: any) => item.id;

  const onFilter = () => {};
  const renderItem = useCallback(
    ({item}: any) => (
      <ServiceItemCard
        item={item}
        isAssigned={item.taskstatus_id == 1}
        isOnHold={item.taskstatus_id == 5}
        isinProgress={item.taskstatus_id == 2}
        isCompleted={item.taskstatus_id == 3}
        viewableItems={viewableItems}
        date={undefined}
      />
    ),
    [],
  );

  const onTabSelected = (id: number) => {
    if (id != selectedId) {
      setListCount(0);
    }
    setSelectedId(id);
    setSearchText('');
  };
  const listEmptyComponent = useCallback(
    () =>
      packageStatus == false ? null : <EmptyOther navigation={undefined} style={{marginTop:'40%'}}/>,
    [],
  );
  return (
    <Container isSubLabel={true} backLabel={['Dashboard', 'Notice']}>
      <CustomHeader title="Tasks" />
      <ScrollView horizontal style={{flexGrow: 0}} ref={scrollViewRef}>
        {tabs?.map(item => {
          return (
            <Pressable
              style={[
                styles.tabContainer,
                selectedId === item.id
                  ? {backgroundColor: item.background}
                  : {},
              ]}
              disabled={moduleStatus === 0}
              onPress={() => {
                onTabSelected(item.id);
              }}>
              <Text
                style={{
                  color:
                    selectedId === item.id ? item.selectedColor : item.color,
                }}>
                {item.name}
              </Text>
              {selectedId === item.id && (
                <View style={styles.countContainer}>
                  <Text
                    style={{
                      color:
                        selectedId === item.id
                          ? item.selectedColor
                          : item.color,
                      backgroundColor:
                        selectedId === item.id
                          ? item.selectedbackgroundColor
                          : item.backgroundColor,
                      paddingHorizontal: 4,
                      borderRadius: 80,
                      paddingVertical: 1,
                      fontSize: fontsize.medium10,
                    }}>
                    {listCount}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
      {moduleStatus === 0 ? (
        <FeatureDisableComp title={packagesDisbaleMessage} />
      ) : (
        <>
          <SearchBox
            onTextChange={(text: string) => setSearchText(text)}
            onSearch={onSearchServices}
            onFilter={onFilter}
            searchText={searchText}
          />
          <Content isLoading={isLoading} style={styles.container}>
            <>
              <FlatList
                data={filteredDataSource}
                contentContainerStyle={styles.content}
                onViewableItemsChanged={viewableItem}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onListRefresh}
                  />
                }
                ListEmptyComponent={listEmptyComponent}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </>
          </Content>
        </>
      )}
    </Container>
  );
};

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '30@ms',
    margin: '6@ms',
    paddingHorizontal: '6@ms',
    marginHorizontal: moderateScale(16),
    borderRadius: 4,
  },
  countContainer: {
    marginLeft: '5@ms',
    padding: 3,
  },
});

export default Services;
