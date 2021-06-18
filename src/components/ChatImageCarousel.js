import React, {Component} from 'react';
import {View,FlatList,StyleSheet,TouchableOpacity,Image,Dimensions,Text} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');
const ImageCarouselItem = ({item,index}) => {
  return (
 
      <View
          style={{
            alignSelf: "center",     
            width:  item.image.width > width ? width :   item.image.width,
            height: item.image.height > height ? height :   item.image.height,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'center',
            }}
            source={{uri: item.image.uri}}></Image>
        </View>

       
   

  );
};

const ChatImageCarousel = ({navigation, route}) => {
 
 const {imageList,friendUserName,imageIndex } = route.params;
 console.log("index" + imageIndex)
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{
           navigation.pop();
        }} >
        <Feather name ="arrow-left"  size={23} style={{color:"#ffffff"}}  ></Feather>
        </TouchableOpacity>
        <Text style={styles.userName}>{friendUserName}</Text>
      </View>
      <FlatList
        data={imageList}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        keyExtractor={(item, index) => item + index}
        renderItem={({item,index}) => {
          return(
              <ImageCarouselItem item={item} index={index}></ImageCarouselItem>
          );
        }}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //position:"relative",
    backgroundColor:"#060606"
  },
  header:{
    position:"absolute",
    top:20,
    left:20,
    zIndex:1,
    flexDirection:"row",
    alignItems:'center',
  },
  backButton:{
    width:30,
  
   
  },
  userName:{
    marginLeft:20,
    fontSize:18,
    color:"#ffffff"
  }
});

export default ChatImageCarousel;
