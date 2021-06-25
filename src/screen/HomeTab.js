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
import database from '@react-native-firebase/database';
const homeStack = createStackNavigator();
const tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const HomeTabs = props => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState();
  const [friendQuality, setFriendQuality] = useState('');
  const [waitingAcceptFriend, setWaitingAcceptFriend] = useState('');

  useEffect(() => {
    const unsubscribe = Fire.getUserInfo().then(userData => {
      if (userData != 'null') {
        setPhotoURL('data:image/png;base64,' + userData.photoURL);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 60,
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
        }}>
        {props => <Home photoURL={photoURL} {...props}></Home>}
      </tab.Screen>
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
        }}>
        {props => <Friend photoURL={photoURL} {...props}></Friend>}
      </tab.Screen>
    </tab.Navigator>
  );
};

export default HomeTabs;
