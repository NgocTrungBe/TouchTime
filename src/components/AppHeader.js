import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
const {width, height} = Dimensions.get('window');

const AppHeader = (props) => {
 
 
  
  const openDrawer =() =>{
    props.navigation.openDrawer();
  }
  return (
  
      <View style={styles.Header}>
        <View style={styles.leftHeader}>
          <Feather onPress={openDrawer}
           
            style={styles.drawerButton}
            name="align-justify"
            size={25}></Feather>
          <Text style={styles.appLogo}>TouchTime</Text>
        </View>
        {/* <Image resizeMode= "cover" style={styles.avatar} source={{uri:'data:image/png;base64,'+users.user.photoURL}} ></Image> */}
    
     
      </View>
    
  );
};

const styles = StyleSheet.create({

  Header: {
    width: width,
    height: height / 10,

    // width: width/1.1,
    // height: height / 8,
 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:0.5,
    // borderStyle:"solid",
    borderColor:'#ad69d4',
    backgroundColor: '#F8F8FF',
   
    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
     
  },
  leftHeader: {
    marginLeft: 25,
    width: 160,
    height: height / 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appLogo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ad69d4',
  },
  drawerButton: {
    color: '#ad69d4',
  },
  searchButton: {
    marginRight: 20,
    color: '#ad69d4',
  },
});
export default AppHeader;
