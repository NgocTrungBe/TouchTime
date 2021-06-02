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

const ChatItem = ({users, navigation}) => {
 

  return (
     <View>
       <TouchableOpacity key={users.user.id}
         
         onPress={() =>
           navigation.navigate('Chat', {
            friendUserName: users.user.name,
            friendAvatar: 'data:image/png;base64,'+ users.user.photoURL,
            friendID: users.user.id,
           })

         }
         >
         <View style={styles.wrapper}>
           <Avatar rounded size={50} source={{uri:'data:image/png;base64,'+users.user.photoURL}}></Avatar>
           <View style={styles.content}>
             <Text style={styles.userName}>{users.user.userName}</Text>
             <Text style={styles.lastMess}>{users.user.userName.includes(users.sender) ? users.sender+":"+ " " + users.text : "Bạn:"+ " " + users.text }</Text>
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


const ChatList =(props) =>{

  
  const [users, setUsers] = useState([]);
  const [lastMessage,setLastMessage] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  useEffect(() => {
    getData();
  }, []);




  const getData = () =>{
    const userID  = Fire.getUid();
    props.GetChatList(userID);
  }
  const handleRefresh =() =>{
        setRefreshing(true)
        getData();
        
  }

  return(
    <FlatList style={{marginTop:height / 13,marginLeft:7}}
    showsVerticalScrollIndicator ={false}
    data={props.appData.chatList}
    refreshing={refreshing}
    onRefresh ={handleRefresh}
    keyExtractor={(item) => item.user.id}
    renderItem={({item}) => {
      return <ChatItem key={item.key} users={item} navigation={props.navigation}></ChatItem>;
    }}></FlatList>
  );
}

export default ChatList;

