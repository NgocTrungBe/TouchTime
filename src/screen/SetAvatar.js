import React, { Component, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { View ,StyleSheet,Dimensions,Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');
const SetAvatar =({route,navigation}) =>{
  const [imageUri,setImageUri] = useState();
  const {userName} =  route.params;
  const chooseImageHandle=() =>{
     launchImageLibrary({maxWidth:width-130,height:120,mediaType:"photo",includeBase64:true},response =>{
        if(response) setImageUri(response.uri);
        console.log(userName)
        //console.log(response.base64)

     })
  }
  return(
      <View style ={styles.wrapper}>
         <View style ={styles.content}>
             <Text style={styles.contentTitle}>Ảnh đại diện của bạn</Text>
             <Text style={styles.suggestions}>Hãy chọn hình ảnh để làm ảnh đại diện</Text>
             <View style={styles.imagePickerView}>
                 <Image source={{uri:imageUri}} style={styles.image}></Image>
                 <Feather onPress={chooseImageHandle} name="plus" style={styles.addImageBtn}></Feather>
             </View>
         </View>
             <TouchableOpacity style={styles.nextButton}><Text
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
      marginTop:height-580,  
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
     ,imagePickerView:{
       flexDirection:"row",
       alignItems:"center",
       marginTop:10,
       width:width-130,
       height:120,
       backgroundColor:"#edeeeb"
     }
     ,
     image:{
       width:"60%",
       height:120,
       backgroundColor:"pink"
     }
     ,addImageBtn:{
       marginLeft:40,
       fontSize:30,
       color:"blue"
     }

  });
export default SetAvatar;