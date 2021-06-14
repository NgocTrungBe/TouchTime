import React, {Component, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Avatar} from 'react-native-elements';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const ChatHeader = ({navigation, photoURL, userName}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const showFriendProfile = () => {
    setIsOpenMenu();
  };
  const handleOpenMenu = () => {
    setIsOpenMenu(true);
    // setTimeout(()=>{
    //    setIsOpenMenu(false);
    // },1000)
  };
  return (
    <View style={styles.Header}>
      <View style={styles.leftHeader}>
        <Feather
          style={styles.backButton}
          name="arrow-left"
          size={23}
          onPress={() => {
            navigation.navigate('Home');
          }}></Feather>
 
          <Avatar rounded size={40} source={{uri: photoURL}}></Avatar>
          <Text style={styles.userName}>{userName.split(' ').slice(-1)}</Text>
       
       
      </View>
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    width: width,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  leftHeader: {
    marginLeft: 20,
    width: 200,
    height: height / 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#060624',
  },
  backButton: {
    color: '#060606',
    marginRight: 20,
  },
  moreButton: {
    color: '#060606',
    marginRight: 15,
  },
  searchButton: {
    marginRight: 20,
    color: '#ffffff',
  },

});

export default ChatHeader;
