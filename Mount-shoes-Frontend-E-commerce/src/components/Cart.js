import React , {useEffect} from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Delete} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const Cart = ({onTryLoadUserProfile}) => {
  const { cart, total_amount, total_items, removeItem, clearCart } =
  useCartContext();
  
useEffect(() => {
     onTryLoadUserProfile()
  });

  return (
    <>
      <h2 className="text-center mt-3 text-uppercase">Cart</h2>
      <div className={cart.length === 0 ? "wrapper" : "home"}>
        <div className="productContainer">
          <ListGroup >
            {cart.map((prod) => (
              <ListGroup.Item className="mt-5 mb-5" style={{width:"50%",margin:'auto',fontSize:"1.2em", border:"solid #bba14f"}} key={prod.id}>
                <Row>
                  <Col md={3} >
                    <Link to={`/product/${prod.code}/`}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Link>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <span>{prod.name}</span>
                  </Col>
                       <Col md={1} className="d-flex align-items-center">
                    <span>{prod.color}</span>
                  </Col>
                    <Col md={1} className="d-flex align-items-center">
                    <span>Size : {prod.size}</span>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">Price: {prod.price} EGP</Col>
                   <Col md={2} className="d-flex align-items-center">
                    <span>Count : {prod.quantity}</span>
                  </Col>
                  <Col md={1} className="d-flex align-items-center">
                   <Delete
                              style={{fontSize:"1.5em"}}
                              className="deleteIcon"
                              onClick={() => removeItem(prod.id)}
                            />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="text-end me-5 mt-5">
          { cart.length === 0 ?
          <h2>Cart is Empty <Link to="/allproducts/page=1" style={{color:"#bba14f",textDecoration:"none"}} >Shop Now</Link></h2> :
            <>
          <p className="mt-5" style={{ fontWeight: 500, fontSize: 20, marginRight:"4em"}}>Number of Items: ({total_items}) items</p>
          <p style={{ fontWeight: 700, fontSize: 25, marginRight:"3em"}}>
            Total Price: {total_amount} EGP
          </p>
          <Button style={{backgroundColor:"#bba14f", border:"none",marginRight:"1em", color:"black", fontSize:"1.3rem"}} onClick={() => clearCart()}>Clear All Cart <Delete
                              style={{fontSize:"1.5em"}}
                            
                            /></Button>
          <Link to="/checkout" className="btn btn-primary" style={{backgroundColor:"#bba14f", border:"none",marginRight:"1em", color:"black", fontSize:"1.3rem"}}>
            Proceed To Checkout
          </Link>
            </>
          }
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
   onTryLoadUserProfile:() => dispatch(actions.loadUserProfile()),
  };
};


export default connect(null,mapDispatchToProps)(Cart);