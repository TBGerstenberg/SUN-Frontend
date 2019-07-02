import React, { Component } from "react";
import { Button, Icon, Card } from "semantic-ui-react";
import postTypeEnum from "../models/enumerations/postTypeEnum";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import "./PostCard.css";
import { connect } from "react-redux";
import i18next from "i18next";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [],
      users: [],
      author: null,
      authorChair: null,
      postToBeRendered: props.post
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let chairWhichAuthoredPost = null;
    let userWhoAuthoredPost = null;

    if (nextProps.chairs != prevState.chairs) {
      // Find chair with ID of props.post.pageId
      chairWhichAuthoredPost = nextProps.chairs.find(chair => {
        return chair.id === prevState.postToBeRendered.pageId;
      });
    }

    if (nextProps.users != prevState.users) {
      // find user with ID of props.post.authorId
      userWhoAuthoredPost = nextProps.users.find(user => {
        return user.id === prevState.postToBeRendered.authorId;
      });
    }

    return {
      author: userWhoAuthoredPost,
      authorChair: chairWhichAuthoredPost
    };
  }

  render() {
    const props = this.props;

    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {this.state.author && (
              <div className="postCard-authorInfo-container">
                <span>
                  {" "}
                  <Icon name="university" />{" "}
                  {this.state.authorChair && this.state.authorChair.name}
                </span>
                <span className="postCard-authorInfo-personInfo">
                  {i18next.t("postCard-written-by-label")}
                  <a
                    className="postCard-authorInfo-link"
                    href={"/profile/" + props.post.authorId}
                  >
                    {this.state.author.firstName +
                      " " +
                      this.state.author.lastName}
                  </a>
                </span>
              </div>
            )}
          </Card.Content>
        </Card.Content>
        <Card.Content>
          <Card.Header>{props.post.title}</Card.Header>
          <Card.Description>{props.post.content}</Card.Description>
          <Card.Meta className="postCard-meta">
            <span>
              <Icon name="info" />
              {tableFormattingUtilities.postTypeEnumToString(props.post.type)}
            </span>
            <span>
              {tableFormattingUtilities.getTimeSinceCreated(
                props.post.createdAt
              )}
            </span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
let mapStateToProps = state => {
  return {
    chairs: state.chair.chairs || [],
    users: state.user.users || []
  };
};

export default connect(mapStateToProps)(PostCard);
