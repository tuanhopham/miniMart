import React from "react";
import { useAuth } from "../custom-hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ProtectedAdmin = () => {
  const { currentUser } = useAuth();


  return currentUser.role==='admin' ? <Outlet /> : <Navigate to="/home" />;
};
