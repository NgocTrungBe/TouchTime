import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import FriendListInHome from '../../../components/FriendListInHome';
import * as Actions from '../../Actions/AppActions'; 



class FriendListInHomeContainer extends Component {

    
    constructor(props){
        super(props);
    }
   render(){    
    return (
        <FriendListInHome {...this.props}></FriendListInHome>
      );
   };
}
const mapStateToProps =(state) =>{
    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        GetFriend:()=>{
            dispatch(Actions.getFriendRequest());
        }

    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(FriendListInHomeContainer);
