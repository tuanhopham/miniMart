import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/cart.css";
import Helmet from "./../components/Helmet/Helmet";
import { Button } from "reactstrap";
import { CommonSection } from "./../components/UI/CommonSection";
import { motion } from "framer-motion";
import { cartACtions } from "./../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useBillsApi } from "./../api/billsAdminApi";

export const AllOrder = () => {
  const bills = useSelector((state) => state.bills.allBills);
  const fetchProducts = useBillsApi();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Helmet title="Order">
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {bills.length === 0 ? (
                <h2 className="fs-4 text-center">loading</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...bills]
                      .sort((a, b) => b.createAt - a.createAt)

                      .map((bills, index) => (
                        <tr key={bills.billId} className="align-middle">
                          <td>{index + 1}</td>
                          <td>
                            <img src={bills.carts[0]?.image} alt="" />
                          </td>

                          <td>${bills.totalAmount}</td>
                          <td>
                            {bills.status === 0 ? (
                              <>
                                <i
                                  className="ri-survey-line"
                                  style={{ color: "blue" }}
                                ></i>{" "}
                                Processing
                              </>
                            ) : bills.status === 1 ? (
                              <>
                                <i
                                  className="ri-dropbox-fill"
                                  style={{ color: "green" }}
                                ></i>{" "}
                                Packing
                              </>
                            ) : bills.status === 2 ? (
                              <>
                                <i
                                  className="ri-caravan-line"
                                  style={{ color: "orange" }}
                                ></i>{" "}
                                Shipping
                              </>
                            ) : bills.status === 3 ? (
                              <>
                                <i
                                  className="ri-shield-check-line"
                                  style={{ color: "purple" }}
                                ></i>{" "}
                                Received
                              </>
                            ) : (
                              <>
                                <i
                                  className="ri-close-circle-fill"
                                  style={{ color: "red" }}
                                ></i>{" "}
                                Cancelled
                              </>
                            )}
                          </td>
                          <td>
                            <motion.i
                              //   onClick={() => deleteProduct(product)}
                              style={{ fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-eye-fill"
                            ></motion.i>
                          </td>
                        <td>
                        <Button outline  color="success" >Accept</Button>
                        </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
