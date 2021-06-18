import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import Chat from '../../../screen/Chat';
import * as Actions from '../../Actions/ChatActions '; 



class ChatContainer extends Component {
    constructor(props){
        super(props);
    }

    render(){    
      
    return (
        <Chat {...this.props}></Chat>
      );
   };
}
const mapStateToProps =(state) =>{
    return {
        messages : state.chatData.messages,
        roomKey: state.chatData.roomKey,
        loading:state.chatData.loading
    };
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        findRoomByUser:(friendID)=>{
            dispatch(Actions.findRoomByUser(friendID));
        },
        sendMessage:(messages, friendID, userData, friendData, roomKey) =>{
              dispatch(Actions.sendMessage(messages, friendID, userData, friendData, roomKey))
        },
        clearData:()=>{
            dispatch(Actions.clearData());
        }

    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(ChatContainer);
