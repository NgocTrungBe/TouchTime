import React, {Component, useState} from 'react';
import {connect} from 'react-redux';


import Register from '../../../screen/Register';


class RegisterContainer extends Component {
    constructor(props){
        super(props);
    }
   render(){
         const {SignUp} = this.props;
    return (
        <Register navigation={this.props.navigation} SignUp={SignUp}></Register>
      );
   };



}
const mapStateToProps =(state) =>{

    return state;
 }

const mapDisPatchToProps = (dispatch,props) =>{
    return {
        SignUp: (email,password) =>{
            dispatch(Actions.signUp(email,password));
        }
    }
}


export default connect(null,mapDisPatchToProps)(RegisterContainer);
