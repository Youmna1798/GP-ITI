import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import IconButton from "@material-ui/core/IconButton";
import { Link , Redirect} from "react-router-dom";
import './forms.css'
import { Divider } from 'semantic-ui-react';

  
class LogIn extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {email:"",password:""},
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
        input["email"] = "";
        input["password"] = "";
        this.setState({input:input});
       this.props.onAuth(this.state.input.email, this.state.input.password)
      }
    
  } 

  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   

      if (!input["email"]) {
        isValid = false;
        errors["email"] = "This field is required.";
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "This field is required.";
      }
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    const {isPasswordShown} = this.state
   let errorMessage = null ;
      if(this.props.error){
        errorMessage=(
          <>Incorrect email or password</>
          )
      }
      if(!this.props.error && this.props.isAuthenticated){
      return  <Redirect to="/profile"/>
      }
    return (
        <div  style={{height:"70vh"}}>
            <div className="wrapper">
                <div className="form-wrapper col-lg-3 col-sm-6">
                    <h2 className='text-center'>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                         {/* Email */}
                    <div className="email">
                        <label htmlFor="emailID" className="form-label">
                           Email
                        </label>
                        <input 
                        type="text" 
                        name="email" 
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        className={`form-control ${
                         this.state.errors.email  ? "border-danger" : ""
                              }`} 
                         id="emailID" />
                        <div id="email"  className="form-text text-danger">{this.state.errors.email}</div>
                    </div>
                    {/* Password */}
                     <div className="password">
                    <span className=" d-flex justify-content-between" >
                        <label htmlFor="passwordID" className="form-label">
                            Password
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
                    sign in
                    </button>
                    <div  className=" text-danger" >
                 {errorMessage}
                  </div>
                    <Link className="link" to={"/forgotpassword"}><small>Forgot your password?</small></Link> 
                     <div style={{fontWeight:"bold"}}>OR</div>
                    <Link className="link" to={"/signup"}><small>Create New Account</small></Link> 
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
        error: state.errorLogin,
        isAuthenticated:state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email, password) => dispatch(actions.authLogin(email, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);