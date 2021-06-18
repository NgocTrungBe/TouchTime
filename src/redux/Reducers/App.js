import Fire from '../../Database/Fire';
import * as localDatabase from '../../Database/Local';

const initialState = {

    searchData: {

    },
    waitingFriendList: [

    ],
    friendList: [

    ],
    onlineFriendList: [

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
            return {
                ...state,
                searchData: {

                }
            }
        case "GET_WAITING_FRIEND":
            return {
                ...state,
                waitingFriendList: action.waitingFriendList
            }

        case "GET_ONLINE_FRIEND":

            return {
                ...state,
                onlineFriendList: action.onlineFriendList
            }

        case "GET_ALL_FRIEND":

            return {
                ...state,
                friendList: action.friendList
            }


        case "ACCEPT_FRIEND":
            return {...state };

        case "DELETE_WAITING_FRIEND":
            return state;




        default:
            return state;
    }
}
export default appReducer;