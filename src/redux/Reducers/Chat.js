import Fire from '../../Database/Fire';
import * as localDatabase from '../../Database/Local';

const initialState = {

    searchData: {

    },
    waitingFriendList: [

    ],
    friendList: [

    ],
    chatList: [

    ]
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SEARCH_USER":
            const searchState = {...state,
                searchData: action.user
            }
            return searchState;
        case "ADD_FRIEND":
            if (action.userID != '') {
                Fire.addFriend(action.userID, action.userName, action.email, action.avatar);
                return {
                    ...state,
                    searchData: {

                    }
                }
            }
        case "GET_WAITING_FRIEND":
            return {
                ...state,
                waitingFriendList: action.waitingFriendList
            }

        case "GET_FRIEND":

            return {
                ...state,
                friendList: action.friendList
            }



        case "ACCEPT_FRIEND":
            return {...state };

        case "DELETE_WAITING_FRIEND":
            return state;

        case "GET_CHAT_LIST":

            return {
                ...state,
                chatList: action.chatList
            }
        case "SET_TABS_VISIBLE":

            return {
                ...state,
                visible: !action.isOpenDrawer
            }

        default:
            return state;
    }
}
export default appReducer;