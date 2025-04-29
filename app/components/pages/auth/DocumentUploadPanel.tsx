import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewToken,
} from 'react-native';
import {colors} from '../../../themev1';
import {moderateScale, ms, ScaledSheet} from 'react-native-size-matters';
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
import { VELOCITY_EPS } from 'react-native-reanimated/lib/typescript/reanimated2/animation/decay/utils';
import fontsize from '../../../themev1/fontstyle';
import Svg, { Path } from 'react-native-svg';

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
  const [selecteddocstatus, setDocumentStatus] = useState(serviceData.dstatus_id);

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


  const Viewpdfurl = (url: any) => {
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  }
  const PdfIcon = ({ size = 100, color = colors.darkred }) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        fill={color}
      >
        <Path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
      </Svg>
    );
  };

  const ExcelIcon = () => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={100} height={100} fill={colors.SemGreen500}>
        <Path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z" />
      </Svg>
    );
  };
  const PencilIcon = () => {
    return (
      <View>
        <Svg width="15" height="15" viewBox="0 0 10 10" fill="none">
          <Path
            d="M7.0835 1.25045C7.19293 1.14102 7.32285 1.05421 7.46583 0.994982C7.60882 0.935756 7.76207 0.905273 7.91683 0.905273C8.07159 0.905273 8.22484 0.935756 8.36783 0.994982C8.51081 1.05421 8.64073 1.14102 8.75016 1.25045C8.8596 1.35989 8.94641 1.4898 9.00563 1.63279C9.06486 1.77577 9.09534 1.92902 9.09534 2.08378C9.09534 2.23855 9.06486 2.3918 9.00563 2.53478C8.94641 2.67777 8.8596 2.80768 8.75016 2.91712L3.12516 8.54212L0.833496 9.16712L1.4585 6.87545L7.0835 1.25045Z"
            stroke="#252527"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    );
  };


  const WordIcon = ({ width = 200, height = 200, color = colors.semblue }) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512" // Ensures proper scaling
        width={width}
        height={height}
      >
        <Path
          d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM111 257.1l26.8 89.2 31.6-90.3c3.4-9.6 12.5-16.1 22.7-16.1s19.3 6.4 22.7 16.1l31.6 90.3L273 257.1c3.8-12.7 17.2-19.9 29.9-16.1s19.9 17.2 16.1 29.9l-48 160c-3 10-12 16.9-22.4 17.1s-19.8-6.2-23.2-16.1L192 336.6l-33.3 95.3c-3.4 9.8-12.8 16.3-23.2 16.1s-19.5-7.1-22.4-17.1l-48-160c-3.8-12.7 3.4-26.1 16.1-29.9s26.1 3.4 29.9 16.1z"
          fill={color} // Accepts dynamic color
        />
      </Svg>
    );
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
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value is 0
   
   useEffect(() => {
    const fadeInOut = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fully visible
          duration: 1000, // Duration for fade-in
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // Fully invisible
          duration: 1000, // Duration for fade-out
          useNativeDriver: true,
        }),
      ])
    );

    fadeInOut.start();

    return () => fadeInOut.stop(); // Cleanup on unmount
  }, [fadeAnim]);

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
              title: 'Updated : ',
              color: colors.Grey600,
              align: undefined,
            }}
            DocSublabelprop1={{
              size: 'exsmall',
              fontWeight: 'bold',
              fontStyle: 'normal',
              title: formatDate(item.updated_at),
              color: colors.GRey800,
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
              title:getHeaderText( serviceData.service_name,25),
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
              title: getHeaderText(serviceData?.act_name,25),
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
            clientName={getHeaderText(serviceData.client_name,25)}
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
                // console.log("Carousel",item?.path.includes(".pdf"))
                const extension = item?.path.split('.').pop()?.toLowerCase();
                const isPdfDoc = ['pdf', 'doc', 'docs'].includes(extension);
                const isExcel = ['xls', 'xlsx', 'xlsm', 'xlsb'].includes(extension);
                const isWord = ['doc', 'docx'].includes(extension);
                return (
                  <View style={{ flex: 1, backgroundColor: 'white' }}>
                      {isPdfDoc ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                          {selecteddocstatus != 3 && <AntDesign
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
                          />}
                          <TouchableOpacity onPress={() => Viewpdfurl(item.path)}>
                            <View style={styles.icon}>
                              <PdfIcon width={50} height={50} />
                            </View>
                            <Animated.Text style={[styles.pdftext, { opacity: fadeAnim }]}>
                              Click Here To Open File
                            </Animated.Text>
                          </TouchableOpacity>

                          <Text
                            style={{
                              color: 'white',
                              position: 'absolute',
                              bottom: moderateScale(30),
                              fontSize: ms(14),
                              backgroundColor: 'grey',
                              padding: ms(8),
                              borderRadius: ms(6),
                            }}>
                            {index + 1} / {carouselList?.length}
                          </Text>
                        </View>
                      ) : isExcel ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                          {selecteddocstatus != 3 && <AntDesign
                            name={'delete'}
                            size={ms(20)}
                            style={{
                              position: 'absolute',
                              right: 25,
                              top: Platform.OS === 'android' ? 70 : top + 130,
                              zIndex: 999,
                            }}
                            onPress={() => {
                              console.log(index, 'deleted index');
                              onDocDeleteConfirmation(item?.id);
                            }}
                            color={colors.orange}
                          />}
                          <TouchableOpacity onPress={() => Viewpdfurl(item.path)}>
                            <View style={styles.icon}>
                              <ExcelIcon width={50} height={50} />
                            </View>
                            <Animated.Text style={[styles.exceltext, { opacity: fadeAnim }]}>
                              Click Here To Open File
                            </Animated.Text>
                          </TouchableOpacity>
                          <Text
                            style={{
                              color: 'white',
                              position: 'absolute',
                              bottom: moderateScale(30),
                              fontSize: ms(14),
                              backgroundColor: 'grey',
                              padding: ms(8),
                              borderRadius: ms(6),
                            }}>
                            {index + 1} / {carouselList?.length}
                          </Text>
                        </View>
                      ) : isWord ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                          {selecteddocstatus != 3 && <AntDesign
                            name={'delete'}
                            size={ms(20)}
                            style={{
                              position: 'absolute',
                              right: 25,
                              top: Platform.OS === 'android' ? 70 : top + 130,
                              zIndex: 999,
                            }}
                            onPress={() => {
                              console.log(index, 'deleted index');
                              onDocDeleteConfirmation(item?.id);
                            }}
                            color={colors.orange}
                          />}
                          <TouchableOpacity onPress={() => Viewpdfurl(item.path)}>
                            <View style={styles.icon}>
                              <WordIcon width={80} height={100} />
                            </View>
                            <Animated.Text style={[styles.wordtext, { opacity: fadeAnim }]}>
                              Click Here To Open File
                            </Animated.Text>
                          </TouchableOpacity>
                          <Text
                            style={{
                              color: 'white',
                              position: 'absolute',
                              bottom: moderateScale(30),
                              fontSize: ms(14),
                              backgroundColor: 'grey',
                              padding: ms(8),
                              borderRadius: ms(6),
                            }}>
                            {index + 1} / {carouselList?.length}
                          </Text>
                        </View>
                      ) : (
                        <ImageBackground
                          source={{ uri: item?.path }}
                          resizeMode={'contain'}
                          style={{
                            backgroundColor: 'white',
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}>
                          {selecteddocstatus != 3 && <AntDesign
                            name={'delete'}
                            size={ms(20)}
                            style={{
                              position: 'absolute',
                              right: 25,
                              top: Platform.OS === 'android' ? 70 : top + 130,
                              zIndex: 999,
                            }}
                            onPress={() => {
                              console.log(index, 'deleted index');
                              onDocDeleteConfirmation(item?.id);
                            }}
                            color={colors.orange}
                          />}
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
                  </View>
                // <ImageBackground
                //   source={{uri: item?.path}}
                //   resizeMode={'cover'}
                //   style={{
                //     flex: 1,
                //     justifyContent: 'flex-end',
                //     alignItems: 'center',
                //   }}>
                //   <AntDesign
                //     name={'delete'}
                //     size={ms(20)}
                //     style={{
                //       position: 'absolute',
                //       right: 25,
                //       top: Platform.OS === 'android' ? 70 : top + 130,
                //       zIndex: 999,
                //     }}
                //     onPress={() => {
                //       onDocDeleteConfirmation(item?.id);
                //     }}
                //     color={colors.orange}
                //   />
                //   <Text
                //     style={{
                //       color: 'white',
                //       marginBottom: ms(30),
                //       fontSize: ms(14),
                //       backgroundColor: 'grey',
                //       padding: ms(8),
                //       borderRadius: ms(6),
                //     }}>
                //     {index + 1} / {carouselList?.length}
                //   </Text>
                // </ImageBackground>
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
              style={{color:colors.GRey800}}
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
const styles = ScaledSheet.create({
  doclabel: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(9),
    height: moderateScale(50),
    width: moderateScale(319),
    flexDirection: 'row',
    // justifyContent:'space-between',
    borderRadius: 4,
    marginBottom: moderateScale(8)
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity and color as needed
    zIndex: 1,
    borderRadius: 4,
  },
  popover: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginLeft: 60,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  option: {
    paddingVertical: 10,
  },
  popoverContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    top: 170,
    left: 70,
    zIndex: 2,
    width: 142
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center'
  },
  optionText: {
    fontSize: fontsize.medium,
    fontWeight: '700'
  },
  documentstatus: {
    width: moderateScale(289),
    height: moderateScale(50),
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(5),
    marginTop: moderateScale(8),
    backgroundColor: colors.white,
    borderRadius: 4,
    justifyContent: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    backgroundColor: 'white',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  containers: {
    flex: 1
  },
  containerheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 80,
    // width:'70%',
    marginLeft: moderateScale(8),
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    fontSize: 16,
    flex: 3,
    marginEnd: 30,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdftext: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(10),
    color: colors.GRey800
  },
  exceltext: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(10),
    paddingLeft: 10,
    color: colors.GRey800
  },
  wordtext: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(10),
    color: colors.GRey800
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    backgroundColor: '#fff',
    padding: moderateScale(4),
    borderRadius: 5,
  },
  tooltipText: {
    color: colors.primary,
    fontSize: fontsize.small,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingTop: 2,
    paddingHorizontal: 5,
    borderRadius: 4
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    left: moderateScale(-10), // Adjust to align with the tooltip box
    top: moderateScale(15), // Adjust vertical alignment relative to tooltip
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.primary,
    transform: [{ rotate: '-90deg' }], // Rotate the arrow for left-notch
    zIndex: 1, // Ensure it sits behind the tooltip box
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 17,
    borderRadius: 10,
    alignItems: 'center',
  },
  documentText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 0,
    color: 'black',
    padding:4
  },
  closeButtons: {
    position:'absolute',top:0,right:5,margin:3
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    padding: 3,
    backgroundColor: colors.payment,
    borderRadius: 8
  },
  Docpopover: {
    width: width,
    height: moderateScale(250),
    borderRadius: 10,
    borderColor: colors.strokeW,
    borderWidth: 1,
    marginTop: moderateScale(-24),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 25,
      },
    }),
  },


})
