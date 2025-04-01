import React from 'react';
import {ScrollView} from 'react-native';

import {colors} from '../../../themev1';
import NoticeDetailBoard from '@components/templates/Details/NoticeDetailsBoard';

const NoticeDetails = () => {
  return (
    <ScrollView style={{backgroundColor: colors.Dashboard}}>
      <NoticeDetailBoard />
    </ScrollView>
  );
};
export default NoticeDetails;
