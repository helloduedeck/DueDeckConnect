import React from 'react';
import {View} from 'react-native';
import {Sublabel} from '../../atoms/SubLabel';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '../../../themev1';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

type IProps = {
  details: any;
};
const LogContent = ({details}: IProps) => {
  const {status, assigned_to, updated_by, particulars, updated_at} =
    details;

  const formatUpdatedTime = (updated_at: string) => {
    return moment(updated_at).format('hh:mm A');
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
  return (
    <View>
      {particulars && (
        <View style={styles.particular}>
          <View style={{position: 'absolute', left: 0, top: moderateScale(-1)}}>
            <Sublabel
              size={'small'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={'Particulars: '}
              color={colors.GRey800}
              align={undefined}
            />
          </View>
          <View style={{marginLeft: moderateScale(60)}}>
            <Sublabel
              size={'small'}
              fontWeight={'bold'}
              fontStyle={'normal'}
              title={particulars}
              color={colors.GRey800}
              align={undefined}
            />
          </View>
        </View>
      )}
      {status && (
        <View style={styles.particular}>
          <Sublabel
            size={'small'}
            fontWeight={'normal'}
            fontStyle={'normal'}
            title={'Status: '}
            color={colors.GRey800}
            align={undefined}
          />
          <Sublabel
            size={'small'}
            fontWeight={'semibold'}
            fontStyle={'normal'}
            title={status}
            color={colors.SemGreen500}
            align={undefined}
          />
        </View>
      )}
      <View style={styles.Updates}>
        {assigned_to && (
          <View style={styles.particular}>
            <Sublabel
              size={'small'}
              fontWeight={'normal'}
              fontStyle={'normal'}
              title={'Assigned To: '}
              color={colors.GRey800}
              align={undefined}
            />
            <Sublabel
              size={'small'}
              fontWeight={'semibold'}
              fontStyle={'normal'}
              title={getHeaderText(assigned_to,35)}
              color={colors.GRey800}
              align={undefined}
            />
          </View>
        )}
      </View>
      {updated_by && (
        <View style={styles.particular}>
          <Sublabel
            size={'small'}
            fontWeight={'normal'}
            fontStyle={'normal'}
            title={'Updated By: '}
            color={colors.GRey800}
            align={undefined}
          />
          <Sublabel
            size={'small'}
            fontWeight={'semibold'}
            fontStyle={'normal'}
            title={getHeaderText(updated_by,35)}
            color={colors.GRey800}
            align={undefined}
          />
        </View>
      )}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 5,
          alignContent: 'center',
          alignItems: 'center',
          marginRight: 5,
        }}>
        <EvilIcons
          name={'refresh'}
          color={'#7D7D7D'}
          size={18}
          style={styles.icon}
        />
        <Sublabel
          size={'small'}
          fontWeight={'semibold'}
          fontStyle={'normal'}
          title={formatUpdatedTime(updated_at)}
          color={colors.GRey800}
          align={undefined}
        />
      </View>
    </View>
  );
};
export default LogContent;
const styles = ScaledSheet.create({
  particular: {
    flexDirection: 'row',
    flex: 1,
    // position:'absolute',
    // left:moderateScale(-20)
  },
  Updates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 30,
  },
  particular1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: moderateScale(6),
  },
});
