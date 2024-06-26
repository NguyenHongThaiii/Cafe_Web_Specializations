import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Nav from "../ChildrenComponent/Nav";
import BackArrow from "../ChildrenComponent/Back-Arrow";

function LayoutUser({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Nav />
      <BackArrow />
      <Footer />
    </>
  );
}

export default LayoutUser;
