import React, { Component } from 'react';
import { View } from 'react-native';
import FriendTab from './FriendTab';

const Friend = (props) =>{
  return(
      <View style={{flex:1}}>
          <FriendTab {...props}></FriendTab>
      </View>
  );
}

export default Friend;