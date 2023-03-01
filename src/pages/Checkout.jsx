import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "./../components/Helmet/Helmet";
import { CommonSection } from "./../components/UI/CommonSection";
import '../styles/checkout.css'

export const Checkout = () => {
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
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" placeholder="Phone number" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Street addres" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="City" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Postal code" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>Total Qty: <span>${}0</span></h6>
                <h6>Subtotal: <span>${}120</span></h6>
                <h6>Shipping: <span>${}0</span></h6>
                <h6><span>Shipping: <br/>Free shipping</span><span>$0</span></h6>
                <h4>Total Cost: <span>${}120</span></h4>

              </div>
              <button className="buy_btn auth__bth w-100">Place an order</button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
