import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { useBillsApi } from "../api/billsAdminApi";
import { acceptBillApi, deleteBillApi } from "../api/managerBillApi";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart.css";
import { updateSaleEntryApi } from './../api/managerBillApi';
import { ViewBill } from "./bills/ViewBill";

export const MyOrderAdmin = () => {
  const bills = useSelector((state) => state.bills.allBills);
  const userName = useSelector((state) => state.user.email);
  const fetchProducts = useBillsApi();
  const [billView, setBillView] = useState({});
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const handleView = (e) => {
    setBillView(e);
    toggle();
  };

  
  const handleShippingBill = async (bill) => {
    const newBill = {
      ...bill,
      sale: userName,
      status: 2,
      timeline: [...bill.timeline, { time: Date.now(), name: "shipping" }],
    };
    await acceptBillApi(newBill);
    fetchProducts();
  };
  const handleReceivedBill = async (bill) => {
    const newBill = {
      ...bill,
      sale: userName,
      status: 3,
      timeline: [...bill.timeline, { time: Date.now(), name: "Received" }],
    };
    await acceptBillApi(newBill);
    fetchProducts();
  };
  const handleDoneBill = async (bill) => {
    const newBill = {
      ...bill,
      sale: userName,
      status: 5,
      timeline: [...bill.timeline, { time: Date.now(), name: "Done" }],
    };
    await acceptBillApi(newBill);
    await updateSaleEntryApi(newBill);
    fetchProducts();
  };
  const handleDeleteBill = async (bill) => {
    const newBill = {
      ...bill,
      sale: userName,
      status: -1,
      timeline: [...bill.timeline, { time: Date.now(), name: "Delete" }],
    };
    await deleteBillApi(newBill);
    fetchProducts();
  };
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts,]);
  return (
    <>
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
                        <th>user Name</th>
                        <th>total Qly</th>

                        <th>Accept</th>
                        <th>Delete</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...bills]
                        .sort((a, b) => b.createAt - a.createAt)
                        .filter((bills) => bills.status > 0 && bills.status < 4)
                        .map((bills, index) => (
                          <tr key={bills.billId} className="align-middle">
                            <td>{index + 1}</td>
                            <td>
                              <img src={bills.carts[0]?.image} alt="" />
                            </td>

                            <td>${bills.totalAmount}</td>
                            <td>{bills.email}</td>
                            <td>{bills.totalQty}</td>

                            <td>
                              {bills?.status === 1 ? (
                                <Button
                                  outline
                                  onClick={() => handleShippingBill(bills)}
                                  color="warning"
                                >
                                  Confirm Shipping
                                </Button>
                              ) : bills?.status === 2 ? (
                                <Button
                                  outline
                                  onClick={() => handleReceivedBill(bills)}
                                  color="info"
                                >
                                  Confirm Received
                                </Button>
                              ) : bills?.status === 3 ? (
                                <Button
                                  outline
                                  onClick={() => handleDoneBill(bills)}
                                  color="success"
                                >
                                  Accept done
                                </Button>
                              ) : null}
                            </td>
                            <td>
                              <Button
                                outline
                                onClick={() => handleDeleteBill(bills)}
                                color="danger"
                              >
                                Delete
                              </Button>
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
            </Row>
          </Container>
        </section>
      </Helmet>
      {billView && <ViewBill toggle={toggle} isOpen={modal} bills={billView} />}
    </>
  );
};
