import React from "react";
import { Trans, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { Button, Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import ChairManagement from "../03_organisms/ChairManagement";
import NavBar from "../03_organisms/NavBar";
import UserManagement from "../03_organisms/UserManagement";
import "./AdminPanel.css";

class AdminPanel extends React.Component {
  state = {
    visible: false,
    activeContentFragment: (
      <UserManagement
        toggleSuccessMessage={this.toggleSuccessMessage}
        toggleErrorMessage={this.toggleErrorMessage}
      />
    ),
    contentFragments: {
      userManagement: (
        <UserManagement
          toggleSuccessMessage={this.toggleSuccessMessage}
          toggleErrorMessage={this.toggleErrorMessage}
        />
      ),
      chairManagement: (
        <ChairManagement
          toggleSuccessMessage={this.toggleSuccessMessage}
          toggleErrorMessage={this.toggleErrorMessage}
        />
      )
    }
  };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div className="pageWrapper">
        <NavBar />
        <Grid columns={2} padded>
          <Grid.Row className="adminPanel-buttonRow">
            <Grid.Column width={12} verticalAlign="middle">
              <Button.Group>
                <Button disabled={visible} onClick={this.handleShowClick}>
                  <Trans i18nKey="adminpanel-sidebar-show-option" />
                </Button>
                <Button disabled={!visible} onClick={this.handleHideClick}>
                  <Trans i18nKey="adminpanel-sidebar-hide-option" />
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <SemanticToastContainer className="adminPanel-toastContainer" />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Sidebar.Pushable as={Segment} className="panelWrapper">
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width="thin"
          >
            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  activeContentFragment: this.state.contentFragments
                    .userManagement
                });
              }}
            >
              <Icon name="user" />
              <Trans i18nKey="adminpanel-menu-user-management-label" />
            </Menu.Item>

            <Menu.Item
              as="a"
              onClick={() => {
                this.setState({
                  activeContentFragment: this.state.contentFragments
                    .chairManagement
                });
              }}
            >
              <Icon name="university" />
              <Trans i18nKey="adminpanel-menu-chair-management-label" />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>{this.state.activeContentFragment}</Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }

  toggleSuccessMessage(title, message) {
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "success",
          color: "green",
          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }

  toggleErrorMessage(title, message) {
    console.log(title, message);
    setTimeout(() => {
      toast(
        {
          title: title,
          description: <p>{message}</p>,
          type: "error",

          size: "mini",
          animation: "fly left"
        },
        () => console.log("toast closed"),
        () => console.log("toast clicked")
      );
    }, 1000);
  }
}

/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
const mapStateToProps = state => ({
  ...state
});

export default withTranslation()(connect(mapStateToProps)(AdminPanel));
