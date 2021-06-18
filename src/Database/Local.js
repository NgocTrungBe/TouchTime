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