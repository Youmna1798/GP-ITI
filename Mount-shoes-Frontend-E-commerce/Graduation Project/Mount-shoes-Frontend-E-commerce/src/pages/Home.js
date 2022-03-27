import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import about from "../media/about.jpg"



export default function Home() {

  return (
      <>
    <section className="showcase-area" id="showcase">
    </section>
    <section id="about">
      <div className="about-wrapper container">
        <div className="about-text">
          <p className="small">About Us</p>
          <h2>Premium Quality</h2>
          <p>
        Our men's leather shoes are made from premium grade leather and constructed by master craftsmen
          </p>
            <h2>Different Styles</h2>
          <p>
        Browse our collection of men's shoes.
Choose from a range of casual and formal shoes in a variety of styles and colours today.
          </p>
        </div>
        <div className="about-img">
          <img src={about} alt="food" />
        </div>
      </div>
    </section>
      <section id="containerCard">
    <div className="user-container">
      {/* <!-- Card One --> */}
      <div className="cardHome">
        <div className="user-content">
          <div className="bio">
         <h3><Link to="/allproducts/page=1">Shop Now</Link></h3>
          </div>
        </div>
      </div>

      {/* <!-- Card Two--> */}
      <div className="cardHome">
        <div className="user-content">
          <div className="bio">
             <h3><Link to="/allproducts/page=1">Shop Now</Link></h3>
          </div>
      
        </div>
      </div>

      {/* <!-- Card Three--> */}
      <div className="cardHome">
        <div className="user-content">
          <div className="bio">
            <h3><Link to="/allproducts/page=1">Shop Now</Link></h3>
          </div>
         
        </div>
      </div>

      {/* <!-- Card Four --> */}
      <div className="cardHome">
        <div className="user-content">
          <div className="bio">
             <h3><Link to="/allproducts/page=1">Shop Now</Link></h3>
          </div>
         
        </div>
      </div>

      {/* <!-- Card Five --> */}
      <div className="cardHome">
        <div className="user-content">
          <div className="bio">
            <h3><Link to="/allproducts/page=1">Shop Now</Link></h3>
          </div>
         
        </div>
      </div>

      {/* <!-- Card Six --> */}
      <div className="cardHome">
        <div className="user-content">
          <div className="bio">
            <h3><Link to="/allproducts/page=1">Shop Now</Link></h3>
          </div>
         
        </div>
      </div>
    </div>
  </section>
      </>
  )
}
