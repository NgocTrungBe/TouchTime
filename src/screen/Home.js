import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {View, StatusBar, Dimensions, Text} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import * as Actions from '../redux/Actions/AppActions';
import AppHeader from '../components/AppHeader';
import ChatListContainer from '../redux/Containers/AppContainer/ChatListContainer';
import FriendListInHomeContainer from '../redux/Containers/AppContainer/FriendListInHomeContainer ';
import {ScrollView} from 'react-native';
const {width, height} = Dimensions.get('window');

const Home = props => {
  if (props.route.name == 'Friend') {
    props.navigation.closeDrawer();
  }

  const onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  // useEffect(()=>{
  //   BackHandler.addEventListener('hardwareBackPress',onBackPress);

  //   return ()=>{
  //   BackHandler.removeEventListener('hardwareBackPress',onBackPress);
  //   }

  // },[])
  return (
    <View
      style={{
        height: height,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#F8F8FF',
      }}>
      <StatusBar backgroundColor="#F8F8FF" hidden={true}></StatusBar>
      <AppHeader {...props}></AppHeader>
      <ChatListContainer navigation={props.navigation}></ChatListContainer>
    </View>
  );
};

export default Home;
