import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from 'react-bootstrap/Modal';
// import Modal from "./components/Modal";
import InvestorsList from "./components/investors-list";
// import Example from "./components/Example";

function App() {

  return (
    <div className="App">
      <InvestorsList></InvestorsList>
    </div>
    
  );
}

export default App;
