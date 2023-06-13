import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import "../styles/cart.css";
import { ViewBill } from './../admin/bills/ViewBill';
import Helmet from "./../components/Helmet/Helmet";
import { CommonSection } from "./../components/UI/CommonSection";

export const Order = () => {
  const bills = useSelector((state) => state.bills.billsData);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [billView, setBillView] = useState({});
  const handleView = (e) => {
    setBillView(e);
    toggle();
  };
  return (
    <>
    <Helmet title="Order">
      <CommonSection title="My Order" />
      <section>
        <Container>
          <Row>
            <Col lg="10">
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
                    </tr>
                  </thead>
                  <tbody>
                    {[...bills]
                      .sort((a, b) => b.createAt - a.createAt)

                      .map((bills, index) => (
                        <tr key={bills?.billId} className="align-middle">
                          <td>{index + 1}</td>
                          <td>
                            <img src={bills?.carts[0]?.image} alt="" />
                          </td>

                          <td>${bills?.totalAmount}</td>
                          <td>
                            {bills?.status === 0 ? (
                              <>
                                <i
                                  className="ri-survey-line"
                                  style={{ color: "blue" }}
                                ></i>{" "}
                                Processing
                              </>
                            ) : bills?.status === 1 ? (
                              <>
                                <i
                                  className="ri-dropbox-fill"
                                  style={{ color: "green" }}
                                ></i>{" "}
                                Packing
                              </>
                            ) : bills?.status === 2 ? (
                              <>
                                <i
                                  className="ri-caravan-line"
                                  style={{ color: "orange" }}
                                ></i>{" "}
                                Shipping
                              </>
                            ) : bills?.status === 3 ? (
                              <>
                                <i
                                  className="ri-shield-check-line"
                                  style={{ color: "purple" }}
                                ></i>{" "}
                                Received
                              </>
                            ) : bills?.status === 5 ? (
                              <>
                                <i
                                  className="ri-shield-check-line"
                                  style={{ color: "red" }}
                                ></i>{" "}
                                done
                              </>
                            ): (
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
                              onClick={() => handleView(bills)}
                              style={{ fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-eye-fill"
                            ></motion.i>
                          </td>
                        </tr>
                      ))}
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
      {billView && <ViewBill toggle={toggle} isOpen={modal} bills={billView} />}
</>
  );
};
