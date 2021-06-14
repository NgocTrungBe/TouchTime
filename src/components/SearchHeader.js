import React, {Component,useState} from 'react';
import {View, StyleSheet, Text, TextInput,Dimensions,  Keyboard} from 'react-native';
import {Avatar} from 'react-native-elements';

import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';

const {width, height} = Dimensions.get('window');

const HomeSearchView = (props) => {
  const [email, setEmail] = useState();

  const Search = () => {
    // props.SearchUser(email);
   
    if(email){
      Fire.SearchUser(email).then(user =>{
        // console.log(user)
        if(user.length > 0){
          props.searchFriend(user);
        }
       else{
        props.searchFriend([]);
       }
        
      });
    }
  }
  return (
  
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
    
  );
};

const styles = StyleSheet.create({
 
  Header: {
    
    width: width,
    height: height / 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation:10,
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
      color:"#C576F6",
      marginRight:20
  },
  textInput: {
    marginLeft: 10,
    height: 45,
    width: '80%',
    fontSize: 19,
     fontFamily:"AntDesign",
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
    backgroundColor:"#F7EEEB",
    borderRadius: 12,
  
  },

});
export default HomeSearchView;
