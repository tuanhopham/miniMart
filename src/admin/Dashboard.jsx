import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { db } from "./../firebase.config";
import AppWidgetSummary from "./CustomCard";
import { RevenueModal } from './modalDashboard/RevenueModal';
import { TotalAddProductModal } from "./modalDashboard/TotalAddProductModal";
import "./stylesAdmin/dashboard.css"; // Import custom styles
export const Dashboard = () => {
  const [statistical, setStatistical] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAddProduct, setTotalAddProduct] = useState(0);
  const [totalCanceledBills, setTotalCanceledBills] = useState(0);
  const bills = useSelector((state) => state.bills.allBills);

  const toggleTotalAdd = () => setModalTotalAdd(!modalTotalAdd);
  const [modalTotalAdd, setModalTotalAdd] = useState(false);
  const handleAdd = () => {
    toggleTotalAdd();
  };
  const toggleRevenue = () => setModalRevenue(!modalRevenue);
  const [modalRevenue, setModalRevenue] = useState(false);
  const handleRevenue = () => {
    toggleRevenue();
  };
  useEffect(() => {
    const fetchStatisticalData = async () => {
      try {
        const statisticalCollection = collection(db, "statistical");
        const statisticalSnapshot = await getDocs(statisticalCollection);
        const statisticalList = statisticalSnapshot.docs.map((doc) =>
          doc.data()
        );
        setStatistical(statisticalList);

        if (statisticalList) {
          setTotalRevenue(
            statisticalList[1].entry.reduce(
              (total, item) => total + (item.totalAmount || 0),
              0
            )
          );
          setTotalAddProduct(
            statisticalList[0].entry.reduce(
              (total, item) => total + (item.Price || 0),
              0
            )
          );
        }
      } catch (error) {
        console.error("Error retrieving statistical data:", error);
      }
    };
    setTotalCanceledBills(bills.filter((bill) => bill.status === -1).length);

    fetchStatisticalData();
  }, []);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="monthly revenue"
                color="success"
                total={totalRevenue}
                icon="ri-money-dollar-circle-fill"
                style={{ cursor: "pointer" }}
                onClick={() => handleRevenue()}

              />
            </Col>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="monthly add products"
                color="secondary"
                icon="ri-money-dollar-box-fill"
                total={totalAddProduct}
                style={{ cursor: "pointer" }}
                onClick={() => handleAdd()}
              />
            </Col>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="sales"
                color="warning"
                icon="ri-user-2-line"
                style={{ cursor: "pointer" }}
                total={1}
              />
            </Col>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="monthly canceled Bill"
                color="danger"
                icon="ri-bill-line"
                total={totalCanceledBills}
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {statistical && statistical[0] && statistical[0].entry && (
        <TotalAddProductModal
          listProductsAdd={statistical[0].entry}
          isOpen={modalTotalAdd}
          toggle={toggleTotalAdd}
        />
      )}

      {statistical && statistical[1] && statistical[1].entry && (
        <RevenueModal
          profit={statistical[1].entry}
          isOpen={modalRevenue}
          toggle={toggleRevenue}
        />
      )}
    </>
  );
};
