import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProductDetails } from "../pages/ProductDetails";
import { Shop } from "../pages/Shop";
import { Signup } from "../pages/Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import { AllProducts } from "../admin/AllProducts";
import { ProductQr } from "../pages/ProductQr";
import { Order } from "../pages/order";
import { AllOrder } from "./../admin/AllOrders";
import { Dashboard } from "./../admin/Dashboard";
import { MyOrderAdmin } from './../admin/MyOrdersAdmin';
import { ProtectedAdmin } from './ProtectedAmin';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="Home" />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Cart" element={<Cart />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="Order" element={<Order />} />
      </Route>
      <Route path="/*" element={<ProtectedAdmin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        {/* <Route path="dashboard/add-product" element={<AddProducts/>}/> */}
        <Route path="dashboard/order-bills" element={<AllOrder />} />
        <Route path="dashboard/my-order" element={<MyOrderAdmin />} />
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/qr/:id" element={<ProductQr />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};
