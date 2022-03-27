import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
<div>
  {/* <!-- Footer --> */}
  <footer
          className="text-center text-lg-start "
          style={{backgroundColor: "#bba14f", color: "black"}}
          >
    {/* <!-- Section: Links  --> */}
    <section className="">
      <div className="container text-center text-md-start mt-5">
        {/* <!-- Grid row --> */}
        <div className="row mt-3 pt-4">
          {/* <!-- Grid column --> */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
            {/* <!-- Content --> */}
            <h6 className="text-uppercase fw-bold">Company</h6>
            <hr
                className="mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "company", height: "2px"}}
                />
            <p>
              Browse our collection of men's shoes.
              <br/>
              Choose from a range of casual and formal shoes in a variety of styles and colours.
            </p>
          </div>
          {/* <!-- Grid column --> */}

     
          {/* <!-- Grid column --> */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0  ">
            {/* <!-- Links --> */}
            <h6 className="text-uppercase fw-bold">Contact Us</h6>
            <hr
                className="mt-0 d-inline-block mx-auto"
                style={{width: "60px", backgroundColor: "black", height: "2px"}}
                />
            <p><i className="fab fa-facebook-f me-3"></i>
            <Link style={{color:"inherit",textDecoration:"none"}} to={{ pathname: "https://web.facebook.com/mountshoes1?_rdc=1&_rdr" }} target="_blank"> Mount Shoes</Link>
            </p>
            <p><i className="fas fa-envelope me-3"></i> mountshoes2021@gmail.com</p>
            <p><i className="fas fa-phone me-3 mb-4"></i> +201093382699</p>
          </div>
          {/* <!-- Grid column --> */}
        </div>
        {/* <!-- Grid row --> */}
      </div>
    </section>
    {/* <!-- Section: Links  --> */}

    {/* <!-- Copyright --> */}
    <div
         className="text-center p-3"
         style={{backgroundColor: "#603601" , color:"#E0DDAA"}}
         >
      © 2022 Copyright: Mount Shoes 
     
    </div>
    {/* <!-- Copyright --> */}
  </footer>
  {/* <!-- Footer --> */}

</div>
{/* <!-- End of .container --> */}
</div>
  )
}
