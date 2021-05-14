import React, { Component, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { View ,StyleSheet,Dimensions} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
const SetUserName =({navigation}) =>{
  const [userName,setUserName] = useState();
  const setUserNameHandle= () =>{
    if(userName != ''){
      navigation.navigate("SetAvatar",{userName:userName})
    }
  }
  return(
      <View style ={styles.wrapper}>
         <Text style={styles.appLogo}>Touch Time</Text>

         <View style ={styles.content}>
             <Text style={styles.contentTitle}>Chào Mừng!</Text>
             <Text style={styles.suggestions}>Hãy nhập vào tên người dùng</Text>
             <TextInput placeholder="..." onChangeText={(userName) => setUserName(userName)} style={styles.userNameInput}></TextInput>
         </View>
             <TouchableOpacity style={styles.nextButton} onPress={setUserNameHandle}><Text
             style={styles.buttonTitle}>Tiếp tục</Text></TouchableOpacity>
         
      </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      flex:1,
      backgroundColor:"#ad69d4",
      flexDirection: 'column',
      alignItems:'center',
    },
    content: {
      marginTop:height/3,  
      width:width-80,
      elevation:20,
      padding:20,
      borderRadius:10,
      backgroundColor:"#ffffff"

    },
    appLogo:{
        marginTop:height-710,
        fontSize:15,
        fontWeight:"bold",

        color:"#fff"
    }
      ,
    contentTitle:{
        fontSize:18,
        fontWeight:"bold",
        color:"#666666"
    },
    suggestions:{
        marginTop:10,
        fontSize: 15,
        color: '#666666',
        fontWeight:"900"
    }
     ,
    userNameInput: {
      marginTop:10,
      fontSize: 18,
      padding:10,
      borderWidth:1,
      borderRadius:5,
      borderColor:"#ad69d4",
      color: 'red',
    },
     buttonView:{
        marginTop:height-580,  
        width:width-80,
        elevation:20,
        padding:10,
        borderRadius:5,
        backgroundColor:"#edeeeb",
    
     },
     nextButton:{
        marginTop:height-580,  
        width:width-80,
        elevation:20,
        padding:10,
        borderRadius:5,
        backgroundColor:"#edeeeb",
        alignItems:"center",
        
     },
     buttonTitle:{
         fontSize:15,
         fontWeight:"500"
        
     }
  });
export default SetUserName;