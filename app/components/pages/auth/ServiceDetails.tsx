import React from 'react';
import {ScrollView} from 'react-native';

import ServiceDetailBoard from '@components/templates/Details/ServiceDetailBoard';
import {colors} from '../../../themev1';

const SeviceDetails = ({route, navigation}: any) => {
  const {id} = route.params;

  return (
    <ScrollView style={{backgroundColor: colors.Dashboard}}>
      <ServiceDetailBoard id={id} />
    </ScrollView>
  );
};
export default React.memo(SeviceDetails);
