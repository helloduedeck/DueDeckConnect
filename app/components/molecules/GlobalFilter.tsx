import {Sublabel} from '@components/atoms/Labels';
import {colors} from '@theme';
import React from 'react';
import { Image } from 'react-native';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons';
const GlobalFilter = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.org}>
          <Sublabel
            size={'medium'}
            fontWeight={'semibold'}
            title={'Eligo Apptech Pvt Ltd.'}
            color={colors.white}
            align={'right'}
            fontStyle={'normal'}
            maxLength={24}/>
        </View>

        <Sublabel
          size={'exsmall'}
          fontWeight={'normal'}
          title={'Vsap and Company. hghg ergret rt rter trt erter t,,,, dfdsfd fdf'}
          color={colors.white}
          align={'right'}
          fontStyle={'normal'}
          maxLength={24}/>
      </View>
      <View>
        <Image
          source={require('../../assets/images/Lock.png')}
          width={40}
          height={40}
          style={{marginTop:5}}
        />
      </View>
    </View>
  );
};
export default GlobalFilter;

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
  org: {
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
});
