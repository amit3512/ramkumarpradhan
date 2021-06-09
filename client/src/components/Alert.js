import React from "react";

const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type} px-3 py-0 m-2 `}>{text}</div>;
};

export default Alert;
