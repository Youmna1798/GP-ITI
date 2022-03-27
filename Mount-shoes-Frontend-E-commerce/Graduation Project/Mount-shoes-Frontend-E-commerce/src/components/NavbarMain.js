import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import $ from "jquery";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { ShoppingCart, Delete, FavoriteBorder , Favorite } from "@material-ui/icons";
import { useCartContext } from "../context/cart_context";
import { useWishlistContext } from "../context/wishList_context";



function handleClick() {
  $(this).attr("class", "active");
}

const NavbarMain = ({ isAuthenticated, logout }) => {
  const { cart,removeItem } =
    useCartContext();

  const { wishlist, removeWishListItem } =
    useWishlistContext();

const handlelogout = (e) => {   
    window.location.reload()
  };

  return (
    <>
      <nav className="navbar fixed-top" >
        <div className="navbar-container containerNav">
          <input type="checkbox" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <h2 className="logo">
            <Link to="/">MS</Link>
          </h2>
          <ul className="menu-items">
            <li onClick={handleClick}>
              <NavLink exact to="/">
               {" "}
                Home
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li onClick={handleClick}>
                  <NavLink exact to="/profile">
                Account
                  </NavLink>
                </li>
                <li onClick={logout}>
                  <button type="button" onClick={handlelogout}>Logout</button>
                </li>
            
              </>
            ) : (
              <>
                <li onClick={handleClick}>
                  <NavLink exact to="/login">
                    Login
                  </NavLink>
                </li>
                <li onClick={handleClick}>
                  <NavLink exact to="/signup">
                    Signup
                  </NavLink>
                </li>
              </>
            )}
                
                <li onClick={handleClick} className="dropdown">
                  <button
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  {  wishlist.length === 0 ?
                  <FavoriteBorder />  :  <Favorite />   }
                    <small>{wishlist.length}</small>
                  </button>
                  <ul
                    className="dropdown-menu"
                    style={{width:"25em"}}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {wishlist.length > 0 ? (
                      <>
                        {wishlist.map((prod) => (
                          <span className="cartitem d-flex align-items-center" key={prod.id}>
                            <img
                              src={prod.image}
                              className="cartItemImg"
                              alt={prod.name}
                              width= '80em'
                            />
                            <div className="cartItemDetail">
                              <span className="me-3">Color: {prod.color}</span>
                              <span className="me-3">Size: {prod.size}</span>
                              <span className="me-3">Price: {prod.price}EGP</span>
                            </div>
                            <Delete
                              className="deleteIcon"
                              onClick={() => removeWishListItem(prod.id)}
                            />
                          </span>
                        ))}
                        <Link to="/wishlist" className="d-flex justify-content-center btn">
                          <Button
                            className="buttonStyle"
                          >
                            Go To Wishlist
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <span style={{ padding: 10 }}>Wishlist is Empty!</span>
                    )}
                  </ul>
                </li>
                <li onClick={handleClick} className="dropdown">
                  <button
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <ShoppingCart />
                    <small>{cart.length}</small>
                  </button>
                  <ul
                    className="dropdown-menu"
                    style={{width:"25em"}}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {cart.length > 0 ? (
                      <>
                        {cart.map((prod) => (
                          <span className="cartitem d-flex align-items-center" key={prod.id}>
                            <img
                              src={prod.image}
                              className="cartItemImg"
                              alt={prod.name}
                              width= '80em'
                            />
                            <div className="cartItemDetail">
                              <span className="me-3"> {prod.color}</span>
                              <span className="me-3">Size: {prod.size}</span>
                              <span className="me-3">{prod.price}EGP</span>
                              <span className="me-3">Count: {prod.quantity}</span>
                            </div>
                            <Delete
                              className="deleteIcon"
                              onClick={() => removeItem(prod.id)}
                            />
                          </span>
                        ))}
                        <Link to="/cart" className="d-flex justify-content-center btn">
                          <Button
                            className="buttonStyle"
                          >
                            Go To Cart
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <span style={{ padding: 10 }}>Cart is Empty!</span>
                    )}
                  </ul>
                </li>
          </ul>
         
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMain);
