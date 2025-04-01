import {Chip} from '@components/atoms/Chip/Chip';
import React, {useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import List from '../list/List';

const ScrollTabView = ({onChipPress = ()=>{},tomove = ()=>{}}) => {
  const [menuData, setMenuData] = useState([]);
  const [listData, setListData] = useState([]);
  const [selectedListItem, setSelectedListItem] = useState(null);
  return (
    <View>
      <ScrollView>
        {menuData?.map((item, index) => (
          <Chip
            onPress={() => {
              onChipPress(item), tomove(index);
            }}
            item={item}
            selectedListItem={selectedListItem}
          />
        ))}
      </ScrollView>
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

        ]}
        renderItem={renderItem}
      />
      {/* <FlatList
        data={listData}
        style={{}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        renderItem={({item, index}) => (

        )}
        keyExtractor={item => item?.AnswerValue}
        extraData={listData}
      /> */}
    </View>
  );
};

export default ScrollTabView;
