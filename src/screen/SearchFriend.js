import React, {Component, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';
import {View, Text, StyleSheet, Dimensions, Keyboard} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
import Friend from './Friend';
const {width, height} = Dimensions.get('window');

const SearchFriend = () => {
  const [users, setUser] = useState([]);
  const [email, setEmail] = useState();
  function Search() {
    Fire.SearchUser(email).then(userItem => {
      if (userItem != 'nul') {
        const user = [];
        user.push(userItem);
        setUser(user);
      }
    });
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchView}>
        <TextInput
          multiline={true}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          autoFocus={false}
          autoCompleteType={'off'}
          onChangeText={email => setEmail(email)}
          style={styles.textInput}
          placeholder="email..."></TextInput>
        <Feather
          style={styles.searchButton}
          name="search"
          onPress={() => {
            Search();
            setEmail('');
          }}></Feather>
      </View>

      {users.length ? (
        users.map(user => {
          if (user) {
            return (
              <View key={user.id} style={styles.friendView}>
                <Avatar
                  rounded
                  size={70}
                  source={{uri: user.photoURL}}></Avatar>
                <View style={styles.content}>
                  <Text style={styles.userName}>{user.userName}</Text>
                  <TouchableOpacity style={styles.addFriendButton} onPress={() =>{
                    Fire.addFriend(user.id)
                  }}>
                    <Text style={styles.buttonTitle}>Kết bạn</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else
            return (
              <View style={styles.notFoundView}>
                <Text style={styles.notFoundMess}>
                  Không tìm thấy người dùng!
                </Text>
              </View>
            );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  textInput: {
    marginLeft: 10,
    height: 45,
    width: '85%',
    fontSize: 20,
    color: 'grey',
    borderRightWidth: 1,
    borderRightColor: 'grey',
  },
  searchButton: {
    width: '15%',
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
  },
  searchView: {
    width: width - 50,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: width - 366,
    padding: 5,
    backgroundColor: '#ededf0',
    borderRadius: 10,
    elevation: 20,
  },

  friendView: {
    width: width - 90,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: width - 365,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
  },
  content: {
    marginLeft:5,
    height:70,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color:"black"
  },
  addFriendButton: {
    width:80,
    marginLeft:20,
    marginTop:5,
    padding:8,
    backgroundColor:"#ad69d4"
  },
  buttonTitle:{
     marginLeft:1,
     color:"#ffffff",
     fontSize:16,
     fontWeight:"500"
  },
  notFoundView: {
    marginTop: 20,
    marginLeft: 28,
  },
  notFoundMess: {
    fontSize: 15,
    color: 'red',
  },
});

export default SearchFriend;
