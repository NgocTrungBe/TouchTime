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

const FriendHeader = (props) => {
  return (


    
    <View style={styles.Header}>
        <View style={styles.leftHeader}>
          <View style={styles.avatarView}>
           <Image resizeMode= "cover" style={styles.avatar} source={{uri:props.photoURL}} ></Image>
          </View>
  
          <Text style={styles.appLogo}>TouchTime</Text>
        </View>
     
        <Feather
          style={styles.addFriendButton}
          name="user-plus"
          size={23}
          onPress={() => {
                navigation.navigate("SearchUserContainer") 
          }}></Feather>
     
      </View>

  
  );
};

const styles = StyleSheet.create({
  Header: {
    width: width,
    height: height / 9,

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
    marginTop:8,
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

  addFriendButton: {
    marginRight: 20,
    color: '#ad69d4',
  },
  avatar:{
    width:32,
    height:32,
    borderRadius:10,
  
  },
  avatarView:{
    width:33,
    height:33,
    borderRadius:15,
    marginRight:20,
    elevation:20
  }
});
export default FriendHeader;
