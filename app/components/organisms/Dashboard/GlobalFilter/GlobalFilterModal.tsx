import {Sublabel} from '@components/atoms/SubLabel';
import ActionSheet from '@components/organisms/ActionSheet/ActionSheet';
import {colors, fontsize} from '../../../../themev1';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Pressable, Text, Alert, TouchableOpacity} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@hooks/redux_hooks';
import DropDownPickerComp from '@components/organisms/ActionSheet/DropDownPickerComp';
import DeviceInfo from 'react-native-device-info';

import {
  setActiveBranch,
  setActiveClient,
  setActiveFYears,
  setActiveBillingFirm,
  setFilterStatus,
  setActiveBillingFirmPaymentStatus,
} from '@store/slices/dashboardSlice';
import toast from '@utils/toast';
import {useSaveSubHeaderMutation} from '@api/dashboard.api';
import local from '@store/local';
import {
  DropDownDirectionType,
  DropDownPickerProps,
  RenderListItemPropsInterface,
} from 'react-native-dropdown-picker';
import { setUserCredentials } from '@store/slices/userSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IProps = {
  isVisible: boolean;
  onClose: () => void;
};

const GlobalFilterModal: React.FC<IProps> = ({isVisible, onClose}) => {
  const {clients, branches, fyears, selectedYears, billingFirm} =
    useAppSelector(state => state?.dashboard.globalPanel);

  var deviceName = '';

  DeviceInfo.getDeviceName().then(mdeviceName => {
    deviceName = mdeviceName;
  });

  const dashboardState = useAppSelector(state => state?.dashboard);

  const [saveSubHeader] = useSaveSubHeaderMutation();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedFY, setSelectedFY] = useState(dashboardState.activeFYears);

  const [selectedConsultant, setSelectedConsultant] = useState(
    dashboardState?.activeBranch?.id,
  );
  const [selectedOrganization, setSelectedOrganisation] = useState(
    dashboardState?.activeClient?.id, //activeClient
  );

  const [selectedBillingFirm, setSelectedBillingFirm] = useState(
    dashboardState.activeBillingFirm,
  );

  const [clientData, setClientsData] = useState(clients);

  const [billingFirmData, setBillingFirmData] = useState(billingFirm);
  const [openPicker, setOpenPicker] = useState('');

  const dispatch = useAppDispatch();

  const billingFirmPickerRef = useRef();
  const fyYearPickerRef = useRef();
  const organisationPickerRef = useRef(null);
  const consultatantPickerRef = useRef(null);

  const onOpen = pickername => {
    setOpenPicker(pickername);
  };

  const onClosePicker = () => {
    setOpenPicker('');
  };

  useEffect(() => {
    if (clients?.length) {
      setClientsData(filteredUsers);
      setBillingFirmData(filterBillingFirm);
    }
    dispatch(setFilterStatus(false));
  }, [
    dashboardState.activeBranch,
    dashboardState.activeClient,
    dashboardState.activeBillingFirm,
    dashboardState.activeFYears,
  ]);

  const filteredUsers = clients.filter(
    (clients: any) => clients.branch_id === selectedConsultant,
  );

  const filterBillingFirm = billingFirm.filter(
    (clients: any) => clients.branch_id === selectedConsultant,
  );

  useEffect(() => {
    setIsSheetOpen(isVisible);
  }, [isVisible]);

  const toggleBottomSheet = async () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const onApplyFilterPress = async () => {
    if (!selectedConsultant) {
      toast.failure('Please select consulatant');
      return;
    }
    if (!selectedOrganization) {
      toast.failure('Please select organization');
      return;
    }
    if (!selectedFY) {
      toast.failure('Please select financial year');
      return;
    }
    // if (!selectedBillingFirm) {
    //   toast.failure('Please select billing firm');
    //   return;
    // }
    setIsSheetOpen(false);
    onClose();
    const req = {
      client_id: selectedOrganization,
      branch_id: selectedConsultant,
      financial_year: selectedFY,
      billingfirm_id: selectedBillingFirm,
      deviceName: deviceName,
    };
   
    await saveSubHeader(req)
      .unwrap()
      .then(data => {
        dispatch(setUserCredentials(data?.data))
      })
      .finally(() => {
        dispatch(setFilterStatus(true));
        toast.success('Filter applied successfully');
        setOpenPicker('');
      })
      .catch(e => {
        console.log('saveSubHeader', e);
      });
  };

  const setConsultatnt = (item: any) => {
    setSelectedOrganisation('');
    setSelectedBillingFirm('');
    dispatch(setActiveBranch(item));
    dispatch(setActiveClient(''));
    setSelectedConsultant(item?.id);
    local.store(local.keys.GPANEL_CONSULTATNT, item);
  };

  function setClient(item: any): void {
    dispatch(setActiveClient(item));
    setSelectedOrganisation(item.id);
    local.store(local.keys.GPANEL_CLIENT, item);
  }

  const onFinancialYear = (fyear: any) => {
    dispatch(setActiveFYears(fyear.id));
    setSelectedFY(fyear.id);
    local.store(local.keys.GPANEL_FYEAR, fyear.id);
  };

  const onBillingFirm = (billinFirm: any) => {
    dispatch(setActiveBillingFirm(billinFirm.id));
    dispatch(setActiveBillingFirmPaymentStatus(billinFirm.razorpay_accountid));
    setSelectedBillingFirm(billinFirm.id);
    local.store(local.keys.GPANEL_BILLING_FIRM, billinFirm.id);
  };

  return (
    <View style={styles.container}>
      <ActionSheet onClose={() => onClose()} isVisible={isVisible}>
        <View style={styles.sheetContainer}>
          <View style={styles.titleConatiner}>
            <Sublabel
              size={'medium'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={'Filter By'}
              color={colors.Grey600}
              align={undefined}
            />
            <TouchableOpacity onPress={()=>{ onClose()}}> 
                <MaterialCommunityIcons
                name={'close'}
                color={colors.SemGreen500}
                size={20}
                style={{
                  marginRight: moderateScale(45),
                  justifyContent: 'center',
                  marginBottom: moderateScale(0),
                  color:'black'
                }}
              />
              </TouchableOpacity>
          </View>
          <DropDownPickerComp
            pickername={'consultatantPicker'}
            isOpen={openPicker === 'consultatantPicker'}
            onOpen={onOpen}
            onClose={onClosePicker}
            ref={consultatantPickerRef}
            label="Consultant" // label="Consultant" //Organization
            fieldValue="id"
            fieldLabel="branch_name"
            placeholder="Select Consultant"
            data={branches}
            value={selectedConsultant}
            onItemChange={setConsultatnt}
            containerStyle={{width: '100%'}} // Adjust width as needed
            itemTextStyle={{color: colors.black}} // Adjust text color
            arrowColor={colors.primary}
            onPickerPress={value => {
              consultatantPickerRef.current?.close();
              organisationPickerRef.current?.close();
              fyYearPickerRef.current?.close();
              billingFirmPickerRef?.current?.close();
              console.log('REFERENCEPROPERTIES', organisationPickerRef.current);
              // organisationPickerRef.current.setOpen();
              // console.log('REFERENCEPROPERTIES', organisationPickerRef.current);
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.gray,
              marginStart: moderateScale(32),
              marginEnd: moderateScale(23),
            }}
          />
          <DropDownPickerComp
            pickername={'organisationPicker'}
            isOpen={openPicker === 'organisationPicker'}
            onOpen={onOpen}
            onClose={onClosePicker}
            ref={organisationPickerRef}
            label="Organization"
            fieldValue="id"
            fieldLabel="name"
            placeholder="Select Organization"
            zIndex={8}
            data={clientData}
            value={selectedOrganization}
            onItemChange={setClient}
            containerStyle={{width: '100%'}} // Adjust width as needed
            itemTextStyle={{color: colors.black}} // Adjust text color
            arrowColor={colors.primary}
            onPickerPress={value => {}}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.gray,
              marginStart: moderateScale(32),
              marginEnd: moderateScale(23),
            }}
          />
          <DropDownPickerComp
            pickername={'fyYearPicker'}
            isOpen={openPicker === 'fyYearPicker'}
            onOpen={onOpen}
            onClose={onClosePicker}
            ref={fyYearPickerRef}
            fieldLabel="fyear"
            fieldValue="id"
            label="Financial year"
            placeholder="Select Financial Year"
            data={fyears}
            zIndex={11}
            onItemChange={onFinancialYear}
            value={selectedFY}
            containerStyle={{width: '100%'}} // Adjust width as needed
            itemTextStyle={{color: colors.black}} // Adjust text color
            arrowColor={colors.primary}
            onPickerPress={value => {}}
          />

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.gray,
              marginStart: moderateScale(32),
              marginEnd: moderateScale(23),
            }}
          />
          {/* <DropDownPickerComp
            pickername={'billingFirmPicker'}
            isOpen={openPicker === 'billingFirmPicker'}
            onOpen={onOpen}
            onClose={onClosePicker}
            ref={billingFirmPickerRef}
            label="Billing Firm"
            fieldValue="id"
            fieldLabel="firm_name"
            placeholder="Billing Firm"
            data={billingFirmData}
            value={selectedBillingFirm}
            onItemChange={onBillingFirm}
            containerStyle={{width: '100%'}} // Adjust width as needed
            itemTextStyle={{color: colors.black}} // Adjust text color
            arrowColor={colors.primary}
            onPickerPress={value => {
              console.log('fyYearPickerRef.current', fyYearPickerRef);
              consultatantPickerRef.current?.close();
              organisationPickerRef.current?.close();
              fyYearPickerRef.current?.close();
            }}
          /> */}

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.gray,
              marginStart: moderateScale(32),
              marginEnd: moderateScale(23),
            }}
          />
          <Pressable onPress={onApplyFilterPress}>
            <Text style={styles.applyButton}>Done</Text>
          </Pressable>
        </View>
      </ActionSheet>
    </View>
  );
};

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
    //  padding: moderateScale(10),
    backgroundColor: colors.white,
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
    marginTop: moderateScale(18),
  },
  sheetContent: {
    paddingHorizontal: moderateScale(15),
  },
});

export default React.memo(GlobalFilterModal);
