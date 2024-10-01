// Layout.jsx
import React from 'react';
import Header from './components/Header/header'; // Adjust the import path accordingly
import Footer from './components/Footer/footer'; // Adjust the import path accordingly
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
      {/* Uncomment the footer if you want it to be included */}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;

