import React from 'react';
import {Image, Platform, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Label} from '../../atoms/Label';
import {colors} from '../../../themev1';
import {Sublabel} from '../../atoms/SubLabel';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Title} from 'react-native-paper';

export interface DocumentUploadPropsType {
  Doclabelprop: any;
  DocSublabelprop: any;
  DocSublabelprop1: any;
  DocSubabelcount:any,
  attachments: [];
  onDocUpload?: () => void;
  onImagePress?: () => void;
  isNoDocument:any
}
const DocumentUpload = ({
  Doclabelprop,
  DocSublabelprop,
  DocSublabelprop1,
  DocSubabelcount,
  attachments,
  onDocUpload,
  onImagePress,
  isNoDocument

}: DocumentUploadPropsType) => {
  const checkFileType = (fileUri: any) => {
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
    const fileExtension = fileUri?.split('.').pop();
    return videoExtensions.includes(fileExtension);
  };
  return (
    <View
      style={{
        padding: moderateScale(8),
        backgroundColor: colors.white,
        width: moderateScale(155),
        borderRadius: 4,
        ...Platform.select({
          ios: {
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 4,
          },
          android: {
            elevation: 5,
          },
        }),
      }}>
                  <View style={{marginTop:moderateScale(0),height:20,width:20}}>
    
    <Sublabel {...DocSubabelcount} />
    </View>
      <View
        style={{
          top: moderateScale(8),
          right: moderateScale(8),
          position: 'absolute',
        }}>
        {attachments?.path && (
          <TouchableOpacity onPress={() => onDocUpload?.()}>
            <Icon
              name="upload"
              size={16}
              color={colors.primary}
              style={{marginRight: moderateScale(4), color: colors.primary}}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        
        {attachments?.path ? (
          <TouchableOpacity
            onPress={() => {
              console.log('TEST');
              onImagePress?.();
            }}>
            <Image
              source={{uri: attachments?.path}}
              // source={require('../../../assets/images/docwapp.png')}
              style={{
                width: moderateScale(75),
                height: moderateScale(92),
                backgroundColor: colors.white,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onDocUpload?.()}
            style={{
              paddingTop: 50,
              alignSelf: 'center',
              height: moderateScale(92),
            }}>
            <Icon
              name="upload"
              size={24}
              color={colors.primary}
              style={{
                marginRight: moderateScale(4),
                color: colors.primary,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(13),
        }}>
        <Label {...Doclabelprop} style={{textAlign: 'center'}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(4),
        }}>
        <Sublabel {...DocSublabelprop} />
        <Sublabel {...DocSublabelprop1} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({});
export default DocumentUpload;
