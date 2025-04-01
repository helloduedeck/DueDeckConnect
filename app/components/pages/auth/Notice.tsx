import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
// import { TopTab} from '../../components';
import Container from '@components/atoms/Container';

import NoticeCard from '@components/atoms/NoticeCard/NoticeCard';
import {
  useCancelledNoticesMutation,
  useCompletedNoticesMutation,
  useGetSingleNoticeMutation,
  usePendingNoticesMutation,
} from '@api/notice';
import {useAppSelector} from '@hooks/redux_hooks';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Text from '@components/atoms/Text';
import {colors} from '@theme';
import Content from '@components/content/Content';
import {useSharedValue} from 'react-native-reanimated';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@routes';
import fontsize from '../../../themev1/fontstyle';
const tabs = [
  {
    id: 1,
    name: 'Pending',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Pending,
  },
  {
    id: 2,
    name: 'Completed',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Completed,
  },
  {
    id: 3,
    name: 'Cancelled',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Cancelled,
  },
];
const Notice = () => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [pendingNotices] = usePendingNoticesMutation();
  const [completedNotices] = useCompletedNoticesMutation();
  const [cancelledNotices] = useCancelledNoticesMutation();
  const [getSingleNotice] = useGetSingleNoticeMutation();
  const [listCount, setListCount] = useState(0);

  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const user = useAppSelector(state => state.user?.user);

  const navigation = useNavigation();

  const getListData = async () => {
    setIsLoading(true);
    if (selectedId === 1) {
      await pendingNotices({
        client_id: user?.data?.emp_id,
        branch_id: user?.data?.branch_id,
        sortstatus: 'asc',
      })
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 2) {
      await completedNotices({
        client_id: user?.emp_id,
        branch_id: user?.branch_id,
        sortstatus: 'asc',
      })
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch(e => {
          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 3) {
      await cancelledNotices({
        client_id: user?.emp_id,
        branch_id: user?.branch_id,
        sortstatus: 'asc',
      })
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);
          } else {
            setListData([]);
            setListCount(0);
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

  const onTabSelected = (id: number) => {
    setSelectedId(id);
    if (id != selectedId) {
      setListCount(0);
    }
  };

  useEffect(() => {
    getListData();
  }, [selectedId]);

  const onListRefresh = () => {
    getListData();
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  const renderItem = useCallback(
    ({item}: any) => (
      <NoticeCard
        isPending={selectedId === 1}
        isCompleted={selectedId === 2}
        item={item}
        viewableItems={viewableItems}
        date={undefined}
      />
    ),
    [],
  );

  const listEmptyComponent = useCallback(
    () =>
      packageStatus == false ? null : <EmptyOther navigation={undefined} />,
    [],
  );
  const keyExtractor = (item: any) => item.id;

  return (
    <Container backLabel={['Dashboard', 'Notice']}>
      <CustomHeader title="Notice" />

      <View style={{marginHorizontal: 40}}>
        <View style={{flexGrow: 0, flexDirection: 'row'}}>
          {tabs?.map(item => {
            return (
              <Pressable
                style={[
                  styles.tabContainer,
                  selectedId === item.id ? {backgroundColor: colors.white} : {},
                ]}
                onPress={() => {
                  onTabSelected(item.id);
                }}>
                <Text>{item.name}</Text>
                <View style={styles.countContainer}>
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
                          paddingHorizontal: moderateScale(4),
                          borderRadius: 80,
                          paddingVertical: moderateScale(1),
                          fontSize: fontsize.medium10,
                        }}>
                        {listCount}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <Content isLoading={isLoading} style={styles.container}>
        <>
          <FlatList
            data={listData}
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
    </Container>
  );
};

export default Notice;

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90@ms',
    height: '30@ms',
    margin: '6@ms',
    borderRadius: 4,
    paddingHorizontal: moderateScale(4),
  },
  countContainer: {
    width: 20,
    height: 20,
    borderRadius: 50,
    // backgroundColor: colors.grayLight,
    alignItems: 'center',
    margin: '2@ms',
    // marginLeft: '5@ms',
    //  padding: 3,
  },
});
