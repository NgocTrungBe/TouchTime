import React, {Component, useEffect} from 'react';
import {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
import database from '@react-native-firebase/database';
import {canInstrument} from 'babel-jest';

const {width, height} = Dimensions.get('window');

const ChatItem = ({users, navigation}) => {

  return (
     <View>
       <TouchableOpacity key={users.id}
         
         onPress={() =>
         
      
           navigation.navigate('Chat', {
             userName: users.userName,
             userPhoto: users.photoURL,
             userID: users.id,
           })

         }
         >
         <View style={styles.wrapper}>
           <Avatar rounded size={50} source={{uri: users.photoURL}}></Avatar>
           <View style={styles.content}>
             <Text style={styles.userName}>{users.userName}</Text>
             <Text style={styles.lastMess}>hhhhhhhhhhhhhhhhhhhhhh</Text>
           </View>
         </View>
       </TouchableOpacity>
     </View>
        
     
  );
};

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


const ChatList =({navigation}) =>{

  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [isLoadData, setIsLoadData] = useState(false);
  useEffect(() => {
    const userRef = database().ref('users');
    userRef.on('value', snapshot => {
      const users = snapshot.val();
      const userList = [];
      for (let item in users) {
        userList.push(users[item]);
      }
      setUsers(userList);
    });
  }, []);
   
  return(
    <FlatList style={{marginTop:height / 15}}
    showsVerticalScrollIndicator ={false}
    data={users}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => {
      return <ChatItem key={item.key} users={item} navigation={navigation}></ChatItem>;
    }}></FlatList>
  );
}

export default ChatList;

