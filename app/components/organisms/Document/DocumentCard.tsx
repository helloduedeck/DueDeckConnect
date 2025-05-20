import React from 'react';
import {Platform, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Sublabel} from '../../atoms/SubLabel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../themev1';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ROUTES} from '@routes';
import {useNavigation} from '@react-navigation/native';

interface DocumentCardPropsType {
  item: any;
  viewableItems?: any;
  onPress?: () => void;
}

const DocumentCard = ({item, viewableItems}: DocumentCardPropsType) => {
  const navigation = useNavigation<any>();

  const onDetailPress = () => {
    navigation.push(ROUTES.SERVICEDETAILS, item);
  };
  return (
    <TouchableOpacity onPress={onDetailPress}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '70%'}}>
            <Sublabel
              size={'medium'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={item.service_name}
              color={colors.GRey800}
              align={undefined}></Sublabel>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: `${colors.gray}43`,
              paddingHorizontal: 7,
              borderRadius: 2,
              height:moderateScale(30)
            }}>
            <Icon
              name="file"
              size={moderateScale(8)}
              style={{marginRight: moderateScale(4),color:colors.Grey600}}
            />
            <Sublabel
              size={'small'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={'Required:'}
              color={colors.Grey600}
              align={undefined}
            />
            <Sublabel
              size={'small'}
              fontWeight={'bold'}
              fontStyle={'normal'}
              title={item.document_count}
              color={colors.Grey600}
              align={undefined}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: moderateScale(7),
          }}>
          <View>
            <Icon
              name="download"
              size={10}
              style={{
                marginRight: moderateScale(4),
                color: item.received_count
                  ? colors.SemGreen500
                  : colors.documentGray,
              }}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Sublabel
              size={'small'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={'Received: '}
              color={
                item.received_count ? colors.SemGreen500 : colors.documentGray
              }
              align={undefined}
            />
            <Sublabel
              size={'small'}
              fontWeight={'bold'}
              fontStyle={'normal'}
              title={item.received_count ?? '0'}
              color={
                item.received_count ? colors.SemGreen500 : colors.documentGray
              }
              align={undefined}
            />
          </View>

          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Icon
                name="upload"
                size={10}
                style={{
                  marginRight: moderateScale(4),
                  color: item.pending_count
                    ? colors.semorange
                    : colors.documentGray,
                }}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Sublabel
                size={'small'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'Pending: '}
                color={
                  item.pending_count ? colors.semorange : colors.documentGray
                }
                align={undefined}
              />
              <Sublabel
                size={'small'}
                fontWeight={'bold'}
                fontStyle={'normal'}
                title={item.pending_count ?? '0'}
                color={
                  item.pending_count ? colors.semorange : colors.documentGray
                }
                align={undefined}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              right: 2,
              bottom: 2,
              position: 'absolute',
            }}>
            <Sublabel
              size={'exsmall'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={'FY : '}
              color={colors.Grey600}
              align={undefined}
            />
            <Sublabel
              size={'exsmall'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={item.fyear}
              color={colors.Grey600}
              align={undefined}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default DocumentCard;
const styles = ScaledSheet.create({
  container: {
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(10),
    backgroundColor: colors.white,
    padding: moderateScale(16),
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
  },
});
