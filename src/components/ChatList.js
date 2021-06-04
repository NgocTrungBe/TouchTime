import React, {Component, useEffect} from 'react';
import {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
import moment from 'moment';
import database from '@react-native-firebase/database';
import {canInstrument} from 'babel-jest';
import {set} from 'react-native-reanimated';
import {Image} from 'react-native';
import FriendListInHomeContainer from '../redux/Containers/AppContainer/FriendListInHomeContainer ';

const {width, height} = Dimensions.get('window');

const ChatItem = ({users, navigation}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        key={users.user.id}
        onPress={() =>
          navigation.navigate('Chat', {
            friendUserName: users.user.userName,
            friendAvatar: 'data:image/png;base64,' + users.user.photoURL,
            friendID: users.user.id,
          })
        }>
        <View style={styles.wrapper}>
          <Image
            resizeMode="cover"
            style={styles.avatar}
            source={{
              uri: 'data:image/png;base64,' + users.user.photoURL,
            }}></Image>
          <View style={styles.content}>
            <Text style={styles.userName}>{users.user.userName}</Text>
            <Text style={styles.lastMess}>
              {users.user.userName.includes(users.sender)
                ? users.sender.slice(users.sender.lastIndexOf(' ')) +
                  ':' +
                  ' ' +
                  users.text
                : 'Bạn:' + ' ' + users.text}
            </Text>
          </View>
          <Text style={styles.time}>
            {moment(new Date(users.timestamp)).format('d/M').toString()}
          </Text>
          <View style={styles.dot}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ChatList = props => {
  const [users, setUsers] = useState([]);
  const [lastMessage, setLastMessage] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const userID = Fire.getUid();
    props.GetChatList(userID);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 1000);
  };
  const renderHeader = () => {
    return (
      <View>
        <FriendListInHomeContainer></FriendListInHomeContainer>
        <View style={styles.messageTitle}>
          <Text style={styles.title}>Tin nhắn</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.listView}>
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={[{data: props.appData.chatList}]}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderHeader}
          bounces={true}
          pagingEnabled={false}
          renderItem={({item}) => {
            return (
              <ChatItem
                key={item.key}
                users={item}
                navigation={props.navigation}></ChatItem>
            );
          }}>
          >
        </SectionList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    width: width,
    height: height / 1.27,
  },

  item: {
    marginLeft: width / 18,
    width: width / 1.1,
    marginTop: 5,
    backgroundColor: '#FFFFFF',

    marginBottom: 5,
    borderRadius: 15,
    elevation: 4,
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 15,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    width: width / 2,
    fontWeight: '500',
    color: '#191970',
  },
  lastMess: {
    marginLeft: 20,
    fontSize: 15,
    color: 'grey',
  },
  time: {
    width: width / 8,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 15,
    color: '#0606',
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ffffff',
    top: 56,
    left: 53,
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  messageTitle: {
    height: 30,
    marginLeft: 20,
    marginBottom: 20,
  },
  title: {
    color: '#000000',
    fontSize: 23,
    fontWeight: 'bold',
  },
});

export default ChatList;
