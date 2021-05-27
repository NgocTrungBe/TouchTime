import React, {Component, useState} from 'react';
import {connect} from 'react-redux';

import * as Actions from '../../Actions/AuthActions'; 
import Login from '../../../screen/Login';
import UpdateUserScreen from '../../../screen/UpdateUser';


class UpdateUserContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){
         const {UpdateUser} = this.props;
    return (
        <UpdateUserScreen navigation={this.props.navigation} UpdateUser={UpdateUser}></UpdateUserScreen>
      );
   };



}
const mapStateToProps =(state) =>{

    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        UpdateUser: (userName,avatar) =>{
            dispatch(Actions.updateUser(userName,avatar));
        }
    }
}


export default connect(null,mapDisPatchToProps)(UpdateUserContainer);
