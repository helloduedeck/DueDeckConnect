import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../store';
import {colors} from '../../theme';
import Empty from '../empty/Empty';
import Content from '../content/Content';
import PremiumButton from '../../container/dashboard/components/premium/PremiumButton';
import {useSharedValue} from 'react-native-reanimated';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type IProps = {
  point?: string;
  store?: string;
  renderItem?: ({item, index, viewableItems}: any) => JSX.Element;
};

const List1: React.FC<IProps> = ({point, store, renderItem}) => {
  const dispatch = useDispatch();
  const packageStatus = useSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const viewableItems = useSharedValue<ViewToken[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    viewableItems.value = [];
  };

  const onRefresh = () => {
    fetchData();
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  return (
    <View style={styles.container}>
      <Content style={styles.container}>
        <FlatList
          data={DATA}
          contentContainerStyle={styles.content}
          onViewableItemsChanged={viewableItem}
          ListEmptyComponent={
            packageStatus == false ? <PremiumButton /> : <Empty />
          }
          keyExtractor={item => `${item.id}`}
          renderItem={item => renderItem({...item, viewableItems})}
        />
      </Content>
    </View>
  );
};

export default List1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: 'whitesmoke',
  },
});
