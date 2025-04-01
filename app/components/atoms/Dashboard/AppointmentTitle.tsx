import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Label} from '../Label';
import SubLabel from '../SubLabel/SubLabel';
import {colors} from '../../../themev1';
import {moderateScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@routes';
type IDashboardProps = {
  id: string;
  onSheduleNew: () => void;
};
const AppointmentTitle = ({id, onSheduleNew}: IDashboardProps) => {
  const navigation = useNavigation();
  console.log('AppointmentTitle', id);
  const onPressHandler = () => {
    if (id) {
      // Navigate to appointments screen
      navigation.navigate(ROUTES.APPOINTMENT);
    } else {
      // Navigate to schedule new screen
      onSheduleNew();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Label
          size={'small'}
          fontWeight={'semibold'}
          title={'Scheduled Appointment'}
          color={colors.GRey800}
          align={undefined}
        />
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onPressHandler}>
          <SubLabel
            size={'small'}
            fontWeight={'medbold'}
            title={id ? 'View All' : '+ Schedule New'}
            color={colors.primary}
            fontStyle={'normal'}
            align={undefined}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
  },
  left: {
    flex: 1, // Take up available space
    marginRight: moderateScale(30),
  },
  right: {
    marginLeft: 'auto', // Push to right
  },
});

export default AppointmentTitle;
