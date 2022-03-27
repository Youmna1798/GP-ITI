import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import IconButton from "@material-ui/core/IconButton";

  
class ChangePassword extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {old_password:"",new_password:""},
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
        input["old_password"] = "";
        input["new_password"] = "";
        this.setState({input:input});
        this.props.onAuth(this.state.input.old_password, this.state.input.new_password)
      }
    
  } 
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   

      if (!input["old_password"]) {
        isValid = false;
        errors["old_password"] = "This field is required.";
      }
  
       if (typeof input["new_password"] !== "undefined") {
        if(input["new_password"].length < 8){
          isValid = false;
          errors["new_password"] = "Please add at least 8 charachter.";
          if (!input["new_password"]) {
            isValid = false;
            errors["new_password"] = "This field is required.";
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
      if(this.props.error){
        errorMessage=(
          <>Incorrect old password</>
          )
      }
      if(this.props.status && !this.props.error){
        SuccessMessage=(
              <>Password Changed Successfully</>   
          )
     }
    return (
        <div  style={{height:"60vh"}}>
              <form onSubmit={this.handleSubmit}>
                    {/* oldpassword */}
              <div className="email">
              <span className=" d-flex justify-content-between" >
                  <label htmlFor="old_passwordID" className="form-label">
                      Old Password
                  </label>   
                  <IconButton  onClick={this.handleClickShowPassword} style={{ top:"90%" }}>
                      {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  </span>
                  <input 
                  type={isPasswordShown ? "text" : "password"} 
                  name="old_password" 
                  value={this.state.input.old_password}
                  onChange={this.handleChange}
                  className={`form-control ${
                    this.state.errors.old_password  ? "border-danger" : ""
                        }`} 
                    id="old_passwordID" />
                  <div id="old_password"  className="form-text text-danger">{this.state.errors.old_password}</div>
              </div>
              {/* New Password */}
                <div className="password">
              <span className=" d-flex justify-content-between" >
                  <label htmlFor="new_passwordID" className="form-label">
                      New Password
                  </label>   
                  <IconButton  onClick={this.handleClickShowPassword} style={{ top:"90%" }}>
                      {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  </span>
                  <input
                      type={isPasswordShown ? "text" : "password"}
                      className={`form-control 
                      ${this.state.errors.new_password ? "border-danger" : ""}`}
                      id="new_passwordID"
                      value={this.state.input.new_password}
                      onChange={this.handleChange}
                      name="new_password"
                  />
                <div id="new_password" className="form-text text-danger" >
                  {this.state.errors.new_password}
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
            {errorMessage}
            </div>
              <h3 id="password" className="text-success" >
              {SuccessMessage}
              </h3>
              </div> 
              </form>
        </div>
       );
    }
   }
  
const mapStateToProps = (state) => {
    return {
        error: state.errorChangePassword,
        status: state.ChangePassword,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(old_password, new_password) => dispatch(actions.authChangePassword(old_password, new_password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);