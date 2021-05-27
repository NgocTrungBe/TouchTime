import React, { Component } from 'react';
import { View,StyleSheet ,Dimensions,TouchableOpacity,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const FriendListItem = ({friend,navigation}) =>{

    
    return(
      <View>
        
        <TouchableOpacity style={{  elevation:20,backgroundColor:"#ffffff"}}  key={friend.id}
         onPress={() =>
           navigation.navigate('Chat', {
            friendUserName: friend.userName,
            friendAvatar: 'data:image/png;base64,'+ friend.photoURL,
            friendID: friend.id,
           })

         }
         >
         <View style={styles.wrapper}>
           <Avatar rounded size={45} source={{uri:'data:image/png;base64,'+friend.photoURL}}></Avatar>
           <View style={styles.content}>
             <Text style={styles.userName}>{friend.userName}</Text>
           </View>
         </View>
       </TouchableOpacity>
      </View>
      

    );
 
}

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    paddingBottom:15,
    flexDirection: 'row',
    alignItems: 'center',
   backgroundColor:"#ffffff",
 
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: 'grey',
  },
  lastMess: {
    marginLeft: 20,
    fontSize: 15,
    color: 'grey',
  },
});


export default FriendListItem;