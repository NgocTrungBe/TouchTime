import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import WaitingFriendListItem from '../components/WaitingFriendListItem';

const {width, height} = Dimensions.get('window');

const WaitingFriendList = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();
  const [currentUserName,setCurrentUserName] = useState();
  const [currentUserEmail,setCurrentUserEmail] = useState();
  const [currentUserAvatar,setCurrentUserAvatar] = useState();
  const {AcceptFriend } = props;

  useEffect(() => {
    
    const unsubscribe = Fire.getUserInfo().then(user=>{
      setCurrentUserName(user.userName);
      setCurrentUserEmail(user.email);
      setCurrentUserAvatar(user.photoURL);
    })
    props.getWaitingFriend();

   return ()=>{
     unsubscribe;
   }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      props.GetWaitingFriend(userID);
      setRefreshing(false);
    }, 1000);
      
  };
  return (
    <View>
          <FlatList
            
            showsVerticalScrollIndicator={false}
            data={props.appData.waitingFriendList}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={item => item.key}
            renderItem={({item}) => {
              return (
                <WaitingFriendListItem
                 acceptFriend={props.acceptFriend}  
                 deleteFriend ={props.deleteFriend}
                 currentUserName={currentUserName}
                 currentUserEmail={currentUserEmail}
                 currentUserAvatar={currentUserAvatar}
                  key={item.key}
                  friend={item}
                
                   navigation={props.navigation}
                  ></WaitingFriendListItem>
              );
            }}></FlatList>
    
      
    
    </View>
  );
};
const styles = StyleSheet.create({
  friendView: {
    width: width - 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: width/40,
    marginTop: height / 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ededf1',
  },
  waitingFriendView: {
    width: width - 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: width - 380,
    marginTop: height / 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ededf1',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
});
export default WaitingFriendList;
