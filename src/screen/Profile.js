import React, {Component, useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {FlatList} from 'react-native-gesture-handler';
import Fire from '../Database/Fire';
import { Alert } from 'react-native';

const {width, height} = Dimensions.get('window');

const Profile = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [friendQuality, setFriendQuality] = useState();
  const [waitingAcceptFriend, setWaitingAcceptFriend] = useState();

  useEffect(() => {
    Fire.getUserInfo().then(userData => {
      if (userData != 'null') {
        setUserName(userData.userName);
        setEmail(userData.email);
        setPhotoURL('data:image/png;base64,' + userData.photoURL);
        setFriendQuality(userData.friendList);
        setWaitingAcceptFriend(userData.waitingAcceptFriend);
      }
    });
  }, []);

  const showAlert = () =>{
     return(
       Alert.alert(
         "!!!",
         "Bạn có muốn đăng xuất không?",
         [
           {
            text:"Không",
            onPress :() => null ,
            style:"cancel"
           },
           {
           text:"Đồng ý",
           onPress :() => Fire.signOut(),
          },
         ]
       )
     );
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.avatarView}>
          <View style={styles.avatar}>
            <Image style={styles.avatarImage} source={{uri: photoURL}}></Image>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.friendView}>
              <View style={styles.friendQualityView}>
                <Text style={styles.quality}>{friendQuality}</Text>
                <Text style={styles.friendInfo}>Bạn bè</Text>
              </View>
              <View style={styles.friendQualityView}>
              <Text style={styles.quality}> {waitingAcceptFriend ? waitingAcceptFriend : '0'}</Text>
                <Text style={styles.friendInfo}>
                  Đang chờ
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.contact}>
            <View style={styles.item}>
              <Feather name="mail" style={styles.icon}></Feather>
              <Text style={styles.title}>{email}</Text>
            </View>
          </View>
         <TouchableOpacity style={styles.logoutButton} onPress={showAlert}>
         <View style={styles.buttonView}>
            <Feather style={styles.icon} name="log-out"></Feather>
              <Text style={styles.title}>Đăng xuất</Text>
           
          </View>
         </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  avatarView: {
    padding:20,
    height: height / 4,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: '#C576F6',
    borderRadius: 50,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  infoView: {
    marginLeft:10,
    flexDirection: 'column',
  },
  friendView: {
    flexDirection: 'row',
  },
  friendInfo: {
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold',
    borderBottomWidth:2,
    borderBottomColor:"green"
  },
  friendQualityView:{
    padding:10,
    flexDirection:"column",
    alignItems:"center"
 
  },
  quality:{
    fontSize:16,
    color:'#060678',
    fontWeight:"bold"
  },
  userName: {
    marginTop:5,
    marginLeft:10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contact: {
    width: width,
    height: height / 1.8,
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal:20,
    width: width,
    height: height / 10,
    backgroundColor: '#ffffff',
    borderRadius:5,
    elevation: 20,
  },
  icon: {
    fontSize:23,
    fontWeight:"bold",
     color:'red'
  },
  title: {
    paddingLeft:15,
    color: '#060622',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonView:{
    flexDirection:"row",
    alignItems:"center",
    width: width,
    height: height / 10,
 
    paddingHorizontal:20,
    backgroundColor:"#ffffff",
   
  },
  logoutButton:{
    width: width,
    height: height / 10,
    backgroundColor:"#ffffff",
    elevation:20,
  }
  
});

export default Profile;
