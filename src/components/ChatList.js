import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { FlatList, View ,StyleSheet, Text,Dimensions, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const users = [
    {
      displayName: 'Ngọc Trung',
      phoneNumber: '0352392573',
      photoURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30xbUecoLTy0M3y13vT5cOOTCFPQlA5MZRA&usqp=CAU',
      uid: 'rrrrrrrrrrrrrrrrrrrr',
    },
    {
      displayName: 'Trinh',
      phoneNumber: '0352392573',
      photoURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30xbUecoLTy0M3y13vT5cOOTCFPQlA5MZRA&usqp=CAU',
      uid: 'hhhh',
    },
];

const ChatList = ({item,photoURL,navigation}) => {
  const [userID,setUserID] = useState();
  const [userName,setUserName] = useState();
  const [userPhoto,setUserPhoto]= useState();
   
  useEffect(()=>{
    users.map((userItem) => {
        if (userItem.uid ===  item.uid){
            setUserID(userItem.uid);
            setUserName(userItem.displayName);
            setUserPhoto(userItem.photoURL);
        } 
       })
  },[])
   return(
      <TouchableOpacity key={userID} onPress={()=> navigation.navigate("Chat")}>
         <View style={styles.wrapper}>
         <Avatar rounded size={50} source={{uri:userPhoto}}></Avatar>
         <View style={styles.content}>
             <Text style={styles.userName}>{userName}</Text>
             <Text style={styles.lastMess}>hhhhhhhhhhhhhhhhhhhhhh</Text>
         </View>
       </View>
       </TouchableOpacity>
   );
   

}

const styles = StyleSheet.create({
    wrapper: {
    width:  width,
    padding:10,
    flexDirection:"row",
    alignItems:"center",
    borderWidth:0.2,
    borderColor:"grey"


       
    },
    content:{
        flexDirection:"column",
        justifyContent:"center"
    },
    userName:{
           marginLeft:20,
           fontSize:18,
           fontWeight:"500",
           color:"grey"
    },
    lastMess:{
           marginLeft:20,
           fontSize:15,
           color:"grey"
    }
   
  });
export default ChatList;