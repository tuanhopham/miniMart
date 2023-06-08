import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ProtectedAdmin = () => {
  const role = useSelector((state) => state.user.role);

  return role==='sale' ? <Outlet /> : <Navigate to="/home" />;

};
