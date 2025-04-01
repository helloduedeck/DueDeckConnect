import {StyleSheet, View} from 'react-native';
import React from 'react';
import List from '@components/molecules/list/List';
import NoticeCard from '@components/atoms/NoticeCard/NoticeCard';

type IProps = {
  point: string;
};

const NoticeList: React.FC<IProps> = ({point}) => {
  return (
    <List
      point={point}
      store="notice"
      filter={[
        {
          name: 'Notice',
          param: 'service_id',
        },
        {
          name: `${point} Notice Status`,
          param: 'taskstatus_id',
        },
      ]}
      renderItem={({item, viewableItems}) => (
        <NoticeCard
          isPending={point === 'Pending'}
          isCompleted={point === 'Completed'}
          item={item}
          viewableItems={viewableItems}
          date={undefined}
        />
      )}
    />
  );
};

export default NoticeList;

const styles = StyleSheet.create({});
