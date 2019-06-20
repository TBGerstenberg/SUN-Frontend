import React from "react";
import { Message } from "semantic-ui-react";

const ErrorMessage = props => {
  return (
    <div>
      <Message negative>
        <Message.Header>{props.header}</Message.Header>
        {props.body}
      </Message>
    </div>
  );
};

export default ErrorMessage;
