import Fire from '../../Database/Fire';

const initialState = {

    searchData: {

    }
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
        default:
            return state;
    }
}
export default appReducer;