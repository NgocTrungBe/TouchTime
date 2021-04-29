import React, { Component } from 'react';
import { View,StyleSheet ,Dimensions,TouchableOpacity,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const ListFriend = ({friend,navigation}) =>{
    return(
      <View>
        <TouchableOpacity key={friend.id}
         onPress={() =>
           navigation.navigate('Chat', {
             userName: friend.userName,
             userPhoto: friend.photoURL,
             userID: friend.id,
           })

         }
         >
         <View style={styles.wrapper}>
           <Avatar rounded size={50} source={{uri:friend.photoURL}}></Avatar>
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
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: 'grey',
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


export default ListFriend;