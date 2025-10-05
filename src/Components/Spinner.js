import React from "react";
import "../Styles/Spinner.css";

function Spinner() {
  return (
    <div className="spinner-loading">
      <div className="spinner" aria-label="Loading"></div>
      <p className="loading-text">
        Loading countries<span className="loading-dots"></span>
      </p>
    </div>
  );
}

export default Spinner;
