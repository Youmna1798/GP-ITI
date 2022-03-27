import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header , Divider , Menu  } from "semantic-ui-react/"
import ChangePassword from '../components/ChangePassword'
import OrdersHistory from '../components/OrdersHistory'
import ProfileDetails from '../components/ProfileDetails'
import UpdateProfile from '../components/UpdateProfile'

class Profile extends Component {
    state = {activeItem : "Profile"}
    handleItemClick = name => this.setState({activeItem:name})
  render() {
      const {activeItem} = this.state
    return (
      <Grid container columns={2} divided  className='mt-5 '>
          <Grid.Row>
            <Grid.Column width={6}>
                <Menu pointing vertical fluid>
                    <Menu.Item
                    name="Profile"
                    active={activeItem === "Profile"}
                    onClick={()=>this.handleItemClick("Profile")}
                    />
                      <Menu.Item
                    name="update profile"
                    active={activeItem === "update-profile"}
                     onClick={()=>this.handleItemClick("update-profile")}
                    />
                   <Menu.Item
                    name="change password"
                    active={activeItem === "change-password"}
                    onClick={()=>this.handleItemClick("change-password")}
                    />
                  <Menu.Item
                    name="Orders History"
                    active={activeItem === "orders-history"}
                     onClick={()=>this.handleItemClick("orders-history")}
                    />
                </Menu>
            </Grid.Column>
            
            <Grid.Column width={10}>
                <Header style={{textAlign:"center"}}>{`${activeItem === 'Profile' ? 'Profile' : activeItem === 'orders-history' ? 'Orders History': activeItem === 'update-profile' ? 'Update Profile' :'Change Password'  }`}</Header>
                <Divider/>
                {
                    activeItem === 'Profile' ? <ProfileDetails/>
                    : activeItem === 'orders-history' ? 
                    <OrdersHistory/>
                    : activeItem === 'update-profile' ?
                    <UpdateProfile/> : <ChangePassword/>

                }
            </Grid.Column>
          </Grid.Row>
      </Grid>
      
    )
  }
}

export default Profile