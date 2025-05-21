import {SectionList, View, ViewToken, TextInput, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '@components/atoms/Container';
import {useAppSelector} from '@hooks/redux_hooks';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import Content from '@components/content/Content';
import {useSharedValue} from 'react-native-reanimated';
import {Label} from '@components/atoms/Label';
import {Sublabel} from '@components/atoms/SubLabel';
import {useNotificationsMutation} from '@api/notifications';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationHeader from '@components/organisms/Headers/NotificationHeader';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import moment from 'moment';
import {debounce} from 'lodash';
import {useIsFocused} from '@react-navigation/native';
const newTaskData = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        task: 'Buy groceries',
      },
      {
        id: '2',
        task: 'Feed Cat',
      },
      {
        id: '3',
        task: 'Sleep for 3 hours',
      },
      {
        id: '4',
        task: 'Water Plants',
      },
      {
        id: '5',
        task: 'Drink Water',
      },
    ],
  },

  {
    title: 'April 1',
    data: [
      {
        id: '1',
        task: 'Buy groceries',
      },
      {
        id: '2',
        task: 'Feed Cat',
      },
      {
        id: '3',
        task: 'Sleep for 3 hours',
      },
      {
        id: '4',
        task: 'Water Plants',
      },
      {
        id: '5',
        task: 'Drink Water',
      },
    ],
  },
];
const Notifications = () => {
  const [listData, setListData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [getNotifications] = useNotificationsMutation();
  const [notificationCount, setNotificationCount] = useState(0);
  const isFocused = useIsFocused();
  const [searchPhrase, setSearchPhrase] = useState('');
  
  useEffect(() => {
    if (isFocused) {
      getNotificationData();
    } else {
      setListData([]);
      setSearchPhrase('');
    }
  }, [isFocused]);

  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const user = useAppSelector(state => state.user?.user);
  const [showSearch, setShowSearch] = useState(false);

  const getNotificationData = async () => {
    setIsLoading(true);
    if (selectedId === 1) {
      await getNotifications({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setFullData(data?.data);
            setNotificationCount(data?.count);
          } else {
            setListData([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((e: any) => {
          console.log('ERROR getNotificationData ', e);
        });
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onListRefresh = () => {};

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  const getFormatedDate = (dateTime: string) => {
    const notificationTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format(
      'hh:mm A',
    );
    return notificationTime;
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => {
    return (
      <>
        <View style={styles.cardcontainer(backgroundColor)}>
          <Label
            size={'small'}
            fontWeight={'semibold'}
            title={item.message}
            color={colors.GRey800}
          />
          <View style={styles.date}>
            <Sublabel
              size={'small'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={getFormatedDate(item.created_date)}
              color={colors.Grey600}
              align={undefined}
            />
          </View>
        </View>
      </>
    );
  };
  const changeTextDebounced = (txt: string) => {
    setSearchPhrase(txt);
  };
  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    [],
  );
  const renderItem = ({item}: any) => {
    const backgroundColor = item.id === '2' ? 'white' : `${colors.primary}10`;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  function filterNotificationsByMessage(
    notificationListData: any[],
    searchString: string,
  ) {
    const filteredData: {title: any; data: any}[] = [];

    notificationListData.forEach(dayData => {
      const filteredDayData = dayData.data.filter(
        (notification: {message: string}) => {
          return notification.message
            .toLowerCase()
            .includes(searchString.toLowerCase());
        },
      );

      if (filteredDayData.length > 0) {
        filteredData.push({
          title: dayData.title,
          data: filteredDayData,
        });
      }
    });

    return filteredData;
  }
  const keyExtractor = (item: any) => item.id;

  return (
    <Container isSubLabel={true} backLabel={['Dashboard', 'Notice']}>
      {!showSearch && (
        <NotificationHeader
          title="Notifications"
          onSearchIconPress={function (): void {
            setShowSearch(true);
          }}
          count={notificationCount}
        />
      )}
      {showSearch && (
        <View style={{margin: moderateScale(20)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              {/* <Ionicons name="arrow-left" size={24} color="black" onPress={() => setSearchVisible(true)} /> */}
              <MaterialCommunityIcons
                name={'arrow-left'}
                color={colors.GRey800}
                size={20}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                borderWidth: 1,
                borderColor: colors.logicon,
                borderRadius: 5,
                height: 40,
                marginHorizontal: 20,
              }}>
              <Ionicons
                name={'search'}
                size={18}
                color={colors.GRey800}
                style={{paddingHorizontal: moderateScale(10)}}
              />
              <TextInput
                style={{flex: 1, paddingHorizontal: moderateScale(10),color:colors.GRey800}}
                placeholder="Search Notification.."
                placeholderTextColor={colors.Grey600}
                onChangeText={changeTextDebouncer}
              />
            </View>
            {showSearch && (
              <TouchableOpacity
                onPress={() => {
                  setSearchPhrase('');
                  setShowSearch(false);
                }}>
                <Ionicons
                  name={'close'}
                  size={24}
                  color={colors.GRey800}
                  style={{marginLeft: moderateScale(10)}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <Content isLoading={isLoading}>
        <>
          <SectionList
            sections={filterNotificationsByMessage([...listData], searchPhrase)}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyOther navigation={undefined} />}
            renderSectionHeader={({section}) => (
              <View style={{marginStart: moderateScale(20)}}>
                <Label
                  size={'small'}
                  fontWeight={'semibold'}
                  title={section.title}
                  color={colors.GRey800}
                />
              </View>
            )}
            keyExtractor={keyExtractor}
            initialNumToRender={25}
            //inverted // to see most recent changes
            // windowSize={5}
            // maxToRenderPerBatch={10}
            // removeClippedSubviews={true}
          />
        </>
      </Content>
    </Container>
  );
};

const styles = ScaledSheet.create({
  cardcontainer: (color: string) => ({
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(11),
    backgroundColor: color,
    borderRadius: 4,
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(4),
  }),
  date: {
    flex: 1,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 15,
    paddingBottom: moderateScale(8),
  },
});

export default Notifications;
