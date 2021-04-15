import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { FlatList, View ,StyleSheet, Text} from 'react-native';
import {Avatar} from 'react-native-elements';

const users = [
    {
      displayName: 'Ngọc Trung',
      phoneNumber: '0352392573',
      photoURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30xbUecoLTy0M3y13vT5cOOTCFPQlA5MZRA&usqp=CAU',
      uid: 'rrrrrrrrrrrrrrrrrrrr',
    },
];

const ChatList = ({item,photoURL}) => {
  const [userName,setUserName] = useState();
  const [userPhoto,setUserPhoto]= useState();
   
  useEffect(()=>{
    users.map((userItem) => {
        if (userItem.uid ===  item.uid){
            setUserName(userItem.displayName);
            setUserPhoto(userItem.photoURL);
        } 
       })
  },[])
   return(
       <View style={styles.wrapper}>
         <Avatar rounded source={{uri:userPhoto}}></Avatar>
         <View style={styles.content}>
             <Text>{userName}</Text>
         
         </View>
       </View>
   );

}

const styles = StyleSheet.create({
    wrapper: {
    marginTop:49,
    flexDirection:"row",
    alignItems:"center"

       
    },
    content:{
        flexDirection:"column",
        justifyContent:"center"
    }
   
  });
export default ChatList;