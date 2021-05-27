import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../Actions/AuthActions'; 
import Register from '../../../screen/Register';


class RegisterContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){
    
         const {SignUp,auth} = this.props;
    return (
        <Register signUpData ={auth.signUpData} navigation={this.props.navigation} SignUp={SignUp}></Register>
      );
   };



}
const mapStateToProps =(state) =>{

    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        SignUp: (email,password) =>{
            dispatch(Actions.signUpRequest(email,password));
        }
    }
}


export default connect(mapStateToProps,mapDisPatchToProps)(RegisterContainer);
