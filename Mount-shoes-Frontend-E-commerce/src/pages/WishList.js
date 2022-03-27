import React from 'react';
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Delete} from "@material-ui/icons";
import { useWishlistContext } from "../context/wishList_context";


const Wishlist = () => {
  const { wishlist, total_amount, total_items, removeWishListItem, clearWishlist } =
    useWishlistContext();
    

  return (
    <>
    <h2 className="text-center mt-3 text-uppercase">wishlist</h2>
      <div className={wishlist.length === 0 ? "wrapper" : "home"}>
        <div className="productContainer">
          <ListGroup >
            {wishlist.map((prod) => (
              <ListGroup.Item className="mt-5 mb-5" style={{width:"50%",margin:'auto',fontSize:"1.2em", border:"solid #bba14f"}} key={prod.id}>
                <Row>
                  <Col md={3} >
                      <Link to={`/product/${prod.code}/`}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                      </Link>
                  </Col>
                  <Col md={3} className="d-flex align-items-center">
                    <span>{prod.name}</span>
                  </Col>
                       <Col md={2} className="d-flex align-items-center">
                    <span>Color : {prod.color}</span>
                  </Col>
                    <Col md={1} className="d-flex align-items-center">
                    <span>Size : {prod.size}</span>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">Price: {prod.price} EGP</Col>
                  <Col md={1} className="d-flex align-items-center">
                     <Delete
                              style={{fontSize:"1.5em"}}
                              className="deleteIcon"
                              onClick={() => removeWishListItem(prod.id)}
                            />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="text-end me-5 mt-5">
          { wishlist.length === 0 ?
          <h2>Wishlist is Empty <Link to="/allproducts/page=1" style={{color:"#bba14f",textDecoration:"none"}} >Shop Now</Link></h2> :
            <>
          <p className="mt-5" style={{marginRight:"2em"}}>Number of Items: ({total_items}) items</p>
          <p style={{ fontWeight: 700, fontSize: 20, marginRight:"1em" }}>
            Total Price: {total_amount} EGP
          </p>
          <Button style={{backgroundColor:"#bba14f", border:"none",marginRight:"1em", color:"black", fontSize:"1.3rem"}} onClick={() => clearWishlist()}>Clear All Wishlist   <Delete
                              style={{fontSize:"1.5em"}}
                            
                            /></Button>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Wishlist;
