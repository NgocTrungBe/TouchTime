import React, {Component, useState} from 'react';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import {connect} from 'react-redux';
import WaitingFriendList from '../../../components/WaitingFriendList';
import * as Actions from '../../Actions/AppActions'; 



class WaitingFriendListContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){    

    return (
        <WaitingFriendList {...this.props}></WaitingFriendList>
      );
   };
}
const mapStateToProps =(state) =>{
    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        GetWaitingFriend:()=>{
            dispatch(Actions.getWaitingFriendRequest());
        },
        AcceptFriend:(friendID,userName,email,avatar)=>{
               dispatch(Actions.acceptFriendRequest(friendID,userName,email,avatar));
        },
        DeleteFriend:(friendID)=>{
            dispatch(Actions.deleteWaitingFriendRequest(friendID));
     }

    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(WaitingFriendListContainer);
