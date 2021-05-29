import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import ChatList from '../../../components/ChatList';
import * as Actions from '../../Actions/AppActions'; 



class ChatListContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){    
    return (
        <ChatList {...this.props}></ChatList>
      );
   };
}
const mapStateToProps =(state) =>{
    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        GetChatList:(userID)=>{
            dispatch(Actions.getChatListRequest(userID));
        }

    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(ChatListContainer);
