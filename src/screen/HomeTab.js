import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Alert,
  BackHandler,
  StatusBar,
  Text,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Friend from './Friend';
import Home from './Home';
import AppHeader from '../components/AppHeader';
import Fire from '../Database/Fire';

const homeStack = createStackNavigator();
const tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');


const HomeTabs = (props) => {
  const [userName,setUserName] = useState();
const [email,setEmail] = useState();
const [photoURL,setPhotoURL] = useState();
const [friendQuality,setFriendQuality] = useState();
const [waitingAcceptFriend,setWaitingAcceptFriend] = useState();


  useEffect(()=>{

    Fire.getUserInfo().then(userData=>{
         if(userData != 'null'){
           setUserName(userData.userName);
           setEmail(userData.email);
           setPhotoURL('data:image/png;base64,'+userData.photoURL);
           setFriendQuality(userData.friendList);
           setWaitingAcceptFriend(userData.acceptWaitingFriend);
         }
    })

},[])

  return (
    <tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          // position:'absolute',
          // bottom:15,
          // left:10,
          // right:10,
          height: 60,
          //borderRadius:10,
          elevation: 8,
          backgroundColor: '#ffffff',
        },
      }}>
      <tab.Screen
        name="Home"
    
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Feather
                name="message-circle"
                color={focused ? '#C576F6' : '#748c94'}
                size={25}></Feather>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: focused ? '#C576F6' : '#748c94',
                }}>
                Chat
              </Text>
            </View>
          ),
        }}>{props => <Home photoURL={photoURL} {...props} ></Home>}</tab.Screen>
      <tab.Screen
        name="Friends"
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Feather
                name="users"
                color={focused ? '#C576F6' : '#748c94'}
                size={25}></Feather>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: focused ? '#C576F6' : '#748c94',
                }}>
                Danh Bạ
              </Text>
            </View>
          ),
        }}>{props => <Friend photoURL={photoURL} {...props} ></Friend>}</tab.Screen>
    </tab.Navigator>
  );
};

export default HomeTabs;
