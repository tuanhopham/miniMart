import { motion } from "framer-motion";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import "../styles/cart.css";
import { useBillsApi } from "./../api/billsAdminApi";
import { acceptBillApi, deleteBillApi } from "./../api/managerBillApi";
import Helmet from "./../components/Helmet/Helmet";
import { ViewBill } from './bills/ViewBill';

export const AllOrder = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.allBills);
  const userName = useSelector((state) => state.user.email);
  const fetchProducts = useBillsApi();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [billView, setBillView] = useState({});
  const handleView = (e) => {
    setBillView(e);
    toggle();
  };
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, bills]);

  const handleSubmitBill = async (bill) => {
    const newBill = {
      ...bill,
      sale: userName,
      status: 1,
      timeline: [...bill.timeline, { time: Date.now(), name: "shipping" }],
    };
    await acceptBillApi(newBill);
  };
  const handleDeleteBill = async (bill) => {
    const newBill = {
      ...bill,
      sale: userName,
      status: -1,
      timeline: [...bill.timeline, { time: Date.now(), name: "Delete" }],
    };
    await deleteBillApi(newBill);
  };

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
                      .filter((bills) => bills.status === 0)
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
                            <Button
                              outline
                              onClick={() => handleSubmitBill(bills)}
                              color="success"
                            >
                              Accept
                            </Button>
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
                              style={{ fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-eye-fill"
                              onClick={() => handleView(bills)}

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
