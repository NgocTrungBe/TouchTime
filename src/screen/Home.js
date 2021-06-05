import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {View, StatusBar, Dimensions, Text} from 'react-native';
import {connect} from 'react-redux';
import * as Actions from '../redux/Actions/AppActions';
import AppHeader from '../components/AppHeader';
import ChatListContainer from '../redux/Containers/AppContainer/ChatListContainer';
import FriendListInHomeContainer from '../redux/Containers/AppContainer/FriendListInHomeContainer ';
import ChatList from '../components/ChatList';
import Fire from '../Database/Fire';
import FriendListInHome from '../components/FriendListInHome';
const {width, height} = Dimensions.get('window');


const Home = props => {

 

  const onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };



  return (
    <View
      style={{
        height: height,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#F8F8FF',
      }}>
      <AppHeader photoURL={props.photoURL} {...props} ></AppHeader>
      <StatusBar backgroundColor="#F8F8FF" hidden={true}></StatusBar>
      {/* <ChatList navigation={props.navigation}></ChatList> */}
      <ChatListContainer navigation={props.navigation}></ChatListContainer>
      
    </View>
  );
};

export default Home;
