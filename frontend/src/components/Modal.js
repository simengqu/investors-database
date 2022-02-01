import React from "react";
import "./Modal.css";
import InvestorsList from "./investors-list";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
        {InvestorsList.investors?.map((investor) => {
                    return (
                        <div className="col-lg-4 pb-1">
                        {/* <div className="card">
                        <div className="card-body"> */}
                        <h5 className="card-title">
                            {investor.Firm}
                        </h5>
                        
                        </div>
                    );
                })}
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;