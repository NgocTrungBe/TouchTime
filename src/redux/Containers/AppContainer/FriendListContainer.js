import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import FriendList from '../../../components/FriendList';
import * as Actions from '../../Actions/AppActions'; 



class FriendListContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){    

    return (
        <FriendList {...this.props}></FriendList>
      );
   };
}
const mapStateToProps =(state) =>{
    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        getAllFriend:()=>{
            dispatch(Actions.getAllFriend());
        }

    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(FriendListContainer);
