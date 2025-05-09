import {Sublabel} from '@components/atoms/SubLabel';
import ActionSheet from '@components/organisms/ActionSheet/ActionSheet';
import {colors, fontsize} from '../../../../themev1';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Pressable, Text, Alert, TouchableOpacity, TextInput, FlatList} from 'react-native';
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
import { setProfilePictures, setSubheaderName, setUserCredentials } from '@store/slices/userSlice';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native';

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
    dashboardState?.activeBranch,
  );
  const [selectedOrganization, setSelectedOrganisation] = useState(
    dashboardState?.activeClient, //activeClient
  );

  const [selectedBillingFirm, setSelectedBillingFirm] = useState(
    dashboardState.activeBillingFirm,
  );

  const [clientData, setClientsData] = useState(clients);

  const [billingFirmData, setBillingFirmData] = useState(billingFirm);
  const [openPicker, setOpenPicker] = useState('');
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const ORGbottomSheetRef = useRef<BottomSheetModal>(null);

  const [openSheet, setOpenSheet] = useState(false);
  const [openORGSheet, setOpenORGSheet] = useState(false);

  const dispatch = useAppDispatch();

  const billingFirmPickerRef = useRef();
  const fyYearPickerRef = useRef();
  const organisationPickerRef = useRef(null);
  const consultatantPickerRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(dashboardState?.activeBranch?.id);
  const [selectedORG, setSelectedORG] = useState(dashboardState?.activeClient?.id);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchorgQuery, setSearchOrgQuery] = useState('');

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
  // Filtered branches based on search query
  const filteredBranches = branches.filter(branch =>
    branch.branch_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const filteredUsers = clients.filter(
  //   (clients: any) => clients.branch_id === selectedConsultant,
  // );
  const filteredUsers = clients.filter(client =>
    client.branch_id === selectedConsultant.id && 
    client?.name?.toLowerCase()?.includes(searchorgQuery?.toLowerCase())
  );
  console.log(filteredUsers,'fuser');
  
  

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
    
    const req = {
      client_id: selectedOrganization.id,
      branch_id: selectedConsultant.id,
      financial_year: selectedFY,
      billingfirm_id: selectedBillingFirm,
      deviceName: deviceName,
    };
   
    await saveSubHeader(req)
      .unwrap()
      .then(data => {
        console.log("saveSubHeader- ",data.data)
        dispatch(setUserCredentials(data?.data))
        dispatch(setSubheaderName(data.data.username))
        dispatch(setProfilePictures(data?.data))

        console.log(setProfilePictures(data?.data),'+++');

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
    setSelectedConsultant(item);
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
  const openActionSheet = () => {
    setOpenSheet(true);
    bottomSheetRef.current?.present();
  };

  const closeActionSheet = () => {
    setOpenSheet(false);
    bottomSheetRef.current?.dismiss();
  };
  const openORGActionSheet = () => {
    setOpenORGSheet(true);
    ORGbottomSheetRef.current?.present();
  };

  const closeORGActionSheet = () => {
    setOpenORGSheet(false);
    ORGbottomSheetRef.current?.dismiss();
  };

  const handleSelectConsultant = (consultant: any) => {
    setSelectedConsultant(consultant);
    setSelectedOption(consultant.id); // Save the selected branch ID
    closeActionSheet();
  };
  const handleSelectOrganization = (organization: any) => {
    setSelectedOrganisation(organization);
    setSelectedORG(organization.id); // Save the selected branch ID
    closeORGActionSheet();
  };


  const onBillingFirm = (billinFirm: any) => {
    dispatch(setActiveBillingFirm(billinFirm.id));
    dispatch(setActiveBillingFirmPaymentStatus(billinFirm.razorpay_accountid));
    setSelectedBillingFirm(billinFirm.id);
    local.store(local.keys.GPANEL_BILLING_FIRM, billinFirm.id);
  };
  console.log(selectedOrganization,'sscORG');
  

  return (
    <View style={styles.container}>
        <View style={styles.sheetContainer}>
      <View>
        <CustomHeader title={'Filter Task By'}/>
      </View>
      <View style={{ width: '100%' }}>

      <Text style={{color:colors.Grey600}}> Consultant </Text>
      <TouchableOpacity onPress={openActionSheet} style={{ padding: 10, borderRadius: 5 }}>
        <Text style={{ color: colors.black, }}>
          {selectedConsultant ? <Text>{selectedConsultant.branch_name}</Text> : <Text style={{color:colors.black}}> Select Consultant </Text> }
        </Text> 
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={['50%']} // Adjust snap points for scrolling
        onDismiss={closeActionSheet}
      >
        <View style={{ padding: 15, }}>
          <View style={{alignItems:'center',flexDirection:'row',marginBottom:10,backgroundColor:colors.actionsheetheader,height:50,justifyContent:"space-between",paddingHorizontal:12}}>
            <Text style={{color:'white',}}>Consultant</Text>
         
          {/* Close Button */}
          <TouchableOpacity onPress={closeActionSheet} style={{ }}>
          <MaterialCommunityIcons
                name="close"
                size={20}
                color={colors.white}
              />
                        </TouchableOpacity>
          </View>

          {/* Search Box */}
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search Consultant..."
            placeholderTextColor={colors.Grey600}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
              fontSize: 16,
              borderColor:colors.GRey800,
              borderWidth:1,
              color:colors.GRey800
            }}
          />

<FlatList
  data={filteredBranches}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <ScrollView>
    <TouchableOpacity
      onPress={() => handleSelectConsultant(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      {/* Branch name */}
      <Text style={{ fontSize: 18, color: colors.black, flex: 1 }}>
        {item.branch_name}
      </Text>

      {/* Radio Button */}
      <RadioButton
        value={item.id}
        status={selectedOption === item.id ? 'checked' : 'unchecked'}
        onPress={() => handleSelectConsultant(item)}
        color={colors.primary} // Customize the color
      />
    </TouchableOpacity>
    </ScrollView>
  )}
  ListEmptyComponent={<Text style={{ textAlign: 'center', color: colors.black }}>No results found</Text>}
  contentContainerStyle={{ height: 300 }} // Added padding at the bottom to avoid cutoff
/>
        </View>
      </BottomSheetModal>
    </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.gray,
              marginStart: moderateScale(32),
              marginEnd: moderateScale(23),
            }}
          />
          <View style={{ width: '100%' }}>

<Text style={{color:colors.Grey600}}> Organization </Text>
<TouchableOpacity onPress={openORGActionSheet} style={{ padding: 10, borderRadius: 5 }}>
  <Text style={{ color: colors.black, }}>
    {selectedOrganization ? <Text>{selectedOrganization.name}</Text> : <Text style={{color:colors.black}}> Select organization </Text> }
  </Text> 
</TouchableOpacity>

<BottomSheetModal
  ref={ORGbottomSheetRef}
  index={0}
  snapPoints={['50%']} // Adjust snap points for scrolling
  onDismiss={closeORGActionSheet}
>
  <View style={{ padding: 15, }}>
    <View style={{alignItems:'center',flexDirection:'row',marginBottom:10,backgroundColor:colors.actionsheetheader,height:50,justifyContent:"space-between",paddingHorizontal:12}}>
      <Text style={{color:'white',}}>Organization</Text>
   
    {/* Close Button */}
    <TouchableOpacity onPress={closeORGActionSheet} style={{ }}>
    <MaterialCommunityIcons
          name="close"
          size={20}
          color={colors.white}
        />
                  </TouchableOpacity>
    </View>

    {/* Search Box */}
    <TextInput
      value={searchorgQuery}
      onChangeText={setSearchOrgQuery}
      placeholder="Search Organization..."
      placeholderTextColor={colors.Grey600}
      style={{
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
        borderColor:colors.GRey800,
        borderWidth:1,
        color:colors.GRey800
      }}
    />

<FlatList
data={filteredUsers}
keyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => (
<ScrollView>
<TouchableOpacity
onPress={() => handleSelectOrganization(item)}
style={{
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
}}
>
{/* Branch name */}
<Text style={{ fontSize: 18, color: colors.black, }}>
  {item.name}
</Text>

{/* Radio Button */}
<RadioButton
  value={item.id}
  status={selectedORG === item.id ? 'checked' : 'unchecked'}
  onPress={() => handleSelectOrganization(item)}
  color={colors.primary} // Customize the color
/>
</TouchableOpacity>
</ScrollView>
)}
ListEmptyComponent={<Text style={{ textAlign: 'center', color: colors.black }}>No results found</Text>}
contentContainerStyle={{ height: 300 }} // Added padding at the bottom to avoid cutoff
/>
  </View>
</BottomSheetModal>
</View>
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
          />

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.gray,
              marginStart: moderateScale(32),
              marginEnd: moderateScale(23),
            }}
          /> */}
          <Pressable onPress={onApplyFilterPress}>
            <Text style={styles.applyButton}>Done</Text>
          </Pressable>
        </View>
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
    flex:1
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
