import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveUid = async(uid) => {

    try {
        await AsyncStorage.setItem("uid", uid);
    } catch (error) {
        return error;
    }

}

export const getUid = async() => {
    try {
        const uid = await AsyncStorage.getItem("uid");
        return uid;
    } catch (error) {
        return error;
    }
}

export const updateUid = async(uid) => {
    try {
        await AsyncStorage.setItem("uid", uid);
    } catch (error) {
        return error;
    }
}

// export const saveChatData = async(uid, chatData) => {
//     try {
//         console.log(chatData);
//         // const localChatData = { uid: uid, chatData: chatData };
//         await db.collection("chatData").add({ uid: uid, chatData: "hhh" });

//     } catch (error) {
//         return error;
//     }
// }
// export const getChatData = async() => {
//     try {

//         const chatData = await db.collection("chatData");
//         return chatData;

//     } catch (error) {
//         return error;
//     }
// }

export const saveFriendData = async(uid, friendData) => {
    try {

        console.log("được gọi 2")
        const localFriendData = { uid: uid, friendData: friendData };
        await AsyncStorage.setItem("friendActiveData", JSON.stringify(localFriendData));

    } catch (error) {
        return error;
    }
}
export const getFriendData = async() => {
    try {

        const friendData = await AsyncStorage.getItem("friendActiveData");
        return friendData;

    } catch (error) {
        return error;
    }
}