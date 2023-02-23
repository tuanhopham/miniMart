import React from "react";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Login } from "../pages/Login";
import { ProductDetails } from "../pages/ProductDetails";
import { Shop } from "../pages/Shop";
import { Signup } from "../pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='Home'/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};
