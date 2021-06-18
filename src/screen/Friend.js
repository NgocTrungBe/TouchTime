import React, { Component,useEffect } from 'react';
import { View ,BackHandler} from 'react-native';
import FriendTab from './FriendTab';



const Friend = (props) =>{
  


  return(
      <View style={{flex:1}}>
          <FriendTab {...props}></FriendTab>
      </View>
  );
}

export default Friend;