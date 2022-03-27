import React, { useState, useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useCartContext } from "../context/cart_context";
// import styled from "styled-components";
import axios from "axios";
import { Grid, Header, Divider } from "semantic-ui-react/";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Link } from "react-router-dom";

const Test = ({
  userName,
  userEmail,
  userAddress,
  userPhoneNumber,
  onTryLoadUserProfile,
}) => {
  useEffect(async () => {
    onTryLoadUserProfile();
  });

  const { cart, total_amount } = useCartContext();
  const [show, setShow] = useState(false);
  const [area, setArea] = useState([]);
  const [city, setCity] = useState(null);
  const [shipping, setShipping] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // paypall
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: shipping ? total_amount + shipping : total_amount,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Thanks for paying " + details.payer.name.given_name);
            localStorage.removeItem("cart");
            setImmediate(() => {
              window.location.reload();
            });
          });
        },
      })
      .render("#paypal-button");
  }, []);

  //  delivery areas from backend
  useEffect(async () => {
    axios.get("http://127.0.0.1:8000/api/areas/").then((res) => {
      const data = res.data.results;
      setArea(data);
    });
  }, []);

  // for selection of city
  const handleSelect = (e) => {
    setCity(e.target.value);
    let res = area.filter((obj) => obj.id == e.target.value);
    setShipping(res[0].delivery_fees);
  };

  // Send order confirm
  const handleConfirm = (e) => {
    e.preventDefault();
    const order_items = [];
    cart.forEach((cartItem) => {
      order_items.push({ item_id: cartItem.id, quantity: cartItem.quantity });
    });

    // send order  data
    axios
      .post(
        "http://127.0.0.1:8000/api/orders/",
        {
          delivery_area: city,
          items: order_items,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("cart");
        setImmediate(() => {
          window.location.reload();
        });
      });
    // send update profile data
    const id = localStorage.getItem("id");
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    };
    axios.put(
      `http://127.0.0.1:8000/api/user/${id}/Editprofile`,
      {
        Name: checkoutForm.Name,
        email: userEmail,
        address: checkoutForm.address,
        phone_number: checkoutForm.phone_number,
      },
      config
    );
  };

  const [checkoutForm, setCheckoutForm] = useState({
    Name: userName,
    email: userEmail,
    address: userAddress,
    phone_number: userPhoneNumber,
  });

  const [errors, setErrors] = useState({
    NameErr: null,
    emailErr: null,
    addressErr: null,
    phone_numberErr: null,
  });
  // const regexForEmail =/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  const changeData = (e) => {
    if (e.target.name === "Name") {
      setCheckoutForm({
        ...checkoutForm,
        Name: e.target.value,
      });
      setErrors({
        ...errors,
        NameErr: e.target.value.length === 0 ? "This field is required" : null,
      });
    }
    //  else if (e.target.name === "email") {
    //   setCheckoutForm({
    //     ...checkoutForm,
    //     email: e.target.value,
    //   });
    //   setErrors({
    //     ...errors,
    //     emailErr:
    //         e.target.value.length === 0
    //         ? "This field is required"
    //        :e.target.value.match(regexForEmail)
    //        ? null
    //         :"This email is not valid",

    //   });
    // }
    else if (e.target.name === "address") {
      setCheckoutForm({
        ...checkoutForm,
        address: e.target.value,
      });
      setErrors({
        ...errors,
        addressErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "phone_number") {
      setCheckoutForm({
        ...checkoutForm,
        phone_number: e.target.value,
      });
      setErrors({
        ...errors,
        phone_numberErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length >= 14
            ? "enter a valid phone number"
            : null,
      });
    }
  };

  return (
    <Grid container columns={2} divided className="mt-5">
      <Grid.Row>
        <Grid.Column width={9}>
          <Header style={{ textAlign: "center" }}>Order Details</Header>
          <Divider />
          <ListGroup>
            {cart.map((prod) => (
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    {prod.name}
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    {prod.color}
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    size: {prod.size}
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    {prod.price} EGP
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    count: {prod.quantity}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Divider />
          <div className="total-price-details mt-3 me-5">
            <h4>subtotal: {total_amount}</h4>
            <h4>shipping fees: {shipping}</h4>
            <h3>TOTAL: {shipping ? total_amount + shipping : ""}</h3>
          </div>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header style={{ textAlign: "center" }}>Customer Information</Header>
          <Divider />
          <form className="mb-5" onSubmit={(e) => handleConfirm(e)}>
            {/* name field */}
            <div className="name">
              <label htmlFor="NameID" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.NameErr ? "border-danger" : ""
                }`}
                id="NameID"
                aria-describedby="Name"
                value={checkoutForm.Name}
                onChange={(e) => changeData(e)}
                name="Name"
              />
              <div id="Name" className="form-text text-danger">
                {errors.NameErr}
              </div>
            </div>
            {/* email field */}
            <div className="name">
              <label htmlFor="emailID" className="form-label">
                Email
              </label>
              {/* readonly label */}
              <input
                readOnly
                type="text"
                className="form-control"
                style={{ backgroundColor: "transparent" }}
                id="emailID"
                aria-describedby="email"
                value={userEmail}
                name="test"
              />

              {/* hidden label */}
              <input
                hidden
                type="text"
                className={`form-control ${
                  errors.emailErr ? "border-danger" : ""
                }`}
                id="emailID"
                aria-describedby="email"
                value={userEmail}
                onChange={(e) => changeData(e)}
                name="email"
              />
              <div id="email" className="form-text text-danger">
                {errors.emailErr}
              </div>
            </div>
            {/* address field */}
            <div className="name">
              <label htmlFor="addressID" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.addressErr ? "border-danger" : ""
                }`}
                id="addressID"
                aria-describedby="address"
                value={checkoutForm.address}
                onChange={(e) => changeData(e)}
                name="address"
              />
              <div id="address" className="form-text text-danger">
                {errors.addressErr}
              </div>
            </div>
            {/* Phone field */}
            <div className="name">
              <label htmlFor="phone_numberID" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.phone_numberErr ? "border-danger" : ""
                }`}
                id="phone_numberID"
                aria-describedby="phone_number"
                value={checkoutForm.phone_number}
                onChange={(e) => changeData(e)}
                name="phone_number"
              />
              <div id="phone_number" className="form-text text-danger">
                {errors.phone_numberErr}
              </div>
            </div>
            {/*  Delivery Area field */}
            <div className="name">
              <label className="form-label">Delivery Area</label>
              <select onChange={(e) => handleSelect(e)}>
                <option selected disabled>
                  Select Area
                </option>
                {area.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.area}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Button
                onClick={handleShow}
                type="submit"
                value="Submit"
                style={{
                  backgroundColor: "#bba14f",
                  border: "none",
                  color: "black",
                  fontSize: "1.2rem",
                }}
                disabled={
                  cart.length === 0 ||
                  city === null ||
                  errors.NameErr ||
                  errors.addressErr ||
                  errors.phone_numberErr ||
                  !checkoutForm.Name.trim() ||
                  !checkoutForm.address.trim() ||
                  !checkoutForm.phone_number.trim()
                }
              >
                Confirm Order
              </Button>
              <div>Payment Method: Cash On Delivery</div>
            </div>
            <Modal show={show}>
              <Modal.Header style={{ backgroundColor: "#bba14f" }}>
                <Modal.Title style={{ fontWeight: "600", color: "black" }}>
                  order confirmation
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                We have sent you a confirmation email, Please check your email
              </Modal.Body>
              <Modal.Footer>
                <Link to="/allproducts/page=1">
                  <Button
                    style={{
                      backgroundColor: "#bba14f",
                      borderRadius: "5%",
                      border: "none",
                      fontSize: "1.3rem",
                      color: "black",
                    }}
                    onClick={handleClose}
                  >
                    Ok
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </form>
          <div id="paypal-button"></div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userEmail: state.userEmail,
    userAddress: state.userAddress,
    userPhoneNumber: state.userPhoneNumber,
    error: state.errorUpdateProfile,
    status: state.UpdateProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryLoadUserProfile: () => dispatch(actions.loadUserProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
