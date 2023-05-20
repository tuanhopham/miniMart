import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/cart.css";
import Helmet from "./../components/Helmet/Helmet";
import { CommonSection } from "./../components/UI/CommonSection";
import { motion } from "framer-motion";
import { cartACtions } from "./../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Order = () => {
  
  return (
    <Helmet title="Order">
      <CommonSection title="My Order" />
      <section>
        <Container>
          <Row>
          <Col lg="10">
                {1 === 0 ? (
                  <h2 className="fs-4 text-center">
                    No item added to the cart
                  </h2>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th className="d-flex justify-content-around">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {currentProducts.map((product, index) => (
                        <tr className="align-middle">
                          <td>
                            <img src={product.imgUrl[0]} alt="" />
                          </td>
                          <td>{product.productName}</td>
                          <td>${product.price}</td>
                          <td>{product.quality}</td>
                          <td>
                            <motion.i
                            //   onClick={() => deleteProduct(product)}
                              style={{ fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-delete-bin-line"
                            ></motion.i>
                            <motion.i
                            //   onClick={() => handleEdit(product)}
                              style={{ float: "right", fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-edit-line"
                            >
                              {" "}
                            </motion.i>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col lg="2">
                <div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    // onClick={toggle}
                    className="buy_btn w-100 p-3"
                  >
                    List Product
                  </motion.button>
                </div>
              </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

