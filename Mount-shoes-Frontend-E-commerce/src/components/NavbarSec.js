import React  from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import { Button } from 'react-bootstrap';


function handleClick(){
   $(this).attr("class", "active");
  }

export default function NavbarSec() {
  return (
     <>
 <nav className="navbar2 mt-5">
      <div className="navbar2-container containerNav2 ">
          <ul className="menu-items">
          <Button className='mb-2 m-2'  style={{backgroundColor:"#E0DDAA", fontSize: "1rem", outline:"none"}} onClick={handleClick}><NavLink exact to="/allproducts/page=1">All Products</NavLink></Button>
              <Button className='mb-2 m-2'  style={{backgroundColor:"#E0DDAA", fontSize: "1rem", outline:"none"}} onClick={handleClick}><NavLink exact to="/newarrivals/page=1">New Arrivals</NavLink></Button>
              <Button className='mb-2 m-2'  style={{backgroundColor:"#E0DDAA", fontSize: "1rem", outline:"none"}} onClick={handleClick}><NavLink exact to="/bestselling/page=1">Best Selling</NavLink></Button>
             </ul>
      </div>
  </nav>    
    </>
  )
}


