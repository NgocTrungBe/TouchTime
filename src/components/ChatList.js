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
import { set } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const ChatItem = ({users,lastMess, navigation}) => {

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
             <Text style={styles.lastMess}>{lastMess}</Text>
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
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: '#191970',
  },
  lastMess: {
    marginLeft: 20,
    fontSize: 15,
    color: 'grey',
  },
});


const ChatList =({navigation}) =>{

  const [users, setUsers] = useState([]);
  const [lastMessage,setLastMessage] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  useEffect(() => {
    getData();
  }, []);




  const getData = () =>{
    const userID = Fire.getUid();
    Fire.getFriendListID(Fire.getFriendId).then(friendIDList => {
      if (friendIDList) {
          Fire.FindRoom(userID,friendIDList,data =>{
            Fire.getFriend(data.friendIDList).then(userList=>{
              setUsers(userList)
              setRefreshing(false);
            })
            Fire.getLastMess(data.roomIDList,lastMess =>{
                  setLastMessage(lastMess)
            });
          })
       //  });
      }
    });
  }
  const handleRefresh =() =>{
        setRefreshing(true)
        getData();
        
  }

  return(
    <FlatList style={{marginTop:height / 13,marginLeft:7}}
    showsVerticalScrollIndicator ={false}
    data={users}
    refreshing={refreshing}
    onRefresh ={handleRefresh}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => {
      return <ChatItem key={item.key} users={item} lastMess={lastMessage} navigation={navigation}></ChatItem>;
    }}></FlatList>
  );
}

export default ChatList;

