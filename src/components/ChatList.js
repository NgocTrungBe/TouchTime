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
  TextInput,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
import moment from 'moment';
import database from '@react-native-firebase/database';
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
  const [chatData, setChatData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [keyWord, setKeyWord] = useState('');

  useEffect(() => {
    // getData();

    // if(props.appData.chatList){
    //   setState({data:props.appData.chatList,
    //         fullData:props.appData.chatList
    //   })
    // }

    const userID = Fire.getUid();
    Fire.getLastMess(userID, lastMessData => {
      setChatData(lastMessData);
      setFilterData(lastMessData);
    });
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
    }, 800);
  };
  const searchHandle = keyWord => {
    if (keyWord) {
      const formatQuery = keyWord.toLowerCase();
      const dataBackup = chatData;
      const data = dataBackup.filter(item =>
        item.user.userName.toLowerCase().match(formatQuery),
      );

      setFilterData(data);
      setKeyWord(keyWord);
    } else {
      setFilterData(chatData);
      setKeyWord(keyWord);
    }
  };

  return (
    <View>
      <View style={styles.listView}>
        <FlatList
          data={filterData.sort((user1,user2)=>{
             if(new Date(user1.timestamp) > new Date(user2.timestamp)){
               return -1;
             }
             if(new Date(user1.timestamp) < new Date(user2.timestamp)){
               return 1;
             }
             return 0;
          })}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={
            <View>
               <View style={styles.searchViewWrapper}>
               <View style={styles.searchView}>
                <TextInput
                  multiline={true}
                    blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  value={keyWord}
                  onChangeText={keyWord => searchHandle(keyWord)}
                  style={styles.textInput}
                  placeholder="..."></TextInput>
                <Feather
                  style={styles.searchButton}
                  name="search"
                ></Feather>
              </View>
               </View>
              
              <FriendListInHomeContainer navigation={props.navigation}></FriendListInHomeContainer>
              <View style={styles.messageTitle}>
                <Text style={styles.title}>Tin nhắn</Text>
              </View>
            </View>
          }
          bounces
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <ChatItem
                key={item.key}
                users={item}
                navigation={props.navigation}></ChatItem>
            );
          }}>
          >
        </FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    width: width,
    height: height / 1.25,
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
    fontSize: 17,
    width: width / 2,
    fontWeight: 'bold',
    color: '#300100',
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
    marginBottom: 15,
  },
  title: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
  },

  searchViewWrapper: {
    width:width,
    marginTop:height/35,
    alignItems:'center'
  },
  searchView: {
    width: width / 1.15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 10,
  },

  textInput: {
    marginLeft: 10,
    height: 45,
    width: '80%',
    fontSize: 19,
    color: '#0606',
  },
  searchButton: {
    width: '20%',
    marginRight: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default ChatList;
