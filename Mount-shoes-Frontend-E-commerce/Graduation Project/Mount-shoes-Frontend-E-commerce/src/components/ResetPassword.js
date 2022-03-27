import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import IconButton from "@material-ui/core/IconButton";
import { Redirect } from 'react-router-dom';

  
class ResetPassword extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {token:"",password:""},
      errors: {},
      isPasswordShown: false,
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
handleClickShowPassword = () => {
    const {isPasswordShown} = this.state;
    this.setState({isPasswordShown: !isPasswordShown})

  }


  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    if(this.validate()){
        let input = {};
        input["token"] = "";
        input["password"] = "";
        this.setState({input:input});
        this.props.onAuth(this.state.input.token, this.state.input.password)
      } 
  } 

  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   

      if (!input["token"]) {
        isValid = false;
        errors["token"] = "This field is required.";
      }
  
       if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 8){
          isValid = false;
          errors["password"] = "Please add at least 8 charachter.";
          if (!input["password"]) {
            isValid = false;
            errors["password"] = "This field is required.";
          }
        }    
      }

      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
  const {isPasswordShown} = this.state
   let errorMessage = null ;
   let SuccessMessage = null ;
   let passwordErrorMessage = null;
      if(this.props.error && !this.props.errorRestPasswordMessage){
        errorMessage=( <>Incorrect token</> )
      }
      
     if(this.props.errorRestPasswordMessage && this.props.error){
        passwordErrorMessage=(<>{this.props.errorRestPasswordMessage}</> )
      }
    if(this.props.status ){
         SuccessMessage=( <>Password Changed Successfully </> )
     }
      
      if(!this.props.statusForgot){
         return <Redirect to="/forgotpassword"/>
      }
 return (
        <div style={{height:"70vh"}}>
            <div className="wrapper ">
                <div className="form-wrapper col-lg-3 col-sm-11">
                    <h2 className='text-center'>Reset Password</h2>
                    <h5 className='text-center'>Check your email for token</h5>
                    <form onSubmit={this.handleSubmit}>
                         {/* Token */}
                    <div className="email">
                        <label htmlFor="tokenID" className="form-label">
                           Token
                        </label>
                        <input 
                        type="text" 
                        name="token" 
                        value={this.state.input.token}
                        onChange={this.handleChange}
                        className={`form-control ${
                         this.state.errors.token  ? "border-danger" : ""
                              }`} 
                         id="tokenID" />
                        <div id="token"  className="form-text text-danger">{this.state.errors.token}</div>
                    </div>
                    {/* New Password */}
                     <div className="password">
                    <span className=" d-flex justify-content-between" >
                        <label htmlFor="passwordID" className="form-label">
                           New Password
                        </label>   
                        <IconButton  onClick={this.handleClickShowPassword} style={{ top:"90%" }}>
                            {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </span>
                        <input
                            type={isPasswordShown ? "text" : "password"}
                            className={`form-control 
                            ${this.state.errors.password ? "border-danger" : ""}`}
                            id="passwordID"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            name="password"
                        />
            <div id="password" className="form-text text-danger" >
              {this.state.errors.password}
            </div>
                      </div>
                    <div className="createAccount">
                    <button
                    type="submit"
                    value="Submit"
                    className="text-uppercase"
                    >
                    Confirm
                    </button>
                    <div  className=" text-danger" >
                 {errorMessage}  {passwordErrorMessage}
                  </div>
                <div  className="text-success">
                 {SuccessMessage}
                  </div>
                    </div> 
                    </form>
                    </div>
            </div>
        </div>
       );
    }
   }
  
const mapStateToProps = (state) => {
    return {
        error: state.errorRestPassword,
        errorRestPasswordMessage:state.errorRestPasswordMessage,
        status: state.RestPassword,
        statusForgot: state.ForgotPassword,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(token, password) => dispatch(actions.authRestPassword(token, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);