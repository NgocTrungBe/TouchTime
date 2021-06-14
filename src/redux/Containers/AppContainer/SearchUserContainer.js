import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import SearchFriend from '../../../screen/SearchFriend';
import * as Actions from '../../Actions/AppActions'; 



class SearchUserContainer extends Component {
    constructor(props){
        super(props);
    }

    
   render(){       
    
    return (
        <SearchFriend {...this.props}></SearchFriend>
      );
   };



}
const mapStateToProps =(state) =>{
    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        SearchUser: (email) =>{
            dispatch(Actions.searchUserRequest(email));
        },
        AddFriend:(userID,userName,email,avatar)=>{
            dispatch(Actions.addFriend(userID,userName,email,avatar));;
        }

    }
}


 export default connect(mapStateToProps,mapDisPatchToProps)(SearchUserContainer);
