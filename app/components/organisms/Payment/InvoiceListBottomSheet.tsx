import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

import CheckBox from '@react-native-community/checkbox';
import {FlatList} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {ROUTES} from '@routes';
import Text from '@components/atoms/Text';
import {colors, fontsize} from '../../../themev1';
import ActionSheet from '@components/atoms/actionSheet/ActionSheet';
import Content from '@components/content/Content';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import PaySelected from '@components/molecules/Payment/PaySelected';
import {useGetRemainingInvoiceMutation} from '@api/payment';
import {useAppSelector} from '@hooks/redux_hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateFormat} from '@utils/helper';

type IProps = {
  onClose: () => void;
  isVisible: boolean;
  parameter?: any;
};

type FileRowProps = {
  item: any;
  index: number;
  isSelected: any;
  onCheckboxChange: () => void;
  onClose: () => void;
};

const FileRow: React.FC<FileRowProps> = ({
  item,
  onClose,
  isSelected,
  onCheckboxChange,
}) => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const [isCheckboxSelected, setCheckboxSelected] = useState(false);

  const onPress = async () => {
    navigation.navigate(ROUTES.DOCVIEWER, item);
    onClose();
  };

  return (
    <TouchableOpacity
      onPress={onCheckboxChange}
      disabled={isLoading}
      style={styles.itemContainer}>
      <Pressable onPress={onCheckboxChange}>
        <CheckBox
          value={isSelected}
          onValueChange={onCheckboxChange}
          style={styles.checkbox}
        />
      </Pressable>

      <View style={styles.FirstLabelContainer}>
        <Text style={styles.itemLabel}>{item.perticulars} </Text>
        <View style={styles.subitemContainer}>
          <MaterialCommunityIcons
            name={'calendar-blank-outline'}
            color={colors.hexgray}
            size={fontsize?.medium ?? 12}
            style={{marginTop: 13, paddingStart: moderateScale(10)}}
          />
          <Text style={styles.itemsubLabel}>{dateFormat(item.date)}</Text>
          <Text style={[styles.itemsubLabel, {marginLeft: 8, marginTop: 8}]}>
            Voucher No.{item.voucher_no}
          </Text>
        </View>
      </View>

      <View style={styles.SecondLabelContainer}>
        <Text
          style={[styles.amountLabel, {  color: isSelected ?'black' : colors.Grey600} ]}>
          <FontAwesome
            name={'rupee'}
            color={isSelected ? 'black'  : colors.Grey600}
            size={fontsize.medium}
          />
          {item.balance_amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const InvoicesList: React.FC<IProps> = ({isVisible, onClose, parameter}) => {
  const [modalVisible, setModalVisible] = useState(isVisible);
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentamount, setPaymentamount] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const apiBodyReq = useSelector((state: any) => state.dashboard.apiBodyReq);
  const [getRemainingInvoice] = useGetRemainingInvoiceMutation();

  const {activeClient, activeBranch, activeBillingFirm} = useAppSelector(
    (state: any) => state.dashboard,
  );

  const firmBranchClientData = {
    selectedConsultant: activeBranch?.id,
    selectedOrganization: activeClient?.id,
    selectedBillingFirm: activeBillingFirm,
  };

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const req = {
      billingfirm_id: activeBillingFirm,
    };

    await getRemainingInvoice(req)
      .unwrap()
      .then(data => {
        if (data?.success) {
          setInvoices(data?.data);
        } else {
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(e => {
        console.log('ERROR PENDING LIST', e);
      });
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View style={{paddingHorizontal: moderateScale(10)}}>
        <FileRow
          onClose={onClose}
          index={index}
          item={item}
          isSelected={selectedItems.includes(item.id)}
          onCheckboxChange={() => toggleItem(item.id)}
        />
      </View>
    );
  };

  const toggleItem = (itemId: number) => {
    const selected = selectedItems.includes(itemId);
    if (selected) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
      setPaymentamount(
        paymentamount -
          parseFloat(invoices.find(row => row.id === itemId).balance_amount),
      );
    } else {
      setSelectedItems([...selectedItems, itemId]);
      setPaymentamount(
        paymentamount +
          parseFloat(invoices.find(row => row.id === itemId).balance_amount),
      );
    }
  };

  const keyExtractor = (item: any, index: number) => item.id + '-' + index;

  return (
    <ActionSheet isVisible={modalVisible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.titleConatiner}>
          <Text isSemiBold={true} style={styles.title}>
            Select Invoice (s) to Pay
          </Text>

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: moderateScale(0),
              right: moderateScale(24),
            }}
            onPress={onClose}>
            <Icon name="close" size={16} color={colors.Grey600} />
          </TouchableOpacity>
        </View>

        <Content style={styles.subContainer} isLoading={isLoading}>
          <FlatList
            data={invoices}
            ListEmptyComponent={<EmptyOther navigation={undefined} />}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            // contentContainerStyle={{
            //   flex: 1,
            // }}
          />
          <View style={styles.footerContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text> Total (Including GST)</Text>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  right: moderateScale(-40),
                }}>
                <FontAwesome
                  name={'rupee'}
                  color={colors.semorange}
                  size={fontsize.xlarge22}
                  style={{marginTop: moderateScale(5)}}
                />
                <Text style={styles.amount}>
                  {Math.ceil(paymentamount * 100) / 100 >= 0
                    ? (Math.ceil(paymentamount * 100) / 100).toFixed(6)
                    : 0}
                </Text>
              </View>
            </View>
            <PaySelected
              details={{
                ...apiBodyReq,
                ...parameter,
                selectedItems,
                invoices,
                firmBranchClientData,
              }}
              amount={Math.ceil(paymentamount * 100) / 100}
              onSuccess={() => {
                onClose();
              }}
            />
          </View>
        </Content>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 14,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(15),
    marginTop: moderateScale(10),
  },
  amount: {
    marginLeft: moderateScale(5),
    color: colors.semorange,
    width: '60%',
    right: 0,
    fontSize: fontsize.xlarge,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(5),
  },
  subitemContainer: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: colors.lightorange,
    borderRadius: 4,
    padding: moderateScale(2),
    marginLeft: moderateScale(4),
  },
  buttonText: {
    fontSize: fontsize.small,
    textAlign: 'center',
    color: colors.lightorange,
  },
  infobutton: {
    borderWidth: 1,
    borderColor: colors.primaryMedium,
    borderRadius: 4,
    padding: moderateScale(2),
    marginLeft: moderateScale(4),
  },
  infobuttonText: {
    fontSize: fontsize.small,
    textAlign: 'center',
    color: colors.primaryMedium,
  },
  FirstLabelContainer: {
    width: '60%',
  },
  SecondLabelContainer: {
    width: '30%',
  },
  AmountLabelContainer: {
    paddingEnd: moderateScale(60),
    textAlign: 'right',
  },
  itemLabel: {
    color: colors.Grey600,
    fontSize: fontsize.medium,
    paddingStart: moderateScale(10),
    fontWeight: 'bold',
    lineHeight: moderateScale(15),
    marginTop: 6,
  },
  itemsubLabel: {
    color: colors.gray,
    fontSize: fontsize.medium,
    paddingStart: moderateScale(5),
    marginTop: moderateScale(8),
  },

  amountLabel: {
    color: colors.Grey600,
    fontSize: fontsize.medium14,
    paddingStart: moderateScale(10),
    textAlign: 'right',
    fontWeight:"bold"
  },
  amountsubLabel: {
    color: colors.gray,
    fontSize: fontsize.medium,
    paddingStart: moderateScale(10),
    textAlign: 'right',
  },
  checkbox: {
    margin: 0,
  },
  container: {
    flex: 1,
    minHeight: moderateScale(480),
    paddingVertical: moderateScale(10),
  },
  subContainer: {
    backgroundColor: colors.white,
    // paddingHorizontal: moderateScale(10),
    flex: 1,
  },
  titleConatiner: {
    flexDirection: 'row',
    paddingBottom: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    paddingHorizontal: moderateScale(15),
  },
  title: {
    fontSize: fontsize.large,
    color: colors.black,
  },
});

export default InvoicesList;
