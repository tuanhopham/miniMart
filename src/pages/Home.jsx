import React from "react";
import Helmet from "../components/Helmet/Helmet";
import '../styles/home.css'
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
export const Home = () => {
  const year = new Date().getFullYear();
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make your Interior More Minimalistics & Modern</h2>
                <p>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
                  ipsumlorem ipsum
                </p>
                <button className="buy_btn">SHOP NOW</button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
