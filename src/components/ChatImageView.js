import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {Text} from 'react-native';
import {View, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const ChatImageView = ({navigation,image,imageIndex,friendUserName,isMyMessage,getImageList}) => {
     
 
  const imageList = getImageList();
  const showImage = () =>{
          navigation.navigate("ChatImageCarousel",{imageList:imageList,imageIndex:imageIndex,friendUserName:friendUserName});
  }
  return (
    <View>
      <TouchableOpacity onPress={showImage}>
      <View
      style={{
        alignSelf:isMyMessage() ? "flex-end":"flex-start",
        marginBottom:10,
        marginRight:10,
        marginLeft:10,
        width: 130,
        height: 130,
        borderColor: '#fff',
        borderWidth:1.5,
        borderRadius: 7,
     
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          borderRadius:20,
          resizeMode: 'stretch',
        }}
        source={{uri: image.uri}}></Image>
    </View>
      </TouchableOpacity>
    </View>
  );
};
export default ChatImageView;
