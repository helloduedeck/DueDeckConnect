import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
const DATA = [
  {
    id: '1',
    title: 'Take coffee',
  },
  {
    id: '2',
    title: 'Write some code',
  },
  {
    id: '3',
    title: 'Take the test',
  },
  {
    id: '4',
    title: 'Excercise',
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default function PullToRefresh() {
  const [refreshing, setrefreshing] = useState(false);
  const [data, setdata] = useState(DATA);
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setdata((data) => [
        ...data,
        {
          id: '57878',
          title: 'Take a walk in the park',
        },
      ]);
      setrefreshing(false);
    }, 2000);
  };
  const renderItem = ({ item}) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fad586',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});









// import React,{useState} from 'react';
// import {View,Text,Button,FlatList,RefreshControl} from 'react-native';
// const MainPage =()=>{
//     const [refreshing, setRefreshing] = useState<boolean>(false);

//     const handleRefresh = () => {
//         setRefreshing(true);
      
//         // Implement your refresh logic here, e.g., fetch new data from an API
      
//         // After the refresh is complete, setRefreshing(false)
//         setTimeout(() => {
//           setRefreshing(false);
//         }, 1000); // Simulated delay, replace with your actual refresh logic
//       };
      

//     return(
//         <View style={{ flex: 1 }}>
//         <FlatList
//           data={[]}
//           renderItem={/* Render your items */}
//           keyExtractor={/* Provide a unique key for each item */}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={handleRefresh}
//             />
//           }
//         />
//       </View>

//     )
// }
// export default MainPage
