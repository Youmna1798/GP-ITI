import React ,{Component} from 'react';
import './App.css';
import{BrowserRouter ,Switch, Route } from "react-router-dom"
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ResetPassword from './components/ResetPassword';
import AllProducts from "./components/AllProducts";
import NewArrivals from './components/NewArrivals';
import BestSelling from './components/BestSelling';
import Home from './pages/Home';
import Cart from "./components/Cart";
import NavbarMain from './components/NavbarMain';
import Wishlist from './pages/WishList'
import Checkout from './pages/Checkout';
import ForgotPassword from './components/ForgotPassword';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth'
import PrivateRoute from './components/PrivateRoute';
import SingleProductPage from './pages/SingleProductPage'
import Profile from './pages/Profile';
import NotFound from './components/NotFound';
import NavbarSec from './components/NavbarSec';
import Footer from './components/Footer';


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    return (
      <BrowserRouter>
      <NavbarMain {...this.props}/>
      <NavbarSec/>
          <div >
          <Switch>
             <Route exact path="/"  component={props => <Home {...props} />}/>
             <Route exact path="/Login"   component={props => <LogIn {...props} />}/> 
             <Route exact path="/SignUp" component={props => <SignUp {...props} />}/> 
             <Route exact path="/allproducts/page=:page"  component={props => <AllProducts {...props} />}/>
             <Route exact path="/bestselling/page=:page"  component={props => <BestSelling {...props} />}/>
             <Route exact path="/newarrivals/page=:page"  component={props => <NewArrivals {...props} />}/>
             <PrivateRoute exact path="/cart"  component={props => <Cart {...props} />}/>
             <Route exact path="/wishlist"  component={props => <Wishlist {...props} />}/>
             <Route exact path="/forgotpassword"  component={props => <ForgotPassword {...props} />}/>
             <Route exact path="/resetPassword" component={props => <ResetPassword {...props} />}/> 
             <PrivateRoute exact path="/profile"   component={props => <Profile {...props} />}/> 
             <Route exact path="/product/:id"  component={props => <SingleProductPage {...props} />}/>
             <PrivateRoute exact path="/checkout"  component={Checkout}/>
             <Route exact path="*" component={props => <NotFound {...props} />}/>
          </Switch>
          <Footer/>
          </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated:state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup:() => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);