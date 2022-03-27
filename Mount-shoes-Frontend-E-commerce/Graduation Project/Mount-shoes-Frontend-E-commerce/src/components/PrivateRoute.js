import React from 'react'
import { Route , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component , isAuthenticated, ...rest}) => {
  return (
    <Route {...rest}
    render={props =>{
        if(isAuthenticated){
            return <Component {...props}/>
        }else{
            return <Redirect to="/login"/>
        }
    }}
   />
  )
}

const mapStateToProps = () => {
    const token =localStorage.getItem('token')
    return {
        isAuthenticated:token,
    }
}

export default connect(mapStateToProps)(PrivateRoute);