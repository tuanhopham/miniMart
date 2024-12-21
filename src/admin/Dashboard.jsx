import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { db } from "./../firebase.config";
import AppWidgetSummary from "./CustomCard";
import { RevenueModal } from "./modalDashboard/RevenueModal";
import { TotalAddProductModal } from "./modalDashboard/TotalAddProductModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./stylesAdmin/dashboard.css";
const getMonthYear = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const Dashboard = () => {
  const [statistical, setStatistical] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAddProduct, setTotalAddProduct] = useState(0);
  const [totalCanceledBills, setTotalCanceledBills] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
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
        console.log(statisticalList)
        const monthlyDataMap = {};
        statisticalList.forEach((item) => {
          if (item.entry) {
            item.entry.forEach(({ time, Price, totalAmount, date }) => {
              const monthYear = getMonthYear(time || date);
      
              if (!monthlyDataMap[monthYear]) {
                monthlyDataMap[monthYear] = {
                  month: monthYear,
                  TotalRevenue: 0,
                  totalExpenditure: 0,
                };
              }
      
              monthlyDataMap[monthYear].TotalRevenue += totalAmount || 0;
              monthlyDataMap[monthYear].totalExpenditure += Price || 0;
            });
          }
        });


        const monthlyDataArray = Object.values(monthlyDataMap).sort((a, b) => {
          const [monthA, yearA] = a.month.split('/').map(Number);
          const [monthB, yearB] = b.month.split('/').map(Number);
          return yearA - yearB || monthA - monthB;
        });
      
        // Set state
        setMonthlyData(monthlyDataArray);

        console.log(statisticalList);
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
  }, [bills]);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="Total Revenue"
                color="success"
                total={totalRevenue}
                icon="ri-money-dollar-circle-fill"
                style={{ cursor: "pointer" }}
                onClick={() => handleRevenue()}
              />
            </Col>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="Total Expenditure"
                color="secondary"
                icon="ri-money-dollar-box-fill"
                total={totalAddProduct}
                style={{ cursor: "pointer" }}
                onClick={() => handleAdd()}
              />
            </Col>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="Sales"
                color="warning"
                icon="ri-user-2-line"
                style={{ cursor: "pointer" }}
                total={1}
              />
            </Col>
            <Col lg="3" md="2" className="mb-3">
              <AppWidgetSummary
                title="Monthly Canceled Bill"
                color="danger"
                icon="ri-bill-line"
                total={totalCanceledBills}
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>

          {/* Monthly Performance Chart */}
          <Row>
            <Col lg="12" className="mt-5">
              <h4 className="text-center">Monthly Performance</h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#198754" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6C757D" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="TotalRevenue"
                    fill="#198754"
                    name="Monthly Revenue"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="totalExpenditure"
                    fill="#6C757D"
                    name="total Expenditure"
                  />
                </BarChart>
              </ResponsiveContainer>
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
