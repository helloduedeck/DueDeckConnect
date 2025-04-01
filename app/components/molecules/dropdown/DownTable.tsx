import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../../themev1';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Sublabel} from '../../atoms/SubLabel';
import {Label} from '../../atoms/Label';
import fontsize from '../../../themev1/fontstyle';
import moment from 'moment';
type IProps = {
  id: number;
  data: any;
};
const DropdownTable = ({id, data}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderItem = useCallback(
    ({item}: any) => (
      <View>
        <View style={styles.dropdown}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.column}>
              <Sublabel
                size={'small'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'Attended Date'}
                color={colors.darkgray}
                align={undefined}
              />
              <View style={styles.row}>
                <Label
                  size={'small'}
                  fontWeight={'normal'}
                  title={
                    item.attended_date ? formatDate(item.attended_date) : 'NA'
                  }
                  color={colors.GRey800}
                  align={undefined}
                />
              </View>
            </View>

            <View style={styles.column}>
              <Sublabel
                size={'small'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'Next Hearing Date '}
                color={colors.darkgray}
                align={undefined}
              />
              <View style={styles.row}>
                <Label
                  size={'small'}
                  fontWeight={'normal'}
                  title={
                    item.next_Hearing_date
                      ? formatDate(item.next_Hearing_date)
                      : 'NA'
                  }
                  color={colors.GRey800}
                  align={undefined}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginVertical: 18}}>
            <View style={styles.column}>
              <Sublabel
                size={'small'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'Stage Type'}
                color={colors.darkgray}
                align={undefined}
              />
              <View style={styles.row}>
                <Label
                  size={'small'}
                  fontWeight={'normal'}
                  title={item.stage_type}
                  color={colors.GRey800}
                  align={undefined}
                />
              </View>
            </View>

            <View style={styles.column}>
              <Sublabel
                size={'small'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'Attended By'}
                color={colors.darkgray}
                align={undefined}
              />
              <View style={styles.row}>
                <Label
                  size={'small'}
                  fontWeight={'normal'}
                  title={item.Attended_By}
                  color={colors.GRey800}
                  align={undefined}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    ),
    [],
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: colors.Buttongrey,
          marginTop: 8,
        }}
      />
    );
  };

  const keyExtractor = (item: any) => item.id;

  const formatDate = (date: string) => {
    return moment(date, 'YYYY-MM-DD').format('MMM Do, YYYY');
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Hearing Stage 1</Text>
        <TouchableOpacity onPress={toggleDropdown}>
          {isOpen ? (
            <Icon
              name="chevron-up"
              size={16}
              color={colors.Grey600}
              style={styles.icon}
            />
          ) : (
            <Icon
              name="chevron-down"
              size={16}
              color={colors.Grey600}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>

      {isOpen && data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(25),
    paddingVertical: moderateScale(7),
    backgroundColor: `${colors.Header}13`,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 5,
  },
  headingText: {
    fontSize: fontsize.medium,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  icon: {
    fontSize: 12,
  },
  dropdown: {
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  column: {
    flexDirection: 'column',
    flex: 0.5,
  },
  row: {
    marginVertical: moderateScale(4),
  },
});

export default DropdownTable;
