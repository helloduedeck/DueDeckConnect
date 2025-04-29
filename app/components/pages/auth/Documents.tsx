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
import {useAppSelector} from '@hooks/redux_hooks';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Text from '@components/atoms/Text';
import Content from '@components/content/Content';
import {useSharedValue} from 'react-native-reanimated';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import DocumentCard from '@components/organisms/Document/DocumentCard';
import colors from '../../../themev1/colors';
import fontsize from '../../../themev1/fontstyle';
import {
  useGetOutwardDocumentsMutation,
  useGetPendingDocumentsMutation,
  useStoreDocumentsMutation,
} from '@api/documents';
import FeatureDisableComp from '@components/molecules/TopHeader/FeatureDisableComp';
import CustomHeaderW from '@components/organisms/Headers/CustomHeaderW';
import { useFocusEffect } from '@react-navigation/native';
import { useFocus } from '@utils/useFocus';
// import fontsize from '@themev1/fontstyle';

const tabs = [
  {
    id: 1,
    name: 'Pending',
    background: colors.white,
    color: colors.GRey800,
    selectedColor: colors.white,
    selectedbackgroundColor: `${colors.Grey600}13`,
  },
  {
    id: 2,
    name: 'Stores',
    background: colors.white,
    color: colors.GRey800,
    selectedColor: colors.white,
    selectedbackgroundColor: `${colors.Grey600}13`,
  },
  {
    id: 3,
    name: 'Outward',
    background: colors.white,
    color: colors.GRey800,
    selectedColor: colors.white,
    selectedbackgroundColor: `${colors.Grey600}13`,
  },
];
const Documents = () => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [getPendingDocuments] = useGetPendingDocumentsMutation();
  const [storeDocuments] = useStoreDocumentsMutation();
  const [getOutwardDocuments] = useGetOutwardDocumentsMutation();
  const [listCount, setListCount] = useState(0);
  const {isFocused} = useFocus();

  const [moduleStatus, setModuleStatus] = useState();
  const [packagesDisbaleMessage, setPackageDisableMessage] = useState('');

  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const getListData = async () => {
    setIsLoading(true);
    setListCount(0);
    if (selectedId === 1) {
      await getPendingDocuments({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setListCount(data?.data?.length);

            setModuleStatus(data?.module_status);//
            setPackageDisableMessage(
              data?.module_message ?? 'This feature is not enabled',
            );
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
      await storeDocuments({})
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
      await getOutwardDocuments({})
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

  useFocusEffect(
    useCallback(() => {
      getListData();
    }, [selectedId])
  );
  const onListRefresh = () => {
    getListData();
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  const keyExtractor = (item: any) => item.id;

  return (
    <Container isSubLabel={true} backLabel={['Dashboard', 'Notice']}>
      <View style={{height:40,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center'}}>
      <CustomHeaderW title={'Documents'} />
      </View>
      <View style={{marginHorizontal: moderateScale(40),marginTop:moderateScale(10)}}>
        <View style={{flexGrow: 0, flexDirection: 'row'}}>
          {tabs?.map(item => {
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.tabContainer,
                  selectedId === item.id ? {backgroundColor: colors.primary} : {},
                
                  selectedId === item.id
                    ? item.selectedbackgroundColor
                    : item.background,
                ]}
                disabled={moduleStatus === 0}
                onPress={() => {
                  setSelectedId(item.id);
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
                        paddingHorizontal: moderateScale(4),
                        borderRadius: 80,
                        paddingVertical: moderateScale(1),
                        fontSize: fontsize.medium10,
                      }}>
                      {listCount}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
      {moduleStatus === 0 ? <FeatureDisableComp title={packagesDisbaleMessage} /> : <Content isLoading={isLoading} style={styles.container}>
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
            ListEmptyComponent={
              packageStatus == false ? null : (
                <EmptyOther navigation={undefined} />
              )
            }
            keyExtractor={keyExtractor}
            renderItem={({item}) => (
              <DocumentCard item={item} viewableItems={viewableItems} />
            )}
          />
        </>
      </Content>
}
    </Container>
  );
};

export default Documents;

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90@ms',
    height: '30@ms',
    margin: '6@ms',
    borderRadius: 40,
    borderColor:colors.toptab,
    borderWidth:1,
    backgroundColor:colors.white
  },
  countContainer: {},
});
