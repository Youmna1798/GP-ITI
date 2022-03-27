import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getColorCode } from "../utils/helpers";

const SingleProduct = ({ prod }) => {

  let productImage = prod.colors[0].images[0].image;
  return (
    <div className="products mt-5 p-3">
      <Card  style={{ width: "22rem" , border:"none"}}>
        <Card.Img
          variant="top"
          src={productImage ? productImage : ""}
          alt={prod.name}
        />
        <Card.Body>
          <Card.Title style={{fontWeight:"900"}}>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            {prod.colors.map((clr) => (
              <Button
                key={clr.id}
                className="mr-1 ms-2"
                style={{
                  background: getColorCode(clr.color),
                  width: "20px",
                  height: "20px",
                  borderRadius:"100%",
                  border:"none",
                  cursor:"default",
                  
                }}
              ></Button>
            ))}
            <br/>
            <br/>
            {/* <Rating rating={prod.ratings} /> */}
          </Card.Subtitle>
          <Card.Subtitle  style={{fontSize:"1.1rem"}}>Price: {prod.price} EGP</Card.Subtitle>

          <Button className="mt-2" style={{backgroundColor:"#bba14f",borderRadius:"8%",border:"none", fontSize:"1.3rem"}}>
          <Link className="text-decoration-none" style={{color:"black", fontWeight:"700"}} to={`/product/${prod.code}/`}>view product</Link>{" "}
          </Button>
          </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
