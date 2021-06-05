import React, { Component } from 'react';
import { View,StyleSheet ,Dimensions,TouchableOpacity,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const FriendListItem = ({friend,navigation}) =>{

    
    return(
   
       <View style={styles.wrapper}>
           <TouchableOpacity style={styles.button}  key={friend.id}
         onPress={() =>
           navigation.navigate('Chat', {
            friendUserName: friend.userName,
            friendAvatar: 'data:image/png;base64,'+ friend.photoURL,
            friendID: friend.id,
           })
         }
         >
         <View style={styles.friendView}>
           <Avatar rounded size={55} source={{uri:'data:image/png;base64,'+friend.photoURL}}></Avatar>
           <View style={styles.content}>
             <Text  numberOfLines={1} lineBreakMode="tail"  style={styles.userName}>{friend.userName}</Text>
             <Text numberOfLines={1} lineBreakMode="tail" style={styles.email}>{friend.Email}</Text>
           </View>
           <View style={styles.buttonView}>
            
           </View>
         </View>
       </TouchableOpacity>
       </View>
     
      

    );
 
}

const styles = StyleSheet.create({

  wrapper:{
    width:width,
    alignItems:'center',
  },
  button:{
    marginTop:5,
    width:width/1.07,
    height:height/9,
    backgroundColor:"#ffffff",
    justifyContent:'center',
    borderLeftWidth:3.5,
    borderLeftColor:'green',
    borderRadius:15,
    elevation:5
  

  },
  friendView: {
    marginTop:30,
    marginLeft:25,
    marginBottom:30,
    height:height/9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  content:{
     flexDirection:'column',
     
  }, 
  userName: {
    marginLeft: 15,
    marginBottom:1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0b4721',
  },
  email: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  
 
});


export default FriendListItem;