import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

  
class UpdateProfile extends React.Component {

    constructor({userName,userEmail,userAddress,userPhoneNumber,}) {
    super();
    this.state = {
      input: {
      Name:userName,
      email:userEmail,
      address:userAddress,
      phone_number:userPhoneNumber,
    },
      errors: {},
      isPasswordShown: false,
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
        input["Name"] = "";
        input["email"] = "";
        input["address"] = "";
        input["phone_number"] = "";
        this.setState({input:input});
        this.props.onAuth(this.state.input.Name,this.state.input.email,this.state.input.address,this.state.input.phone_number)
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
       if (!input["address"]) {
        isValid = false;
        errors["address"] = "This field is required.";
      }

        if (!input["phone_number"]) {
        isValid = false;
        errors["phone_number"] = "This field is required.";
      }
      }


      if(input["phone_number"].length < 11){
        isValid = false;
        errors["phone_number"] = "Please enter a valid number.";
      }
      
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
 
  render() {
      let errorMessage = null ;
      let SuccessMessage = null ;
      
      if(this.props.status){
        SuccessMessage=(
          <>Profile Updated successfully </>
          )
          window.location.reload();
        }
        
        if(this.props.error && !this.props.status){
            errorMessage=(
                <>This email already exists</>
            ) 
        }

    return (
      <div  style={{height:"60vh"}}>
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
                    type="email"
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
                {/*  Address  */}
                <div className="name">
                    <label htmlFor="addressID" className="form-label">
                    Address
                    </label>
                    <input
                    type="text"
                    className={`form-control ${
                        this.state.errors.address ? "border-danger" : ""
                    }`}
                    id="addressID"
                    aria-describedby="address"
                    value={this.state.input.address}
                    onChange={this.handleChange}
                    name="address"
                    />
                <div id="address" className="form-text text-danger">
                    {this.state.errors.address}
                </div>
                </div>
              {/*  Phone Number  */}
                <div className="email">
                    <label htmlFor="phone_numberID" className="form-label">
                    Phone Number
                    </label>
                    <input
                    type="number"
                    className={`form-control ${
                        this.state.errors.phone_number ? "border-danger" : ""
                    }`}
                    id="phone_numberID"
                    aria-describedby="phone_number"
                    value={this.state.input.phone_number}
                    onChange={this.handleChange}
                    name="phone_number"
                    />
                <div id="phone_number" className="form-text text-danger">
                    {this.state.errors.phone_number}
                </div>
                </div>   
                  <div className="createAccount">
                <button
                type="submit"
                value="Submit"
                className="text-uppercase"
                >
                Update
                </button>
                  <div id="password" className="text-danger" >
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
      userName:state.userName,
      userEmail:state.userEmail,
      userAddress:state.userAddress,
      userPhoneNumber:state.userPhoneNumber,
      error:state.errorUpdateProfile,
      status:state.UpdateProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAuth:(Name,email,address,phone_number) => dispatch(actions.updateUserProfile(Name,email,address,phone_number)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);