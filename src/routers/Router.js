import React from "react";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Login } from "../pages/Login";
import { ProductDetails } from "../pages/ProductDetails";
import { Shop } from "../pages/Shop";
import { Signup } from "../pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import { AddProducts } from "../admin/AddProducts";
import { AllProducts } from "../admin/AllProducts";
import { Dashboard } from './../admin/Dashboard';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="Home" />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Cart" element={<Cart />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />}/>
        <Route path="dashboard/all-products" element={<AllProducts />}/>
        {/* <Route path="dashboard/add-product" element={<AddProducts/>}/> */}
        <Route path="dashboard" element={<Dashboard/>}/>
      </Route>
      
      <Route path="/Login" element={<Login />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};
