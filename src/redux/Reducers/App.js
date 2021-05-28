import Fire from '../../Database/Fire';

const initialState = {

    searchData: {

    },
    waitingFriendList: [

    ],
    friendList: [

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
                Fire.addFriend(action.userID);

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
            return state;

        case "DELETE_WAITING_FRIEND":
            return state;

        default:
            return state;
    }
}
export default appReducer;