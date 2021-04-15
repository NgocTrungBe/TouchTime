import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const AppHeader = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.Header}>
        <View style={styles.leftHeader}>
          <Feather style={styles.drawerButton} name="align-justify" size={23}></Feather>
          <Text style={styles.appLogo}>TouchTime</Text>
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
    height: height / 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ad69d4',
  },
  leftHeader:{
      marginLeft:20,
      width:160,
      height: height / 15,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
  },
  appLogo:{
      fontSize:22,
      fontWeight:"bold",
      color:"#ffffff"
  },
  drawerButton:{
      color:"#ffffff"
  },
  searchButton:{
      marginRight:20,
      color:"#ffffff"
  }
});
export default AppHeader;