import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Table } from "react-bootstrap";


  
class ProfileDetails extends React.Component {
   componentDidMount(){
    this.props.onTryLoadUserProfile();
  }
  
  render() {
    return (
      <div  style={{height:"60vh"}}>
          {/*  Name  */}
        <Table  bordered hover>
          
          <tbody>
          <tr>
            <th>
            Name
            </th>
            <td>{this.props.userName}</td>
        </tr>
            {/* Email   */}
          <tr>
            <th >
            Email
            </th>
            <td>{this.props.userEmail}</td>
      

          </tr>
        
        {/*  Address  */}
        <tr>
            <th>
            Address
            </th>
            <td>{this.props.userAddress}</td>
        </tr>
        {/*  Phone Number  */}
        <tr>
            <th>
            Phone Number
            </th>
            <td>{this.props.userPhoneNumber}</td>
        </tr>    
        </tbody>     
        </Table>  
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
      status:state.UpdateProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onTryLoadUserProfile:() => dispatch(actions.loadUserProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);