import React, {Component, useState} from 'react';
import {connect} from 'react-redux';

import * as Actions from '../../Actions/AuthActions'; 
import Login from '../../../screen/Login';


class LoginContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){
         const {SignIn} = this.props;
    return (
        <Login navigation={this.props.navigation} SignIn={SignIn}></Login>
      );
   };



}
const mapStateToProps =(state) =>{

    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        SignIn: (email,password) =>{
            dispatch(Actions.logIn(email,password));
        }
    }
}


export default connect(null,mapDisPatchToProps)(LoginContainer);
