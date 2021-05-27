import React, {Component, useState} from 'react';
import {connect} from 'react-redux';

import * as Actions from '../../Actions/AuthActions'; 
import Login from '../../../screen/Login';


class LoginContainer extends Component {
    constructor(props){
        super(props);
    }
   
   render(){       
          
        
        
    return (
        <Login {...this.props}></Login>
      );
   };



}
const mapStateToProps =(state) =>{
    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        SignIn: (email,password) =>{
            dispatch(Actions.logInRequest(email,password));
        }
    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(LoginContainer);
