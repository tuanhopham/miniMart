import React from "react";
import "./footer.css";
import logo from "../../assets/images/eco-logo.png";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md='6'>
            <div className="logo">
            
              <div>
                <h1 className="text-white">Furniture Mart</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              lorem Full Stack React Furniture Ecommerce Website using ReactJs
              
            </p>
          </Col>
          <Col lg="3" md='3' className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phone</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md='3' className="mb-4">
          <div className="footer__quick-links">
              <h4 className="quick__links-title">Useful Links</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/Login">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md='3' >
          <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className="footer_contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i></span>
                  <p>123,Doc Thiet, Vinh, Nghe An</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i className="ri-phone-line"></i></span>
                  <p>+84 563 141 612</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i className="ri-mail-line"></i></span>
                  <p>minhtuanpham2111@gmail.com</p>
                </ListGroupItem>
     
              </ListGroup>
            </div>
          </Col>
        
        </Row>
      </Container>
    </footer>
  );
};
