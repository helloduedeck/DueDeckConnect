import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ViewToken,
} from 'react-native';
import {colors} from '../../../themev1';
import {moderateScale, ms} from 'react-native-size-matters';
import {FAB} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {Label} from '../../../components/atoms/Label';
import {Sublabel} from '../../../components/atoms/SubLabel';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import DetailContent from '@components/templates/Details/DetailContent';
import DocumentUpload from '@components/organisms/Document/DocumentUpload';
import {FlatList} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import moment from 'moment';
import {
  useAddDocumentNameMutation,
  useRemoveDocumentMutation,
  useUploadDocumentMutation,
} from '@api/documents';
import {toast} from '@utils';
import Carousel from 'react-native-snap-carousel';
// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const getTrailText = (heading: string, length: number) => {
  try {
    return heading.length < length
      ? `${heading}`
      : `${heading.substring(0, length)}..`;
  } catch (error) {
    return '';
  }
};
const DocumentUploadPanel = ({route, navigation}: any) => {
  const {serviceData, documentsData, taskId, onDataBack} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [documentName, setDocumentName] = useState<string>('');
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [carouselList, setCarouselList] = useState([]);
  const [dataSource, setDataSource] = useState(documentsData);
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const [caroselIndex, setCaroselActiveIndex] = useState(0);
  const [singleFile, setSingleFile] = useState({});
  const {top} = useSafeAreaInsets();
  const [addDocumentName] = useAddDocumentNameMutation();
  const [uploadDocument] = useUploadDocumentMutation();
  const [removeDocument] = useRemoveDocumentMutation();

  const onAddDocuments = async () => {
    setModalVisible(false);
    setDocumentName('');
    const reqData: any = {
      document_name: documentName,
      task_id: taskId,
    };
    await addDocumentName(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          setDataSource(data?.data);
          toast.success(data.message);
          onDataBack && onDataBack(data?.data); //COMMENTED AS CAN NOT ABLE TO TEST API IS NOT WORKING ,NEED TO TEST BEFORE UNCOMMENT-2/5/24
        } else {
          toast.failure(data.message);
        }
      })
      .finally(() => {
        // setIsLoading(false);
      })
      .catch(e => {
        console.log('getServiceDetails ', e);
      });
  };
  //false comment
  const selectFileToUpload = async (
    documentNameId: string,
    taskId: string | number,
  ) => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pickSingle({
        // Provide which type of file you want user to pick
        type: [
          // There can me more options as well
          // DocumentPicker.types.allFiles
          DocumentPicker.types.images,
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
        ],
      });
      // Printing the log realted to the file
      console.log('res-ppppp : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      uploadFiles(documentNameId, taskId, res);

      setSingleFile(res);
    } catch (err) {
      console.log('res-err : ' + JSON.stringify(err));
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        // alert('Canceled');
      } else {
        // For Unknown Error
        //alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
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
  const getGStatusColor = (gStatus: string) => {
    switch (gStatus) {
      case 'Overdue':
        return colors.semorange;
      case 'Due':
        return colors.primary;
      case 'Upcoming':
        return colors.SemGreen500;
      default:
        return colors.primary;
    }
  };

  const uploadFiles = async (
    documentNameId: string,
    taskId: string | number,
    file: {},
  ) => {
    console.log('FILE IS UPLOADING', file);
    // Check if any file is selected or not
    if(file?.size > 2000000){
      return toast.failure('File size should be less than 2 Mb');
    }
    if (file != null) {
      // If file selected then create FormData
      const fileToUpload = file;
      console.log('fileToUpload ', fileToUpload);
      const formdata = new FormData();

      formdata.append('document_name_id', documentNameId);
      formdata.append('task_id', taskId);
      formdata.append('attachment', file);
      console.log('FormData', formdata);
      // Please change file upload URL
      await uploadDocument(formdata)
        .unwrap()
        .then(response => {
          if (response?.success) {
            setDataSource(response?.data);
            toast.success(response.message);
          } else {
            toast.failure(response.message);
          }
        })
        .finally(() => {
          // setIsLoading(false);
        })
        .catch(e => {
          console.log('uploadFiles ', e);
        });
    }
  };

  const onDocDeleteConfirmation = (documentId: number) => {
    Alert.alert(
      'Delete',
      'Are you sure want to delete document?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onDeleteDocument(documentId);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const onDeleteDocument = async (documentId: number) => {
    const reqData: any = {
      doc_id: documentId,
    };
    await removeDocument(reqData)
      .unwrap()
      .then(data => {
        if (data?.success) {
          setDataSource(data?.data);
          toast.success(data.message);
          setIsCarouselVisible(false);
        } else {
          toast.failure(data.message);
        }
      })
      .finally(() => {
        // setIsLoading(false);
      })
      .catch(e => {
        console.log('removeDocument ', e);
      });
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  const formatDate = (inputDate: string) => {
    const convertedDate = moment(inputDate, 'YYYY-MM-DD  HH:mm').format(
      'MMM Do, YYYY',
    );
    return convertedDate;
  };

  const renderDocuments = ({item}: any) => {
    return (
      <View
        style={{marginBottom: 5}}
        // onPress={() => {
        //   if (item.attachments?.length) {
        //     setIsCarouselVisible(true);
        //     setCarouselList(item.attachments);
        //   }
        // }}
        // disabled={true}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingRight: 5,
          }}>
          <DocumentUpload
            attachments={item.attachments && item.attachments[0]}
            DocSubabelcount={{
              size: 'small',
              fontWeight: 'normal',
              fontStyle: 'normal',
              title: item.attachments?.length === 0 ? '' : item.attachments?.length,
              color: colors.primary,
            }}
            Doclabelprop={{
              size: 'small',
              fontWeight: 'bold',
              title: getTrailText(item.document_name, 15),
              color: colors.GRey800,
              align: {undefined},
            }}
            DocSublabelprop={{
              size: 'exsmall',
              fontWeight: 'bold',
              fontStyle: 'normal',
              title: 'Updated:',
              color: undefined,
              align: undefined,
            }}
            DocSublabelprop1={{
              size: 'exsmall',
              fontWeight: 'bold',
              fontStyle: 'normal',
              title: formatDate(item.updated_at),
              color: undefined,
              align: undefined,
            }}
            onDocUpload={function (): void {
              selectFileToUpload(item.id, item.task_id);
            }}
            onImagePress={() => {
              if (item.attachments?.length) {
                setIsCarouselVisible(true);
                setCarouselList(item.attachments);
              }
            }}
          />
        </View>
      </View>
    );
  };

  const keyExtractor = (item: any) => item.id;

  const caroselRef = useRef(null);
  return (
    <View style={{backgroundColor: colors.Dashboard, flex: 1}}>
      <CustomHeader title={'Documents'} />
      <View
        style={{
          paddingHorizontal: moderateScale(28),
          alignItems: 'center',
        }}>
        <View>
          <DetailContent
            LabelPropsType={{
              size: 'medium',
              fontWeight: 'semibold',
              title:getHeaderText( serviceData.service_name,30),
              color: colors.GRey800,
              align: {undefined},
            }}
            LabelPropsType1={{
              size: 'small',
              fontWeight: 'semibold',
              title: 'ACT :  ',
              color: colors.GRey800,
              align: {undefined},
            }}
            LabelPropsType2={{
              size: 'small',
              fontWeight: 'normal',
              title: getHeaderText(serviceData?.act_name,30),
              color: colors.GRey800,
              align: {undefined},
            }}
            LabelPropsType3={{
              size: 'small',
              fontWeight: 'normal',
              title: serviceData?.due_date, //'Mar 3, 2024'
              color: colors.GRey800,
              align: {undefined},
            }}
            SubLabelPropsType={{
              size: 'exsmall',
              fontWeight: 'bold',
              fontStyle: 'italic',
              title: serviceData?.g_status,
              color: getGStatusColor(serviceData?.g_status),
              align: undefined,
            }}
            clientName={getHeaderText(serviceData.client_name,30)}
          />
        </View>

        <View style={{paddingBottom: 150, height: '85%'}}>
          <FlatList
            style={{height: '100%'}}
            data={dataSource}
            onViewableItemsChanged={viewableItem}
            numColumns={2}
            ListEmptyComponent={<EmptyOther navigation={undefined} />}
            keyExtractor={keyExtractor}
            renderItem={renderDocuments}
            extraData={dataSource}
          />
        </View>

        <Modal
          visible={isCarouselVisible}
          onRequestClose={() => {
            setIsCarouselVisible(false);
          }}>
          <SafeAreaView style={{flex: 1}}>
            <AntDesign
              name={'closecircle'}
              size={ms(30)}
              style={{
                position: 'absolute',
                right: 20,
                top: Platform.OS === 'android' ? 10 : top + 70,
                zIndex: 999,
              }}
              onPress={() => {
                setIsCarouselVisible(false);
                setCarouselList([]);
              }}
            />

            <Carousel
              ref={caroselRef}
              data={carouselList}
              renderItem={({item, index}) => {
                console.log("Carousel",item?.path.includes(".pdf"))
                return (
                <ImageBackground
                  source={{uri: item?.path}}
                  resizeMode={'cover'}
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name={'delete'}
                    size={ms(20)}
                    style={{
                      position: 'absolute',
                      right: 25,
                      top: Platform.OS === 'android' ? 70 : top + 130,
                      zIndex: 999,
                    }}
                    onPress={() => {
                      onDocDeleteConfirmation(item?.id);
                    }}
                    color={colors.orange}
                  />
                  <Text
                    style={{
                      color: 'white',
                      marginBottom: ms(30),
                      fontSize: ms(14),
                      backgroundColor: 'grey',
                      padding: ms(8),
                      borderRadius: ms(6),
                    }}>
                    {index + 1} / {carouselList?.length}
                  </Text>
                </ImageBackground>
              )}
            }
              onSnapToItem={index => {
                setCaroselActiveIndex(index);
              }}
              sliderWidth={width}
              itemWidth={width}
              itemHeight={height * 0.56}
              sliderHeight={height}
              containerCustomStyle={{backgroundColor: 'black'}}
            />
          </SafeAreaView>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: 283,
              height: 135,
              backgroundColor: 'white',
              borderRadius: 4,
              // alignItems: "center",
              padding: moderateScale(24),
              // justifyContent: "center",
            }}>
            <View>
              <Label
                size={'small'}
                fontWeight={'semibold'}
                title={'Add New Document'}
                color={colors.GRey800}
              />
            </View>
            <TextInput
              value={documentName}
              placeholder="Type document name..."
              placeholderTextColor="#888888"
              underlineColorAndroid={colors.primary}
              maxLength={40}
              onChangeText={newText => setDocumentName(newText)}
              // style={styles.input}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{
                  paddingVertical: moderateScale(10),
                  paddingHorizontal: moderateScale(30),
                }}
                onPress={() => setModalVisible(false)}>
                <Sublabel
                  size={'small'}
                  fontWeight={'semibold'}
                  fontStyle={'normal'}
                  title={'Cancel'}
                  color={colors.Grey600}
                  align={undefined}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: moderateScale(10),
                  paddingHorizontal: moderateScale(40),
                }}
                onPress={() => onAddDocuments()}>
                <Sublabel
                  size={'small'}
                  fontWeight={'semibold'}
                  fontStyle={'normal'}
                  title={'Add'}
                  color={colors.primary}
                  align={undefined}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.primary,
          borderRadius: 60,
        }}
        icon="plus"
        color="white"
        size="medium"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};
export default DocumentUploadPanel;
