import React from "react";
import { connect } from "react-redux";
import { Trans, withTranslation } from "react-i18next";
import { Button, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import "./AdminPanel.css";

import AccountManagement from "../03_organisms/AccountManagement";
import UserManagement from "../03_organisms/UserManagement";
import GroupManagement from "../03_organisms/GroupManagement";
import ChairManagement from "../03_organisms/ChairManagement";

class AdminPanel extends React.Component {
  state = {
    visible: false,
    activeContentFragment: <UserManagement />,
    contentFragments: {
      accountManagement: <AccountManagement />,
      userManagement: <UserManagement />,
      groupManagement: <GroupManagement />,
      chairManagement: <ChairManagement />
    }
  };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <div className="pageWrapper">
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            <Trans i18nKey="adminpanel-sidebar-show-option" />
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            <Trans i18nKey="adminpanel-sidebar-hide-option" />
          </Button>
        </Button.Group>

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
                    .accountManagement
                });
              }}
            >
              <Icon name="user outline" />
              <Trans i18nKey="adminpanel-menu-account-management-label" />
            </Menu.Item>

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
                    .groupManagement
                });
              }}
            >
              <Icon name="group" />
              <Trans i18nKey="adminpanel-menu-group-management-label" />
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
}

const mapStateToProps = state => ({
  ...state
});

export default withTranslation()(connect(mapStateToProps)(AdminPanel));
