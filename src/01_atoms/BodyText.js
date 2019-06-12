import React from "react";
import "./BodyText.css";

const BodyText = props => {
  return <p className="bodyText">{props.children}</p>;
};

export default BodyText;
