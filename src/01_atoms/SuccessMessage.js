import React from "react";
import { Message } from "semantic-ui-react";

const SuccessMessage = props => {
  return (
    <div>
      <Message positive>
        <Message.Header>{props.header}</Message.Header>
        {props.body}
      </Message>
    </div>
  );
};

export default SuccessMessage;
