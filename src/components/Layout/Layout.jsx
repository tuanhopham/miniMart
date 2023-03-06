import React from "react";
import { Header } from "../Header/Header";
import { AppRouter } from '../../routers/Router';
import { Footer } from '../Footer/Footer';
import { useLocation } from "react-router-dom";
import { AdminNav } from './../../admin/AdminNav';

export const Layout = () => {

  const Location = useLocation()
  return (
<>
{
  Location.pathname.startsWith('/dashboard')?<AdminNav />:<Header />
}
 
      <div>
        <AppRouter />
      </div>
      <Footer/>
</>
  );
};
