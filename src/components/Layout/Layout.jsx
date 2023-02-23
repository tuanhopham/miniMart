import React from "react";
import { Header } from "../Header/Header";
import { AppRouter } from '../../routers/Router';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
  return (
<>
   <Header />
      <div>
        <AppRouter />
      </div>
      <Footer/>
</>
  );
};
