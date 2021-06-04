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
import {createDrawerNavigator} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import Friend from './Friend';

import AppHeader from '../components/AppHeader';
import ChatListContainer from '../redux/Containers/AppContainer/ChatListContainer';
import DrawerContent from '../components/DrawerContent';

import Home from './Home';
const Drawer = createDrawerNavigator();
const homeStack = createStackNavigator();
const tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const homeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Friend" component={Friend} />
    </Drawer.Navigator>
  );
};

const HomeTabs = ({navigation}) => {
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
        component={homeDrawer}
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
        }}></tab.Screen>
      <tab.Screen
        name="Friends"
        component={Friend}
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
        }}></tab.Screen>
    </tab.Navigator>
  );
};

export default HomeTabs;
