import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useCartContext } from "../context/cart_context";
import { useWishlistContext } from "../context/wishList_context";
import { getColorCode } from "../utils/helpers";
import styled from "styled-components";
import axios from "axios";

const SingleProductPage = (props) => {
  // cart context
  const { addToCart } = useCartContext();
  const { addToWishlist } = useWishlistContext();
  // my states
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  const [selectedShoe, setSelectedShoe] = useState({
    code: "",
    id: "",
    name: "",
    color: "",
    size: "",
    price: "",
    image: "",
  });

  useEffect(async () => {
    let product_id = props.match.params.id;
    let res = await axios.get(
      `http://localhost:8000/api/products/${product_id}`
    );
    setProduct(res.data);
  }, []);

  useEffect(() => {
    if (product.colors) {
      setSelectedColor(product.colors[0]);
      setSelectedImage(product.colors[0].images[0].image);
      setSelectedShoe({
        ...selectedShoe,
        code: product.code,
        id: product.colors[0].sizes[0].id,
        name: product.name,
        color: product.colors[0].color,
        // size: product.colors[0].sizes[0].size,
        price: product.price,
        image: product.colors[0].images[0].image,
      });
    }
  }, [product]);

  const { description, price, name } = product;

  let changeColor = (item) => {
    let newColor = product.colors.filter((i) => i.color === item.color);
    setSelectedColor(newColor[0]);
    setSelectedImage(newColor[0].images[0].image);
    setSelectedShoe({
      ...selectedShoe,
      color: newColor[0].color,
      image: newColor[0].images[0].image,
      size: "",
    });
  };

  let changeSize = (prod) => {
    setSelectedShoe({ ...selectedShoe, size: prod.size, id: prod.id });
  };
  return (
    <Wrapper>
      <div className="container">
        <div>
          <img
            className="product-image"
            // src={selectedColor.images ? selectedColor.images[0].image : ""}
            src={selectedImage}
            alt={selectedImage.image}
          />
          <div className="d-flex justify-content-center">
            {selectedColor.images &&
              selectedColor.images.map((img) => (
                <img
                key={img.image}
                className="small-image"
                src={img.image}
                alt={img.image}
                onClick={() => setSelectedImage(img.image)}
                />
                ))}
          </div>
        </div>
        <div className="product-details">
          <h3 className="title">{name}</h3>
          <h4 className="description">{description}</h4>
          <h3 className="price">{price} EGP</h3>
          <div className="d-flex align-items-center">
            {product.colors &&
              product.colors.map((item) => (
                <Button
                key={item.id}
                  className="mr-1 m-2 "
                  style={{
                    background: getColorCode(item.color),
                    width: "3em",
                    height: "3em",
                    borderRadius: "50%",
                    border: "none",
                  }}
                  onClick={() => changeColor(item)}
                ></Button>
              ))}
            <Dropdown>
              <Dropdown.Toggle
                className="ms-5"
                style={{
                  backgroundColor: "#bba14f",
                  border: "none",
                  fontSize: "1.5rem",
                  color:"black"
                }}
                id="dropdown-basic"
              >
                Sizes
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {selectedColor.sizes &&
                  selectedColor.sizes.map((prod) => (
                    <Dropdown.Item style={{fontSize:"1.3rem", backgroundColor:"beige"}}
                      key={prod.size}
                      onClick={() => changeSize(prod)}
                      disabled={!prod.available_in_stock}
                    >
                      {prod.size}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* shoe size */}

          <h3>
            Selected Item:{selectedShoe.color}-{selectedShoe.size}
          </h3>
          {/* <StarRating /> */}

          <Button
            disabled={selectedShoe.size === ""}
            className="m-3"
            style={{
              background: "#bba14f",
              borderColor: "#bba14f",
              fontSize: "1.5rem",
              color:"black"
            }}
            onClick={() => addToCart(selectedShoe)}
          >
            Add to Cart
          </Button>
          <Button
           disabled={selectedShoe.size === ""}
            className="m-auto"
            style={{
              background: "#bba14f",
              borderColor: "#bba14f",
              fontSize: "1.5rem",
              color :"black"
            }}
            onClick={() => addToWishlist(selectedShoe)}
          >
            Add to Wishlist
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .container > * {
    padding: 4rem;
  }
  .product-details > * {
    margin-bottom: 1em;
  }

  img {
    max-width: 100%;
    max-height: 60vh;
  }

  .small-image {
    max-width: 80px;
  }
  .category {
    display: inline-block;
    background: #ffe699;
    color: #444;
    padding: 0.3em;
  }
  .price {
    fon-size: 3rem important;
    color: #555;
  }

  .description {
    line-height: 2;
    max-width: 45em;
  }

  @media (min-width: 992px) {
    .container {
      display: flex;
      justify-content: center;
    }
  }
`;

export default SingleProductPage;
