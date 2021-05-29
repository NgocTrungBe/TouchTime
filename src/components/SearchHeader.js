import React, {Component,useState} from 'react';
import {View, StyleSheet, Text, TextInput,Dimensions,  Keyboard} from 'react-native';
import {Avatar} from 'react-native-elements';

import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const SearchFriendHeader = (props) => {
  const [email, setEmail] = useState();

  function Search() {
    props.SearchUser(email);
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.Header}>
        <View style={styles.leftHeader}>
          <Feather  style={styles.backButton} name="arrow-left" size={23} onPress={()=>{
            props.navigation.navigate("Friends");
          }}></Feather>
        </View>
        <View style={styles.searchView}>
        <TextInput
          multiline={true}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          autoFocus={false}
          value={email}
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
            Keyboard.dismiss();
          }}></Feather>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position:"relative",
    zIndex:20,
    backgroundColor:"red"
  },
  Header: {
    
    width: width,
    height: height / 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ad69d4',
  },
  leftHeader:{
      marginLeft:20,
      flexDirection:"row",
      alignItems:"center"
  },

  userName:{
      marginLeft:10,
      fontSize:17,
      fontWeight:"bold",
      color:"#ffffff"
  },
  backButton:{
      color:"#ffffff",
      marginRight:20
  },
  textInput: {
    marginLeft: 10,
    height: 45,
    width: '80%',
    fontSize: 19,
    color: '#05375a',
  },
  searchButton: {
    width: '20%',
    marginRight:10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:"bold",
    color: '#060606'
  },
  searchView: {
    width: width/1.32,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  
  },

});
export default SearchFriendHeader;
