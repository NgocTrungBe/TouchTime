import React, { Component } from 'react';
import { View,StyleSheet ,Dimensions,TouchableOpacity,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const FriendListItem = ({friend,navigation}) =>{

    
    return(
   
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
           <Avatar rounded size={65} source={{uri:'data:image/png;base64,'+friend.photoURL}}></Avatar>
           <View style={styles.content}>
             <Text style={styles.userName}>{friend.userName}</Text>
           </View>
         </View>
       </TouchableOpacity>
    
      

    );
 
}

const styles = StyleSheet.create({
  button:{
    marginTop:7,
    width: width,
    height:height/9,
    backgroundColor:"#ebecec",
    justifyContent:'center',
    alignItems:'center',
  

  },
  friendView: {
    marginTop:30,
    marginLeft:35,
    marginBottom:30,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '900',
    color: '#060606',
  },
  lastMess: {
    marginLeft: 20,
    fontSize: 15,
    color: 'grey',
  },
});


export default FriendListItem;