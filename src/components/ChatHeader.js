import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Avatar} from 'react-native-elements';

import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const ChatHeader = ({photoURL,userName}) => {

  return (
    <View style={styles.wrapper}>
      <View style={styles.Header}>
        <View style={styles.leftHeader}>
          <Feather  style={styles.backButton} name="arrow-left" size={23}></Feather>
          <Avatar rounded size={35} source={{uri:photoURL}}></Avatar>
          <Text style={styles.userName}>{userName}</Text>
        </View>
       <Feather style={styles.searchButton} name="search" size={23}></Feather>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position:"relative",
    zIndex:20
  },
  Header: {

    width: width,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ad69d4',
  },
  leftHeader:{
      marginLeft:20,
      width:200,
      height: height / 15,
      flexDirection:"row",
      alignItems:"center"
  },

  userName:{
      marginLeft:5,
      fontSize:17,
      fontWeight:"bold",
      color:"#ffffff"
  },
  backButton:{
      color:"#ffffff",
      marginRight:20
  },
  searchButton:{
      marginRight:20,
      color:"#ffffff"
  }
});
export default ChatHeader;
