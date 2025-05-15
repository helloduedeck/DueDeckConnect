import CustomHeaderW from "@components/organisms/Headers/CustomHeaderW";
import { colors } from "../../../themev1";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Keyboard, Modal, Pressable, RefreshControl, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Card from '@components/atoms/Card/Card';
import { moderateScale } from "react-native-size-matters";
import { Sublabel } from "@components/atoms/SubLabel";
import fontsize from "../../../themev1/fontstyle";
import Text from "@components/text/Text";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Taskrequestcard from "@components/atoms/Card/Taskrequestcard";
import { toast } from "@utils";
import { useGetTaskRequestMutation, useUpdateTaskRequestMutation } from "@api/services";
import { useAppSelector } from "@hooks/redux_hooks";
import ActionSheet from "@components/organisms/ActionSheet/ActionSheet";
import { Label } from "@components/atoms/Label";
import Button from "@components/atoms/button/Button";
import Content from "@components/content/Content";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EmptyOther from "@components/molecules/empty/EmptyOther";

type IProps = {
    item: any;
    viewableItems: any;
    date: any;
};

const TaskRequests: React.FC<IProps> = ({
    item,
    viewableItems,
    date,
}) => {


    useEffect(() => {
        Getalltaskrequests()
        console.log('useffect running');

    }, []);
    //   const dashboardState = useAppSelector(state => state?.dashboard);

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const dashboardState = useAppSelector(state => state?.dashboard);
    const clientId = dashboardState?.activeClient?.id

    const navigation = useNavigation();


    const [popoverVisible, setPopoverVisible] = useState<string | null>(null); // Store id of card with visible popover
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [taskrequestdata, SetTaskrequestdata] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    const [characterCount, setCharacterCount] = useState(0);

    const [serviceNotes, setServiceNotes] = useState('');
    const [requestId, setRequestId] = useState('');


    const handleDelete = () => {
        // Handle the delete logic
        setDeleteModalVisible(false);
    };
    const [getTaskRequests] = useGetTaskRequestMutation();
    const [updateNewTaskRequests] = useUpdateTaskRequestMutation();
    const inputRef = useRef<TextInput>(null);


    const handleEdit = () => {
        // Open the edit modal to change the service name
        setEditModalVisible(true);
    };
    const closeEditModal = () => setEditModalVisible(false);
    const CloseActionsheet = () => {
        setIsSheetOpen(false)
        Keyboard.dismiss()
    }

    const GetUpdateTaskRequests = async () => {
        setModalVisible(true); // Show the modal when the button is pressed
        if (!serviceNotes || serviceNotes.trim().length === 0) {
            Alert.alert('Please fill the required Task Request field!!');
            return; // Exit early if validation fails
        }

        const reqData: any = {
            client_id: clientId,
            task_note: serviceNotes,  // Use the updated serviceNotes
            id: requestId,    // Pass the requestId
        };

        await updateNewTaskRequests(reqData)

            .unwrap()
            .then(data => {
                console.log(data.success, data?.message, 'updataaaaaaa');

                if (data?.success) {
                    SetTaskrequestdata(prevData => {
                        // Find the updated task and replace it in the state
                        return prevData.map((task: any) =>
                            task.id === requestId ? { ...task, task_note: serviceNotes } : task
                        );
                    });
                    toast.success(data?.message);
                } else {
                    toast.failure(data?.message ?? 'Please Enter Mandatory Fields!!!');
                }
            })
            .finally(() => {
                setIsSheetOpen(false)
                // Optionally handle any cleanup
            })
        //   .catch(e => {
        //     // toast.failure('Please Enter Mandatory Fields!!!');
        //   });
    };


    const Getalltaskrequests = async () => {
        setIsLoading(true)

        const reqData: any = {
            client_id: clientId,
        };


        await getTaskRequests(reqData)
            .unwrap()
            .then(data => {

                if (data?.success) {
                    SetTaskrequestdata(data.data)
                } else {
                    toast.failure(data?.message ?? 'Something went wrong!!!');
                }
            })
            .finally(() => {
                setIsLoading(false)

            })
            .catch(e => {
                toast.failure('Please Enter Manadatory Fields!!!');
            });
    };

    const Popover = ({ onClose }: any) => {
        return (
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.popoverContainer}>
                    {
                        <View style={{ flexDirection: 'row', marginBottom: moderateScale(0), alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => { closePopover(), handleEdit() }}>
                                <Sublabel size={'exsmall'} fontWeight={'semibold'} fontStyle={'normal'} title={'Edit'} color={colors.GRey800} />
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => { closePopover(), setDeleteModalVisible(true) }}>
                                <Sublabel size={'exsmall'} fontWeight={'semibold'} fontStyle={'normal'} title={'Delete'} color={colors.GRey800} />
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </TouchableWithoutFeedback>
        );
    };

    // Function to toggle popover visibility
    const togglePopover = (id: any, task_note: any) => {
        setIsSheetOpen(true)
        setCharacterCount(task_note.length)
        setServiceNotes(task_note)
        setRequestId(id)

        // setPopoverVisible(popoverVisible === id ? null : id); // Toggle visibility based on id
    };

    // Function to close popover
    const closePopover = () => {
        setPopoverVisible(null); // Close popover
    };

    const { width } = Dimensions.get('window');
    const listData = taskrequestdata;

    //     [
    //     { id: '1', service_name: 'I want to register my company as LLP', act_name: 'Act 1', status: 'Pending', fyear: '2023', date: 'March 17th, 2024', time: '07: 14 AM' },
    //    ];
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Complete Received':
            case 'Accept':
                return colors.green;
            case 'Cancelled':
                return colors.graish;
            case 'Assigned':
            case 'Pending':
                return colors.orange;
            case 'WIP':
                return colors.semblue;
            case 'Reject':
                return colors.darkred;
            default:
                return colors.primary;
        }
    };
    const getStatusBGColor = (status: string) => {
        switch (status) {
            case 'Complete Received':
            case 'Accept':
                return `${colors.SemGreen500}15`;
            case 'Cancelled':
                return colors.graish;
            case 'Assigned':
            case 'Pending':
                return `${colors.orange}15`;
            case 'WIP':
                return colors.semblue;
            case 'Reject':
                return `${colors.darkred}15`;
            default:
                return colors.primary;
        }
    };

    const getIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'clock';
            case 'Reject':
                return 'close-circle';
            case 'Accept':
                return 'check-all';
            default:
                return '';
        }
    };

    const getHeaderText = (heading: string, length: number) => {
        try {
            return heading.length < length
                ? `${heading}`
                : `${heading.substring(0, length)}..`;
        } catch (error) {
            return '';
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
            <Taskrequestcard
                viewableItems={viewableItems}
                item={item}
                onPress={() => {
                    // navigation.navigate('SERVICEDETAILS', {
                    //   id: item.id,
                    // });
                }}
                onCancel={closePopover}>

                <TouchableOpacity onPress={() => { }}>
                    <Text isSemiBold style={{ fontSize: fontsize.medium, fontWeight: '700', }}>
                        {getHeaderText(item.task_note, 30)}
                    </Text>
                </TouchableOpacity>
                <View style={{ position: 'absolute', right: moderateScale(10), top: moderateScale(10) }}>
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        color={colors.Grey600}
                        size={15}
                        onPress={() => togglePopover(item.id, item.task_note)} // Pass item id to toggle popover
                    />
                </View>

                {/* Popover only visible for the current item */}
                {popoverVisible == item.id && <Popover onClose={closePopover} />}

                <View>
                    <View style={{
                        flexDirection: 'row', position: 'absolute',
                        bottom: moderateScale(2),
                    }}>
                        <View style={{ flexDirection: 'row', marginTop: moderateScale(10), alignItems: 'center', }}>
                            <MaterialCommunityIcons
                                name={'calendar-blank-outline'}
                                color={colors.Grey600}
                                size={12}
                            />
                            <Text
                                style={{
                                    marginLeft: moderateScale(8),
                                    fontWeight: '500',
                                    fontSize: fontsize.small,
                                }}>
                                {item.createddate}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: moderateScale(10),
                            marginLeft: moderateScale(10),
                            alignItems: 'center',
                        }}>
                            <MaterialCommunityIcons
                                name={'clock-outline'}
                                color={colors.Grey600}
                                size={12}
                            />
                            <Text
                                style={{
                                    marginLeft: moderateScale(8),
                                    fontWeight: '500',
                                    fontSize: fontsize.small,
                                }}>
                                {item.createdtime}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: moderateScale(13) }}>
                        <Text
                            style={{
                                marginLeft: 0,
                                fontWeight: '500',
                                fontSize: fontsize.medium,
                                marginTop: moderateScale(10),
                            }} />
                        <Text
                            style={{
                                color: colors.hexgray,
                                marginLeft: moderateScale(4),
                                fontWeight: 'normal',
                                fontSize: fontsize.medium,
                                marginTop: moderateScale(10),
                            }} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: moderateScale(-7),
                        right: 0,
                    }}>
                        <Text
                            style={{
                                marginLeft: moderateScale(2),
                                fontWeight: '600',
                                fontSize: fontsize.medium10,
                                color: colors.Grey600,
                                marginTop: moderateScale(23),
                            }} />
                        <View >
                            <View style={{
                                position: 'absolute',
                                right: 0,
                                top: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    backgroundColor: getStatusBGColor(item.status),
                                    paddingStart: moderateScale(5),
                                    paddingEnd: moderateScale(6),
                                    paddingVertical: moderateScale(2),
                                    borderRadius: 3,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name={getIcon(item.status)} style={{
                                        marginRight: 0, borderRadius: item.status == 'Accept' ? moderateScale(40) : 0,
                                        backgroundColor: item.status == 'Accept' ? colors.SemGreen500 : null,
                                        paddingHorizontal: item.status == 'Accept' ? moderateScale(3) : 0,
                                        paddingVertical: item.status == 'Accept' ? moderateScale(2.8) : 0,
                                    }}
                                        color={item.status == 'Accept' ? colors.white : getStatusColor(item.status)} size={item.status == 'Accept' ? 5 : 13} />
                                    <View style={{ marginLeft: moderateScale(4) }}>
                                        <Sublabel
                                            size={'exsmall'}
                                            fontWeight={'semibold'}
                                            title={item.status + ''}
                                            color={getStatusColor(item.status)}
                                            align={undefined}
                                            fontStyle={'normal'}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Taskrequestcard>
        );
    }



    return (
        <TouchableWithoutFeedback onPress={() => { setPopoverVisible(null) }}>
            <Content isLoading={isLoading}>
                <View>
                    <View style={{ backgroundColor: colors.primary, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomHeaderW title={'Task Requests'} />
                    </View>
                    <View style={{ marginTop: moderateScale(20), marginBottom: moderateScale(120) }}>
                        <FlatList
                            data={listData}
                            onViewableItemsChanged={viewableItems}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ListEmptyComponent={<View style={{ marginTop: moderateScale(100) }}><EmptyOther navigation={undefined} /></View>}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={Getalltaskrequests} />
                            } />
                        {/* Delete Confirmation Modal */}
                        {isDeleteModalVisible && (
                            <Modal transparent={true} animationType="fade" visible={isDeleteModalVisible}>
                                <TouchableWithoutFeedback onPress={() => setDeleteModalVisible(false)}>
                                    <View style={styles.modalBackdrop}>
                                        <View style={styles.modalContainer}>
                                            <Sublabel size={'small'} title="Are you sure you want to delete this task?" color={colors.GRey800} fontWeight={"bold"} fontStyle={"normal"} />
                                            <View style={styles.modalButtons}>
                                                <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
                                                    <Sublabel size={'exsmall'} title="Cancel" color={colors.primary} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={handleDelete}>
                                                    <Sublabel size={'exsmall'} title="Confirm" color={colors.primary} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        )}

                        {/* Edit Modal */}

                        <ActionSheet
                            // disableableClosePressingBackDrop={true}
                            onClose={() => {
                                CloseActionsheet()
                            }}
                            isVisible={isSheetOpen}>
                            <View>
                                {/* view of New Service*/}
                                {(
                                    <View>
                                        <View
                                            style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Label
                                                size={'medium'}
                                                fontWeight={'semibold'}
                                                title={'Update Task Request'}
                                                color={colors.GRey800}
                                                align={undefined}
                                            />
                                            <Label
                                                size={'small'}
                                                fontWeight={'semibold'}
                                                title={'From ' + dashboardState.activeBranch?.branch_name}
                                                color={colors.Grey600}
                                                align={undefined}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                marginHorizontal: moderateScale(23),
                                                marginVertical: moderateScale(30),
                                            }}>
                                            <Sublabel
                                                size={'small'}
                                                fontWeight={'bold'}
                                                fontStyle={'normal'}
                                                title={'Service You Are Looking For'}
                                                color={colors.GRey800}
                                                align={undefined}
                                            />
                                            <TextInput
                                                ref={inputRef}
                                                placeholder="Type"
                                                placeholderTextColor={colors.Grey600}
                                                maxLength={250}
                                                value={serviceNotes}
                                                onChangeText={(value) => {
                                                    setServiceNotes(value), setCharacterCount(value.length);
                                                }}
                                                style={{ color: colors.GRey800 }}
                                            //   onSubmitEditing={()=>{setIsSheetOpen(false)}}
                                            //   onBlur={()=>{setIsSheetOpen(false)}}
                                            />
                                            <View
                                                style={{
                                                    borderWidth: 0.3,
                                                    borderColor: colors.Grey600,
                                                }}
                                            />
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    right: moderateScale(10),
                                                    bottom: moderateScale(95),
                                                }}>
                                                <Sublabel
                                                    size={'small'}
                                                    fontWeight={'bold'}
                                                    fontStyle={'normal'}
                                                    title={`${characterCount}/250`}
                                                    color={colors.GRey800}
                                                    align={undefined}
                                                />
                                            </View>

                                            <View>
                                                <Button
                                                isMedium
                                                    label={'Update Request'}
                                                    onPress={() => {
                                                        GetUpdateTaskRequests()
                                                        //   onNewService();
                                                    }}
                                                    containerStyle={{
                                                        height: moderateScale(36),
                                                        marginVertical: moderateScale(30),
                                                        backgroundColor: colors.primary,
                                                        borderColor: colors.date,
                                                    }}
                                                    labelStyle={{
                                                        color: colors.white,
                                                        fontWeight: 'semibold',
                                                         fontSize: fontsize.medium,
                                                    }}
                                                />
                                            </View>

                                            <View style={{ marginTop: -20 }}>
                                                <Button
                                                    label={'Cancel'}
                                                    onPress={() => {
                                                        inputRef.current?.blur(); // force blur first
                                                        setTimeout(() => {
                                                            CloseActionsheet();     // close after blur to allow ActionSheet to collapse
                                                        }, 100);
                                                    }}
                                                    containerStyle={{
                                                        height: moderateScale(36),
                                                        marginVertical: moderateScale(0),
                                                        backgroundColor: colors.Buttongrey,
                                                        borderColor: colors.date,
                                                    }}
                                                    labelStyle={{
                                                        color: colors.Grey600,
                                                        fontWeight: 'semibold',
                                                        fontSize: fontsize.medium,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ActionSheet>

                    </View>

                </View>
            </Content>
        </TouchableWithoutFeedback >

    );
};

const styles = StyleSheet.create({
    popoverContainer: {
        position: 'absolute',
        top: moderateScale(2),
        right: moderateScale(26),
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(2),
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: moderateScale(20),
        width: 300,
        alignItems: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: moderateScale(10),
    },
});

export default TaskRequests;
