import React, {Component, useLayoutEffect, useState} from 'react';
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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import {FlatList} from 'react-native-gesture-handler';
import Fire from '../Database/Fire';
import {Alert} from 'react-native';
import {result} from 'lodash';

const {width, height} = Dimensions.get('window');

const FriendProfile = ({route, navigation}) => {
  const {friend} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [friendQuality, setFriendQuality] = useState(0);
  const [waitingQuality, setWaitingQuality] = useState(0);

  useLayoutEffect(() => {
    const unsubscribe = Fire.getFriendQuality(friend.data.friendID).then(
      result => {
        setFriendQuality(result.friendQuality);
        setWaitingQuality(result.waitingQuality);
      },
    );

    return () => {
      unsubscribe;
    };
  }, [friend.data.friendID]);
  const showAlert = () => {
    return Alert.alert('!!!', 'Bạn có muốn đăng xuất không?', [
      {
        text: 'Không',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => Fire.signOut(),
      },
    ]);
  };

  const showModal = () => {
    setModalVisible(true);
  };
  const deleteFriend = () => {
    const userID = Fire.getUid();
    Fire.getUserKeyInFriend(userID, friend.data.friendID).then(userKey => {
      Fire.deleteUserInFriend(userKey, friend.data.friendID);
    });
    Fire.deleteFriendInUser(friend.key, userID).then(result => {
      if (result == true) {
        navigation.pop();
      }
    });
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.avatarView}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={{
                uri: 'data:image/png;base64,' + friend.data.avatar,
              }}></Image>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.userName}>{friend.data.userName}</Text>
          </View>
          <View style={styles.headerButtonView}>
            <TouchableOpacity style={styles.headerButton} onPress={showModal}>
              <View style={styles.headerButtonWrapper}>
                <MaterialIcon
                  style={{fontSize: 20, color: '#0e92d0'}}
                  name="person"></MaterialIcon>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#0e92d0',
                  }}>
                  Bạn bè
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() =>
                navigation.navigate('ChatContainer', {
                  friendUserName: friend.data.userName,
                  friendAvatar: 'data:image/png;base64,' + friend.data.avatar,
                  friendID: friend.data.friendID,
                })
              }>
              <View style={styles.headerButtonWrapper}>
                <MaterialIcon
                  style={{fontSize: 20, color: '#0e92d0'}}
                  name="email"></MaterialIcon>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#0e92d0',
                  }}>
                  Nhắn tin
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.contact}>
            <View style={styles.friendView}>
              <View style={styles.friendQualityView}>
                <MaterialIcon
                  style={{fontSize: 25, color: 'darkgreen'}}
                  name="people"></MaterialIcon>
                <Text style={styles.quality}>{friendQuality}</Text>
              </View>
              <View style={styles.waitingQualityView}>
                <MaterialIcon
                  style={{fontSize: 25, color: 'red'}}
                  name="group-add"></MaterialIcon>
                <Text style={styles.quality}>{waitingQuality}</Text>
              </View>
            </View>

            <View style={styles.item}>
              <MaterialIcon style={styles.icon} name="email"></MaterialIcon>
              <Text style={styles.title}>{friend.data.email}</Text>
            </View>
            <View style={styles.item}>
              <TouchableOpacity style={styles.button} onPress={showAlert}>
                <View style={styles.buttonView}>
                  <MaterialIcon
                    style={styles.icon}
                    name="logout"></MaterialIcon>
                  <Text style={styles.title}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.item}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.pop();
                }}>
                <View style={styles.buttonView}>
                  <Feather style={styles.icon} name="chevron-left"></Feather>
                  <Text style={styles.title}>Trở lại</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </View>
      </ScrollView>

      {modalVisible ? (
        <Animatable.View
          animation="fadeInUpBig"
          duration={500}
          style={styles.bottomModal}>
          <TouchableOpacity
            style={styles.bottomModalButton}
            onPress={deleteFriend}>
            <MaterialIcon
              style={{fontSize: 23, color: 'grey'}}
              name="person"></MaterialIcon>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 17,
                fontWeight: 'bold',
                color: '#060606',
              }}>
              Hủy kết bạn
            </Text>
          </TouchableOpacity>
          <Feather
            style={styles.closeModalButton}
            name="x"
            onPress={() => {
              setModalVisible(false);
            }}></Feather>
        </Animatable.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottomModal: {
    position: 'relative',
    width: width,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomModalButton: {
    flexDirection: 'row',
    width: '80%',
  },
  closeModalButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#040404',
    fontSize: 25,
  },
  avatarView: {
    padding: 20,
    height: height / 3,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 100,
    height: 100,
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
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  friendView: {
    marginTop: 10,
    flexDirection: 'row',
    width: width,
    height: height / 10,
    backgroundColor: '#f8f9fd',
    elevation: 1,
  },

  friendQualityView: {
    padding: 5,
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f9fd',
    borderRightWidth: 1.2,
    borderStyle: 'solid',
    borderEndColor: '#e6e6e6',
  },
  waitingQualityView: {
    padding: 5,
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f9fd',
  },
  quality: {
    fontSize: 16,
    color: '#76777c',
    fontWeight: 'bold',
  },
  userName: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#060021',
  },
  contact: {
    width: width,
    height: height / 1.8,
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    paddingHorizontal: 20,
    width: width,
    height: height / 10,
    backgroundColor: '#f8f9fd',
    elevation: 1,
  },
  icon: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'red',
  },
  title: {
    paddingLeft: 15,
    color: '#060622',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    height: height / 10,

    backgroundColor: '#f8f9fd',
  },
  button: {
    width: width,
    backgroundColor: '#f8f9fd',
  },
  headerButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
    height: height / 10,
    backgroundColor: '#ffffff',
  },
  headerButton: {
    margin: 7,
    width: '30%',
    height: height / 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 20,
    elevation: 2,
  },
  headerButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: height / 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
});

export default FriendProfile;
