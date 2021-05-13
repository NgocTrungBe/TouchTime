import React, { useEffect, useState } from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-elements';
import Fire from '../Database/Fire';
import { TouchableOpacity } from 'react-native';
const {width, height} = Dimensions.get('window');
const DrawerContent = (props) => {

  const [userName,setUserName] = useState();
  const [email,setEmail] = useState();
  const [photoURL,setPhotoURL] = useState();
  const [friendQuality,setFriendQuality] = useState();
  const [waitingAcceptFriend,setWaitingAcceptFriend] = useState();
  useEffect(()=>{

      Fire.getUserInfo().then(userData=>{
           if(userData != 'null'){
             setUserName(userData.userName);
             setEmail(userData.email);
             setPhotoURL('data:image/png;base64,'+userData.photoURL);
             setFriendQuality(userData.friendList);
             setWaitingAcceptFriend(userData.acceptWaitingFriend);
           }
      })

  },[])
  return (
    <View style={styles.wrapper}>
      <DrawerContentScrollView {...props}>
         <View style={styles.drawerContent}>
             <View style={styles.userInfoSection}>
                    <Avatar rounded size={50} 
                    source={{uri:photoURL}}>

                    </Avatar>
                    <View style={styles.infoView}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                    </View>
             </View>
             <View style={styles.friendView}>
                   <View style={styles.friendSection}>
                       <Text style={styles.friendSectionQuality}>{friendQuality}</Text>
                       <Text style={styles.friendSectionTitle}>Bạn bè</Text>
                   </View>
                   {
                     waitingAcceptFriend > 0 ?   <View style={styles.friendSection}>
                       <Text style={styles.friendSectionQuality}>{waitingAcceptFriend}</Text>
                       <Text style={styles.friendSectionTitle}>Đang chờ</Text>
                   </View> : <View></View> 
                   }
             </View>
         </View>
      </DrawerContentScrollView>
      <TouchableOpacity   onPress={() => {
             Fire.signOut();
          }}>
      <View style={styles.footer}>
      <Feather
          style={styles.logoutButton}
          name="log-out"
          size={23}
        ></Feather>
       <Text style={styles.footerTitle} >Đăng Xuất</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  drawerContent:{
     flexDirection:'column',
     
  },
  userInfoSection:{
    padding:20,
    flexDirection:'row',
    alignItems:'center'
  },
  infoView:{
   marginLeft:20,
   flexDirection:'column',
   justifyContent:'flex-start'
  },
  friendView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    borderBottomWidth:0.5,
    borderColor:"grey",
    paddingBottom:10,
  },
  friendSection:{
    marginLeft:30,
    padding:5,
    flexDirection:'row',
    justifyContent:'center'
  },
  friendSectionQuality:{
   marginRight:5,   
   fontSize:15,
   fontWeight:"bold"
  },
  friendSectionTitle:{
    fontSize:15,
    color:"grey",
    fontWeight:"bold"
  },

  userName: {
    fontSize: 19,
    fontWeight: '800',
    color:"#00008b"
  },
  userEmail:{
      color:"grey",
  },
  footer:{
    backgroundColor:"#edeeeb",
    height:50,
    padding:10,
    justifyContent:"flex-start",
   flexDirection:'row',
   alignItems:"center"     

  },
  logoutButton:{
    marginLeft:10,
  },
  footerTitle:{
      marginLeft:20,
      fontSize:17,
  }

});
export default DrawerContent;
