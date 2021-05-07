import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-elements';
import Fire from '../Database/Fire';
const {width, height} = Dimensions.get('window');
const DrawerContent = (props) => {
  return (
    <View style={styles.wrapper}>
      <DrawerContentScrollView {...props}>
         <View style={styles.drawerContent}>
             <View style={styles.userInfoSection}>
                    <Avatar rounded size={50} 
                    source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFQeseq2guBGnpDrqpEimc1ywo6y5737Hmdg&usqp=CAU"}}>

                    </Avatar>
                    <View style={styles.infoView}>
                    <Text style={styles.userName}>LyLy</Text>
                    <Text style={styles.userEmail}>ngoctrung@gmail.com</Text>
                    </View>
             </View>
             <View style={styles.friendView}>
                   <View style={styles.friendSection}>
                       <Text style={styles.friendSectionQuality}>1</Text>
                       <Text style={styles.friendSectionTitle}>Bạn bè</Text>
                   </View>
                   <View style={styles.friendSection}>
                       <Text style={styles.friendSectionQuality}>2</Text>
                       <Text style={styles.friendSectionTitle}>Đang chờ</Text>
                   </View>
             </View>
         </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
      <Feather
          style={styles.logoutButton}
          name="log-out"
          size={23}
          onPress={() => {
             Fire.signOut();
          }}></Feather>
       <Text style={styles.footerTitle} >Đăng Xuất</Text>
      </View>
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
    color: 'grey',
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
