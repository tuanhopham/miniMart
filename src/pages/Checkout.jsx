import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "./../components/Helmet/Helmet";
import { CommonSection } from "./../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addBillUserApi, saveOderData } from "./../userApi/cart/cartApi";
import { cartACtions } from "./../redux/slices/cartSlice";
import { useProductApi } from ".././api/productApi";

export const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantily);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const carts = useSelector((state) => state.cart.cartItems);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const fetchProducts = useProductApi();
  const [displayName, setDisplayName] = useState("");
  const reduxEmail = useSelector((state) => state.user.email);
  const reduxDisplayName = useSelector((state) => state.user.displayName);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    phoneNumber: 0,
    address: "",
    city: "",
  });
  const dispatch = useDispatch();

  const handleSubmitBuy = async (e) => {
    e.preventDefault();
    const emptyFields = [];

    for (const key of Object.keys(formData)) {
      if (formData[key] === "" || formData[key] === 0) {
        emptyFields.push(key);
      }
    }

    if (emptyFields.length > 0) {
      const message = `Vui lòng điền đầy đủ thông tin cho các trường: ${emptyFields.join(
        ", "
      )}.`;
      toast.error(message);
    } else if (totalQty === 0) {
      toast.error("Please select products.");
    } else {
      const data = {
        ...formData,
        totalAmount,
        totalQty,
        carts,
        billId: uuidv4(),
        status: 0,
        createAt: Date.now(),
        timeline: [],
      };

      const check = addBillUserApi(data);
      if (check) {
        navigate("/shop");
        saveOderData([], 0, 0);
        await fetchProducts();
        dispatch(
          cartACtions.setItem({
            cartItems: [],
            totalAmount: 0,
            totalQuantily: 0,
          })
        );
        setFormData({
          email: "",
          displayName: "",
        });
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setDisplayName(reduxDisplayName);
    setEmail(reduxEmail);
    setFormData((prevFormData) => ({
      ...prevFormData,
      displayName: reduxDisplayName,
      email: reduxEmail,
    }));
  }, [reduxEmail, reduxDisplayName]);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    defaultValue={displayName}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    defaultValue={email}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone number"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Street address"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>{totalAmount} $</span>
                </h6>
                <h6>
                  Shipping: <span>0 $</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    Free shipping
                  </span>
                  <span>0 $</span>
                </h6>
                <h4>
                  Total Cost: <span>{totalAmount} $</span>
                </h4>
              </div>
              <button
                className="buy_btn auth__bth w-100"
                onClick={handleSubmitBuy}
              >
                Place an order
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
