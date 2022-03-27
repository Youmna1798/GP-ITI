import React from 'react';
import { connect } from 'react-redux';
import { Redirect ,Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
  
class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {email:""},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({input:input});
       this.props.onAuth(this.state.input.email)
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
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    let errorMessage = null ;
    let SuccessMessage = null ;
    if(this.props.error){
      errorMessage=(
        <>We couldn't find an account associated with that email. Please try a different e-mail address</>
        )
        window.location.reload()
      }
      if(this.props.status ){
            SuccessMessage=(
            <><Link to='/resetpassword' style={{textDecoration:"none"}} className='text-success'>Click here to reset password </Link> </>
            )
            // window.location.reload()
        } 
    if(this.props.isAuthenticated ){
        return <Redirect to ="/"/>     
      }
    
    return (
        <div style={{height:"70vh"}}>
            <div className="wrapper ">
                <div className="form-wrapper col-lg-3 col-sm-5">
                    <h2 className='text-center mb-5'>Forgot Password</h2>
                    <form onSubmit={this.handleSubmit}>
                         {/* Email */}
                    <div className="email">
                        <input 
                        type="text" 
                        name="email" 
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        placeholder="Enter Your Email"
                        className={`form-control ${
                         this.state.errors.email  ? "border-danger" : ""
                              }`} 
                         id="emailID" />
                    <div id="email"  className="form-text text-danger">{this.state.errors.email}</div>
                    </div>
                    <div className="createAccount">
                    <button
                    type="submit"
                    value="Submit"
                    className="text-uppercase"
                    >
                    Continue
                    </button>
                    <div  className=" text-danger" >
                 {errorMessage}
                  </div>
                    <div  className=" text-danger" >
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
        error: state.errorForgotPassword,
        status: state.ForgotPassword,
        isAuthenticated:state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email) => dispatch(actions.authForgotPassword(email)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);