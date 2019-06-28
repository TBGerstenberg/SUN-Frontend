import React, { Component } from "react";
import { Button, Icon, Card } from "semantic-ui-react";
import postTypeEnum from "../models/enumerations/postTypeEnum";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import "./PostCard.css";

class PostCard extends React.Component {
  render() {
    const props = this.props;
    console.log(postTypeEnum);
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Header>{props.title}</Card.Header>
          <Card.Description>{props.content}</Card.Description>
          <Card.Meta className="postCard-meta">
            <a href={"/profile/" + props.authorId}>
              <Icon name="user" />
            </a>
            <span>
              <Icon name="info" />
              {tableFormattingUtilities.postTypeEnumToString(props.postType)}
            </span>
            <span>
              {tableFormattingUtilities.getFormattedDate(props.createdAt)}
            </span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default PostCard;
