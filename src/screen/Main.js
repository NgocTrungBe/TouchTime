import React, {Component} from 'react';
import {useState} from 'react';
import {FlatList, View, StyleSheet,Dimensions} from 'react-native';
import AppHeader from '../components/AppHeader';
import ChatList from '../components/ChatList';
const {width, height} = Dimensions.get('window');



const chats = [
  {
    createdAt: '23/12/1999',
    messages: [
      {
        createdAt: '23/12/2000',
        content: 'hello',
        uid: 'e9wAcaVSUDNQEqEKPHz9wuIJeI82',
      },
    ],
    uid: 'e9wAcaVSUDNQEqEKPHz9wuIJeI82',
  },
];

const Main = ({navigation}) => {
  const [chatList,setChatList] = useState();
  
  return (
    <View>
      <AppHeader></AppHeader>
      <View>
      <FlatList style={{marginTop:height / 15}}
        showsVerticalScrollIndicator ={false}
        data={chats}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => {
          return <ChatList key={item.count} item={item} navigation={navigation}></ChatList>;
        }}></FlatList>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export default Main;
