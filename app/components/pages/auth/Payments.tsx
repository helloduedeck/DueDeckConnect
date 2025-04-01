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
import BalanceBoard from '@components/organisms/Payment/BalanceBoard';
import InvoicePayCard from '@components/organisms/Payment/InvoicePayCard';
import {
  useGetCreditNoteMutation,
  useGetDebitNoteMutation,
  useGetReceiptsMutation,
  usePendingInvoicesMutation,
} from '@api/payment';
import {ROUTES} from '@routes';
import colors from '../../../themev1/colors';
import fontsize from '../../../themev1/fontstyle';
import DebitCreditCard from '@components/organisms/Payment/DebitCreditCard';
import {useFocus} from '@utils/useFocus';
import {Label} from '@components/atoms/Label';
import FeatureDisableComp from '@components/molecules/TopHeader/FeatureDisableComp';
import { useNavigation } from '@react-navigation/native';

const reqData = {
  client_id: '',
  branch_id: '',
  firm_id: '',
  fyear: '',
};

const tabs = [
  {
    id: 1,
    name: 'Invoice',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Pending,
  },
  {
    id: 2,
    name: 'Receipt',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Completed,
  },
  {
    id: 3,
    name: 'Debit Note',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Cancelled,
  },
  {
    id: 4,
    name: 'Credit Note',
    background: colors.white,
    color: colors.toptab,
    selectedColor: colors.Grey600,
    selectedbackgroundColor: `${colors.Grey600}13`,
    // component: Cancelled,
  },
];
const Payments = (props:any) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [pendingInvoices] = usePendingInvoicesMutation();
  const [getReceipts] = useGetReceiptsMutation();
  const [getDebitNote] = useGetDebitNoteMutation();
  const [getCreditNote] = useGetCreditNoteMutation();

  const navigation =useNavigation()

  const [moduleStatus, setModuleStatus] = useState();
  const [packagesDisbaleMessage, setPackageDisableMessage] = useState('');

  const {isFocused} = useFocus();

  const packageStatus = useAppSelector(
    (state: any) => state.dashboard?.packageStatus,
  );
  const {activeClient, activeBranch, activeBillingFirm} = useAppSelector(
    (state: any) => state.dashboard,
  );

  const selectedGpanelData = {
    selectedConsultant: activeBranch?.id,
    selectedOrganization: activeClient?.id,
    selectedBillingFirm: activeBillingFirm,
  };

  useEffect(() => {
    if (isFocused) {
      setSelectedId(1);
      getListData();
    }
  }, [isFocused]);

  const viewableItems = useSharedValue<ViewToken[]>([]);
  const [listCount, setListCount] = useState(0);
  const [balanceCardData, setBalanceCardData] = useState({
    openingbalance: 0,
    balancelimit: 0,
    creditlimit: 0,
    paymentreceivable: 0,
  });
  const getListData = async () => {
    setIsLoading(true);
    if (selectedId === 1) {
      await pendingInvoices({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            if (data?.module_status === 1) {
              setListData(data?.data);

              setBalanceCardData({
                openingbalance: data?.message?.openingbalance,
                balancelimit: data?.message?.balancelimit,
                creditlimit: data?.message?.creditlimit,
                paymentreceivable: data?.message?.paymentreceivable,
              });
              setListCount(data?.data?.length);

            }
            console.log('pendingInvoices', data);

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
      await getReceipts({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setBalanceCardData({
              openingbalance: data?.message?.openingbalance,
              balancelimit: data?.message?.balancelimit,
              creditlimit: data?.message?.creditlimit,
              paymentreceivable: data?.message?.paymentreceivable,
            });
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
          setListData([]);
          setListCount(0);

          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 3) {
      await getDebitNote({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setBalanceCardData({
              openingbalance: data?.message?.openingbalance,
              balancelimit: data?.message?.balancelimit,
              creditlimit: data?.message?.creditlimit,
              paymentreceivable: data?.message?.paymentreceivable,
            });
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
          setListData([]);
          setListCount(0);

          console.log('ERROR PENDING LIST', e);
        });
    } else if (selectedId === 4) {
      await getCreditNote({})
        .unwrap()
        .then(data => {
          if (data?.success) {
            setListData(data?.data);
            setBalanceCardData({
              openingbalance: data?.message?.openingbalance,
              balancelimit: data?.message?.balancelimit,
              creditlimit: data?.message?.creditlimit,
              paymentreceivable: data?.message?.paymentreceivable,
            });
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
          setListData([]);
          setListCount(0);
        });
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

  const onLedgerButtonPress = () => {
    console.log('ONLEDGER PRESS');
    //enable this below code once packageStatus is clear
    // if (!packageStatus) {
    //   toast.failure("You don't have any active plan");
    //   return;
    // }

    // const selectedFYearId = globalPanelFyears.filter((item: any) => {
    //   return item.fyear == activeFinancialYearPayment;
    // });

    // console.log('reqData', reqData);
    // client_id
    navigation.push(ROUTES.PAYMENTDOC, {reqData, route: 'Ledger'});
  };
  const onPdfPress = item => {
    let id;
    if (getSelectedPoint() === 'Invoice') {
      id = item?.id;
    } else if (getSelectedPoint() === 'Receipt') {
      id = item?.receipt_id;
    } else if (getSelectedPoint() === 'Debitnote') {
      id = item?.id;
    } else if (getSelectedPoint() === 'Creditnote') {
      id = item?.id;
    }
    navigation.push(ROUTES.DOCPDFVIEW, {
      route: getSelectedPoint(),
      reqData: {...reqData, id: id},
    });
  };
  const getSelectedPoint = () => {
    if (selectedId === 1) {
      return 'Invoice';
    } else if (selectedId === 2) {
      return 'Receipt';
    } else if (selectedId === 3) {
      return 'Debitnote';
    } else if (selectedId === 4) {
      return 'Creditnote';
    }
  };

  const keyExtractor = (item: any) => item.id;

  const onTabSelect = (id: number) => {
    if (id != selectedId) {
      setListCount(0);
    }
    setSelectedId(id);
  };

  const renderItem = useCallback(
    ({item}: any) =>
      selectedId === 1 || selectedId === 2 ? (
        <InvoicePayCard
          isPending={selectedId === 1}
          isCompleted={selectedId === 2}
          point={getSelectedPoint()}
          item={item}
          viewableItems={viewableItems}
          date={undefined}
          onPdfButtonPress={() => onPdfPress(item)}
          firmBranchClientData={selectedGpanelData}
        />
      ) : (
        <DebitCreditCard
          isPending={selectedId === 1}
          isCompleted={selectedId === 2}
          point={getSelectedPoint()}
          item={item}
          viewableItems={viewableItems}
          date={undefined}
          onPdfButtonPress={() => onPdfPress(item)}
        />
      ),
    [selectedId],
  );

  const listEmptyComponent = useCallback(
    () =>
      packageStatus == false ? null : <EmptyOther navigation={undefined}/>,
    [],
  );

  const renderData = () => {
    if (moduleStatus === 0) {
      return <FeatureDisableComp title={packagesDisbaleMessage} />;
    } else {
      return (
        <>
          {selectedId === 3 || selectedId === 4 ? null : (
            <BalanceBoard
              openingbalance={balanceCardData?.openingbalance}
              balancelimit={balanceCardData?.balancelimit}
              creditlimit={balanceCardData?.creditlimit}
              paymentreceivable={balanceCardData?.paymentreceivable}
              onLedgerPress={onLedgerButtonPress}
            />
          )}
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
      );
    }
  };

  return (
    <Container isSubLabel={true} backLabel={['Dashboard', 'Notice']}>
      <CustomHeader title="Payments" />

      <ScrollView horizontal style={{flexGrow: 0}}>
        {tabs?.map(item => {
          return (
            <Pressable
              style={[
                styles.tabContainer,
                selectedId === item.id ? {backgroundColor: colors.white} : {},
              ]}
              disabled={moduleStatus === 0}
              onPress={() => {
                onTabSelect(item.id);
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
      </ScrollView>
      <Content isLoading={isLoading} style={styles.container}>
        <>{renderData()}</>
      </Content>
    </Container>
  );
};

export default Payments;

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90@ms',
    height: '30@ms',
    margin: '6@ms',
    borderRadius: 4,
  },
  countContainer: {},
});
