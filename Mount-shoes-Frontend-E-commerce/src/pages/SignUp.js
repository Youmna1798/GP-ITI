import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import IconButton from "@material-ui/core/IconButton";
import { Link ,Redirect} from "react-router-dom";
  
class SignUp extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {Name:"",email:"",password:"",password2:""},
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
        input["Name"] = "";
        input["email"] = "";
        input["password"] = "";
        input["password2"] = "";
        this.setState({input:input});
       this.props.onAuth(this.state.input.Name,this.state.input.email,this.state.input.password,this.state.input.password2)
      }
    
  }

  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;

      if (!input["Name"]) {
        isValid = false;
        errors["Name"] = "This field is required.";
      }
      
      if (typeof input["email"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter a valid email.";
          if (!input["email"]) {
            isValid = false;
            errors["email"] = "This field is required.";
          }
        }
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

      if (typeof input["password2"] !== "undefined" && typeof input["password2"] !== "undefined") {
        if (input["password"] !== input["password2"]) {
          isValid = false;
          errors["password2"] = "Passwords don't match.";
        }
        if (!input["password2"]) {
          isValid = false;
          errors["password2"] = "This field is required.";
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
              <>This email already exists</>
          )
      }
      
    if(this.props.email ){
        SuccessMessage=(
              <>Registered Successfully <Link style={{color:"#bba14f",textDecoration:"none"}} to="/login">Login</Link></>
              
          )
     }

     if(this.props.isAuthenticated ){
        return <Redirect to="/"/>
     }

    return (
      <>
               <div>
                <h3 className='text-center m-5 text-success'>{SuccessMessage}</h3>
               </div>
           <div className="wrapper ">
             <div className="form-wrapper col-lg-3 col-sm-11">
                    <h2 className='text-center'>Create Account</h2>
                <form onSubmit={this.handleSubmit}>
                     {/*  Name  */}
                    <div className="name">
                        <label htmlFor="NameID" className="form-label">
                        Name
                        </label>
                        <input
                        type="text"
                        className={`form-control ${
                            this.state.errors.Name ? "border-danger" : ""
                        }`}
                        id="NameID"
                        aria-describedby="name"
                         value={this.state.input.Name}
                        onChange={this.handleChange}
                        name="Name"
                        />
                    <div id="Name" className="form-text text-danger">
                        {this.state.errors.Name}
                    </div>
                    </div>
                     {/* Email   */}
                    <div className="email">
                        <label htmlFor="emailID" className="form-label">
                        Email
                        </label>
                        <input
                        type="text"
                        className={`form-control ${
                            this.state.errors.email ? "border-danger" : ""
                        }`}
                        id="emailID"
                        aria-describedby="email"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        name="email"
                        />
                    <div id="email" className="form-text text-danger">
                        {this.state.errors.email}
                    </div>
                    </div>   
                       {/* Password  */}
                    <div className="password">
                    <div className=" d-flex justify-content-between" >
                        <label htmlFor="passwordID" className="form-label">
                            Password
                        </label>
                        <IconButton  onClick={this.handleClickShowPassword} style={{ top:"90%" }}>
                            {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </div>
                        <input
                            type={isPasswordShown ? "text" : "password"}
                            className={`form-control ${
                            this.state.errors.password ? "border-danger" : ""
                            }`}
                            id="passwordID"
                            aria-describedby="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            name="password"
                        />
                        <div id="password" className="form-text text-danger" >
                        {this.state.errors.password}
                        </div>
                    </div>
                        {/* Confirm Password  */}
                        <div className="password">
                        <div className=" d-flex justify-content-between" >
                            <label htmlFor="password2" className="form-label">
                            Confirm Password
                            </label>
                            <IconButton  onClick={this.handleClickShowPassword} style={{ top:"90%" }}>
                                {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </div>
                            <input
                                type={isPasswordShown ? "text" : "password"}
                                className={`form-control ${
                                this.state.errors.password2 ? "border-danger" : ""
                                }`}
                                id="password2"
                                aria-describedby="confirmpassword"
                                 value={this.state.input.password2}
                                 onChange={this.handleChange}
                                name="password2" 
                            />
                            <div id="confirmpassword" className="form-text text-danger" >
                            {this.state.errors.password2}
                            </div>
                        </div> 
                      <div className="createAccount">
                    <button
                    type="submit"
                    value="Submit"
                    className="text-uppercase"
                    >
                    sign up
                    </button>
                     <div id="password" className="text-danger" >
                   {errorMessage}
                   </div>
                    <Link className="link" to={"/Login"}><small>Already Have an Account?</small></Link> 
                    </div> 
                </form>
             </div>
           </div>
          
      </>
    );
  }
}
  
const mapStateToProps = (state) => {
    return {
        error:state.errorSignup,
        email:state.email,
        isAuthenticated:state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(Name, email,password,password2) => dispatch(actions.authSignup(Name, email,password,password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);