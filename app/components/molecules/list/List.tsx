import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '@theme';
// import {actions} from '../../store';
import Filter from '../filter/Filter';
import PaymentFilter from '../filter/PaymentFilter';
import {useSharedValue} from 'react-native-reanimated';
import Content from '@components/content/Content';
// import PremiumButton from '../../container/dashboard/components/premium/PremiumButton';
import EmptyOther from '../empty/EmptyOther';
import {useAppSelector} from '@hooks/redux_hooks';

type IProps = {
  point?: String;
  isSort?: any;
  store?: string;
  renderItem?: ({item, index, viewableItems}: any) => JSX.Element;
  button?: {
    label: string;
    onPress: () => void;
    leftIcon?: string;
  };
  filter?: {
    name: string;
    param: string;
  }[];
  paymentfilter?: boolean;
  isInitialSet?: boolean;
  tour?: {
    tourKey?: string;
    listGuide?: string;
    filterGuide?: string;
    step?: number;
  };
  renderFilterBottom?: () => JSX.Element;
};

const EMPTY_TOUR = {
  tourKey: '',
  listGuide: '',
  filterGuide: '',
  step: 0,
};

const List: React.FC<IProps> = ({
  point,
  store,
  renderItem,
  button,
  filter,
  paymentfilter,
  isSort,
  renderFilterBottom,
  isInitialSet,
  tour = EMPTY_TOUR,
  data = [],
  onListRefresh = () => {},
}) => {
  const pointLow = point?.toLowerCase();
  const disptach = useDispatch();
  // const apiBodyReq = useSelector((state: any) => state.dashboard.apiBodyReq);
  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  // const data = useSelector((state: any) => state?.[store]?.[pointLow]);
  const isLoading = useSelector(
    (state: any) => state?.[store]?.[`is${point}Loading`],
  );
  const viewableItems = useSharedValue<ViewToken[]>([]);
  useEffect(() => {
    getData();
    if (filter) {
      getFilter();
    }
  }, []);

  const getFilter = () => {
    try {
      const reqData = {
        data: filter.map(item => item.name).join(','),
      };
      // disptach(actions[store].getFilter(reqData));
    } catch (error) {}
  };

  const getData = () => {
    // disptach(actions[store][`get${point}`]());
    viewableItems.value = [];
  };

  const onRefresh = () => {
    onListRefresh();
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  return (
    <View style={styles.container}>
      {filter ? (
        <>
          <Filter
            point={pointLow}
            filter={filter}
            refetch={getData}
            isSort={isSort}
            store={store}
            button={button}
            isInitialSet={isInitialSet}
          />
        </>
      ) : null}
      {paymentfilter && <PaymentFilter />}
      {renderFilterBottom && renderFilterBottom()}
      <Content isLoading={isLoading} style={styles.container}>
        <>
          <FlatList
            data={data}
            contentContainerStyle={styles.content}
            onViewableItemsChanged={viewableItem}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              packageStatus == false ? null : (
                <EmptyOther navigation={undefined} />
              )
            }
            keyExtractor={item => `${item.id}`}
            renderItem={item => renderItem({...item, viewableItems})}
          />
        </>
      </Content>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: 'whitesmoke',
  },
});
