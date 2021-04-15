import React, {Component} from 'react';
import {useState} from 'react';
import {FlatList, View, StyleSheet,Dimensions} from 'react-native';
import AppHeader from '../components/AppHeader';
import ChatList from '../components/ChatList';
const {width, height} = Dimensions.get('window');

const users = [
  {
    displayName: 'Ngọc Trung',
    phoneNumber: '0352392573',
    photoURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30xbUecoLTy0M3y13vT5cOOTCFPQlA5MZRA&usqp=CAU',
    uid: 'rrrrrrrrrrrrrrrrrrrr',
  },
];

const chats = [
  {
    count: 0,
    createdAt: '23/12/1999',
    messages: [
      {
        createdAt: '23/12/2000',
        content: 'hello',
        uid: 'rrrrrrrrrrrrrrrrrrrr',
      },
    ],
    uid: 'rrrrrrrrrrrrrrrrrrrr',
  },
  {
    count: 0,
    createdAt: '23/12/1999',
    messages: [
      {
        createdAt: '23/12/2000',
        content: 'hello',
        uid: 'rrrrrrrrrrrrrrrrrrrr',
      },
    ],
    uid: 'r',
  },
];
const Main = ({navigation}) => {
  const [userPhotoURL, setUserPhotoURL] = useState();

  return (
    <View>
      <AppHeader></AppHeader>
      <View>
      <FlatList
        data={chats}
        keyExtractor={item => item.uid}
        renderItem={({item}) => {
        
          return <ChatList key={item.uid} item={item} photoURL={userPhotoURL}></ChatList>;
        }}></FlatList>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export default Main;
