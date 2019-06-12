import React from "react";
import "./Label.css";

const Label = props => {
  return <p className="Label">{props.children}</p>;
};

export default Label;
