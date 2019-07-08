import i18next from "i18next";
import React from "react";
import { connect } from "react-redux";
import { Button, Card, Icon } from "semantic-ui-react";
import Account from "../models/account";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import "./PostCard.css";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chairs: [],
      users: [],
      author: null,
      chairWhichAuthoredPost: null,
      postToBeRendered: props.post
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let userWhoAuthoredPost = prevState.author;
    let chairWhichAuthoredPost = prevState.chairWhichAuthoredPost;
    let chairs = prevState.chairs;
    let postToBeRendered = prevState.postToBeRendered;

    console.log(prevState.postToBeRendered);
    console.log(prevState.chairWhichAuthoredPost);

    if (
      (chairWhichAuthoredPost &&
        postToBeRendered &&
        chairWhichAuthoredPost.id != postToBeRendered.pageId) ||
      !chairWhichAuthoredPost
    ) {
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

    if (nextProps.chairs && nextProps.chairs != prevState.chairs) {
      chairs = nextProps.chairs;
    }

    return {
      ...prevState,
      author: userWhoAuthoredPost,
      chairWhichAuthoredPost: chairWhichAuthoredPost,
      postToBeRendered: nextProps.post,
      chairs: chairs
    };
  }

  render() {
    const props = this.props;

    switch (props.post.type) {
      case 0:
        return this.renderStandardPost(props);

      case 1:
        return this.renderJobPost(props);

      case 2:
        return this.renderEventPost(props);

      case 3:
        return this.renderThesisPost(props);

      default:
        return null;
    }
  }

  renderDeletePostButton(userCanDeletePost) {
    return (
      <>
        {userCanDeletePost && (
          <Button
            icon
            size="tiny"
            color="grey"
            circular
            onClick={() => {}}
            floated="right"
          >
            <Icon name="trash" />
          </Button>
        )}
      </>
    );
  }

  renderStandardPost(props) {
    console.log(this.state);
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {this.state.author && (
              <div className="postCard-authorInfo-container">
                <span>
                  <Icon name="university" />{" "}
                  <a href={"/chair/" + props.post.pageId}>
                    {this.state.chairWhichAuthoredPost &&
                      this.state.chairWhichAuthoredPost.name}
                  </a>
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
                <span>
                  {this.renderDeletePostButton(props.userCanDeletePost)}
                </span>
              </div>
            )}
          </Card.Content>
        </Card.Content>
        <Card.Content>
          <Card.Header>{props.post.title}</Card.Header>
          <Card.Description
            style={{ minHeight: "100px", paddingBottom: "20px" }}
          >
            {props.post.content}
          </Card.Description>
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

  renderThesisPost(props) {
    return null;
  }

  renderEventPost(props) {
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {this.state.author && this.state.chairWhichAuthoredPost && (
              <div className="postCard-authorInfo-container">
                <span>
                  <Icon name="university" />{" "}
                  <a href={"/chair/" + props.post.pageId}>
                    {" "}
                    {this.state.authorChair && this.state.authorChair.name}
                  </a>
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
                <span>
                  {this.renderDeletePostButton(props.userCanDeletePost)}
                </span>
              </div>
            )}
          </Card.Content>
        </Card.Content>
        <Card.Content>
          <Card.Header>{props.post.title}</Card.Header>
          <Card.Description
            style={{ minHeight: "100px", paddingBottom: "20px" }}
          >
            {props.post.content}
          </Card.Description>
          <Card.Content
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0px"
            }}
          >
            <Card.Content>
              {" "}
              {i18next.t("postCard-eventPost-startsAt-label") +
                " " +
                tableFormattingUtilities.getFormattedDateTime(
                  props.post.startDate
                )}
            </Card.Content>

            <Card.Content>
              {" "}
              {i18next.t("postCard-eventPost-endsAt-label") +
                " " +
                tableFormattingUtilities.getFormattedDateTime(
                  props.post.endDate
                )}
            </Card.Content>
          </Card.Content>
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

  renderJobPost() {
    return null;
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
let mapStateToProps = (state, ownProps) => {
  const loggedInUser = state.login.user ? new Account(state.login.user) : null;

  let userCanDeletePost = false;

  if (loggedInUser) {
    if (
      loggedInUser.isAuthorOfPost(ownProps.post) ||
      loggedInUser.isSuperAdmin() ||
      loggedInUser.isEmployeeForChair(ownProps.post.pageId)
    ) {
      userCanDeletePost = true;
    }
  }

  return {
    userCanDeletePost: userCanDeletePost,

    chairs: state.chair.chairs || [],
    users: state.user.users || []
  };
};

export default connect(mapStateToProps)(PostCard);
