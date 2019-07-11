import i18next from "i18next";
import React from "react";
import { connect } from "react-redux";
import { Button, Card, Confirm, Icon } from "semantic-ui-react";
import Account from "../models/account";
import { postActions } from "../redux/_actions";
import tableFormattingUtilities from "../utilities/tableFormattingUtilities";
import "./PostCard.css";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postToBeRendered: props.post,
      confirmPostDeletionModalOpen: false
    };

    this.handlePostDeleteButtonClick = this.handlePostDeleteButtonClick.bind(
      this
    );
    this.triggerPostDeletion = this.triggerPostDeletion.bind(this);
  }

  /**
   * React-Lifecycle Method - Renders a Post depending on its type.
   */
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

  /**
   * Renders a confirmation modal before the deletion of a post is triggered
   */
  renderConfirmPostDeletionModal() {
    return (
      <Confirm
        onConfirm={this.triggerPostDeletion}
        onCancel={() => {
          this.setState({ confirmPostDeletionModalOpen: false });
        }}
        onClose={() => {
          this.setState({ confirmPostDeletionModalOpen: false });
        }}
        confirmButton={i18next.t(
          "postCard-confirm-post-deletion-modal-submit-button-label"
        )}
        cancelButton={i18next.t(
          "postCard-confirm-post-deletion-modal-cancel-button-label"
        )}
        header={i18next.t("postCard-confirm-post-deletion-modal-headline")}
        content={i18next.t("postCard-confirm-post-deletion-modal-content")}
        open={this.state.confirmPostDeletionModalOpen}
      />
    );
  }

  /**
   * Renders a Button to delete the post, given that the viewer has permission to do so
   * @param {Boolean} userCanDeletePost - Flag indicating wether the viewer can delete the post or not.
   */
  renderDeletePostButton(userCanDeletePost) {
    return (
      <>
        {userCanDeletePost && (
          <>
            {this.renderConfirmPostDeletionModal()}
            <Button
              icon
              size="tiny"
              color="grey"
              circular
              onClick={this.handlePostDeleteButtonClick}
              floated="right"
            >
              <Icon name="trash" />
            </Button>
          </>
        )}
      </>
    );
  }

  /**
   * Renders a post of type "generic".
   * @param {*} props - React props handed to the PostCard
   */
  renderStandardPost(props) {
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {props.post.authorName && props.post.pageName && (
              <div className="postCard-authorInfo-container">
                <span>
                  <Icon name="university" />{" "}
                  <a href={"/chair/" + props.post.pageId}>
                    {props.post.pageName}
                  </a>
                </span>
                <span className="postCard-authorInfo-personInfo">
                  {i18next.t("postCard-written-by-label")}
                  <a
                    className="postCard-authorInfo-link"
                    href={"/profile/" + props.post.authorId}
                  >
                    {props.post.authorName}
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

  /**
   * Renders a post of type "Thesis / Graduation Work".
   * @param {*} props - React props handed to the PostCard
   */
  renderThesisPost(props) {
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {props.post.authorName && props.post.pageName && (
              <div className="postCard-authorInfo-container">
                <span>
                  <Icon name="university" />{" "}
                  <a href={"/chair/" + props.post.pageId}>
                    {props.post.pageName}
                  </a>
                </span>
                <span className="postCard-authorInfo-personInfo">
                  {i18next.t("postCard-written-by-label")}
                  <a
                    className="postCard-authorInfo-link"
                    href={"/profile/" + props.post.authorId}
                  >
                    {props.post.authorName}
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
              {i18next.t("postCard-eventPost-startsAt-label") +
                " " +
                tableFormattingUtilities.getFormattedDate(props.post.startDate)}
            </Card.Content>

            <Card.Content>
              {i18next.t("postCard-eventPost-endsAt-label") +
                " " +
                tableFormattingUtilities.getFormattedDate(props.post.endDate)}
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

  /**
   * Renders a post of type "Event".
   * @param {*} props - React props handed to the PostCard
   */
  renderEventPost(props) {
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {props.post.authorName && props.post.pageName && (
              <div className="postCard-authorInfo-container">
                <span>
                  <Icon name="university" />{" "}
                  <a href={"/chair/" + props.post.pageId}>
                    {props.post.pageName}
                  </a>
                </span>
                <span className="postCard-authorInfo-personInfo">
                  {i18next.t("postCard-written-by-label")}
                  <a
                    className="postCard-authorInfo-link"
                    href={"/profile/" + props.post.authorId}
                  >
                    {props.post.authorName}
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
              {i18next.t("postCard-eventPost-startsAt-label") +
                " " +
                tableFormattingUtilities.getFormattedDateTime(
                  props.post.startDate
                )}
            </Card.Content>

            <Card.Content>
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

  /**
   * Renders a post of type "Joboffer".
   * @param {*} props - React props handed to the PostCard
   */
  renderJobPost(props) {
    return (
      <Card color="blue" fluid className="postCard-container">
        <Card.Content>
          <Card.Content>
            {props.post.authorName && props.post.pageName && (
              <div className="postCard-authorInfo-container">
                <span>
                  <Icon name="university" />{" "}
                  <a href={"/chair/" + props.post.pageId}>
                    {props.post.pageName}
                  </a>
                </span>
                <span className="postCard-authorInfo-personInfo">
                  {i18next.t("postCard-written-by-label")}
                  <a
                    className="postCard-authorInfo-link"
                    href={"/profile/" + props.post.authorId}
                  >
                    {props.post.authorName}
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
              <span style={{ fontWeight: "bold" }}>
                {i18next.t("postCard-jobPost-hoursPerWeek-label") + " "}
              </span>
              {props.post.hoursPerWeek}
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

  /**
   * Handles a click on the delete-button displayed on each psot
   */
  handlePostDeleteButtonClick() {
    this.setState({ confirmPostDeletionModalOpen: true });
  }

  /**
   * Triggers the deletion of this post
   */
  async triggerPostDeletion() {
    this.props.dispatch(postActions.deletePost(this.state.postToBeRendered.id));
    this.setState({ confirmPostDeletionModalOpen: false });
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
      loggedInUser.isChairAdmin(ownProps.post.pageId)
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
