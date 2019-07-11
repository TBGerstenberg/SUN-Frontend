import i18next from "i18next";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import LanguageSwitcher from "../02_molecules/LanguageSwitcher";
import logo from "../assets/images/Logo.png";
import landingPageImage from "../assets/images/landingpage_01.jpg"
import profile_man from "../assets/images/profile_man.png";
import profile_woman from "../assets/images/profile_woman.png";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content={i18next.t("landingpage-hero-text")}
      inverted
      color="blue"
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "bold",
        marginTop: mobile ? "1.5em" : "3em",
        marginLeft: "2.5em"
      }}
    />

    <Image
      src={logo}
      height="175px"
      width="200px"
      style={{
        marginTop: "-11.75em",
        marginLeft: "-0.3em"
      }}
    />
    <br />

    <Header
      as="h2"
      content={i18next.t("landingpage-hero-subtext")}
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <br />
    <br />
    <Button color="blue" inverted size="big" href="/signup">
      {i18next.t("landingpage-hero-call-to-action")}
      <Icon name="angle double right" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item>
                  <LanguageSwitcher />
                </Menu.Item>

                <Menu.Item position="right">
                  <Button as="a" href="/" color="teal" inverted={!fixed}>
                    {i18next.t("landingpage-login-button-text")}
                  </Button>
                  <Button
                    as="a"
                    color="teal"
                    href="signup"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    {i18next.t("landingpage-signup-button-text")}
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button color="blue" as="a" inverted>
                    <Trans i18nKey="landingpage-login-button-text" />
                  </Button>
                  <Button
                    color="blue"
                    as="a"
                    inverted
                    style={{ marginLeft: "0.5em" }}
                  >
                    {i18next.t("landingpage-signup-button-text")}
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <div>
    <ResponsiveContainer>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <div width="750px" height="750px">
              <Image src={landingPageImage} height="350px" width="500px" />
            </div>

            <Grid.Column width={8}>
              <Header
                as="h1"
                style={{
                  fontSize: "4em",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  color: "teal"
                }}
              >
                {i18next.t("landingpage-who-we-are-headline")}
              </Header>

              <Header as="h3" style={{ fontSize: "2em" }}>
                {i18next.t("landingpage-what-we-do-headline")}
              </Header>
              <p style={{ fontSize: "1.33em", color: "teal" }}>
                <Trans i18nKey="landingpage-what-we-do-bodyText" />
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={8} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center" />
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center" columns={5}>
            <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em" }}>
              <Icon name="handshake outline" size="big" color="blue" />
              <Header as="h3" style={{ fontSize: "1em" }}>
                <p style={{ fontSize: "1.33em" }}>
                  {i18next.t("landingpage-valueprop-0-header")}
                </p>
              </Header>
              <p style={{ fontSize: "1.5em", color: "teal" }}>
                {i18next.t("landingpage-valueprop-0-description")}
              </p>
            </Grid.Column>

            <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em" }}>
              <Icon name="calendar alternate outline" size="big" color="blue" />
              <Header as="h3" style={{ fontSize: "1em" }}>
                <p style={{ fontSize: "1.33em" }}>
                  {i18next.t("landingpage-valueprop-1-header")}
                </p>
              </Header>
              <p style={{ fontSize: "1.5em", color: "teal" }}>
                {i18next.t("landingpage-valueprop-1-description")}
              </p>
            </Grid.Column>

            <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em" }}>
              <Icon name="graduation cap" size="big" color="blue" />
              <Header as="h3" style={{ fontSize: "1em" }}>
                <p style={{ fontSize: "1.33em" }}>
                  {i18next.t("landingpage-valueprop-2-header")}
                </p>
              </Header>
              <p style={{ fontSize: "1.5em", color: "teal" }}>
                {i18next.t("landingpage-valueprop-2-description")}
              </p>
            </Grid.Column>

            <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em" }}>
              <Icon name="rocket" size="big" color="blue" />
              <Header as="h3" style={{ fontSize: "1em" }}>
                <p style={{ fontSize: "1.33em" }}>
                  {" "}
                  {i18next.t("landingpage-valueprop-3-header")}
                </p>
              </Header>
              <p style={{ fontSize: "1.5em", color: "teal" }}>
                {i18next.t("landingpage-valueprop-3-description")}
              </p>
            </Grid.Column>

            <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em" }}>
              <Icon name="react" size="big" color="blue" />
              <Header as="h3" style={{ fontSize: "1em" }}>
                <p style={{ fontSize: "1.33em" }}>
                  {i18next.t("landingpage-valueprop-4-header")}
                </p>
              </Header>
              <p style={{ fontSize: "1.5em", color: "teal" }}>
                {i18next.t("landingpage-valueprop-4-description")}
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "1em", color: "teal" }}>
                {i18next.t("landingpage-testimonials-text-0")}
              </Header>

              <div className="ui blue image large label">
                <img
                  alt={"An avatar"}
                  className="ui right spaced avatar image"
                  src={profile_man}
                />{" "}
                {i18next.t("landingpage-testimonials-author-0-role")}
                <div className="detail">
                  {" "}
                  {i18next.t("landingpage-testimonials-author-0-name")}
                </div>
              </div>
            </Grid.Column>

            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "1em", color: "teal" }}>
                {i18next.t("landingpage-testimonials-text-1")}
              </Header>

              <div className="ui blue image large label">
                <img
                  alt={"An avatar"}
                  className="ui right spaced avatar image"
                  src={profile_woman}
                />{" "}
                {i18next.t("landingpage-testimonials-author-1-role")}
                <div className="detail">
                  {i18next.t("landingpage-testimonials-author-1-name")}
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted color="teal" as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">
                    {i18next.t("landingpage-footer-faq")}
                  </List.Item>
                  <List.Item as="a">
                    {i18next.t("landingpage-footer-contact")}
                  </List.Item>
                  <List.Item as="a">
                    {i18next.t("landingpage-footer-terms-of-service")}
                  </List.Item>
                  <List.Item as="a">
                    {i18next.t("landingpage-footer-data-processing-agreement")}
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={7}>
                <Header color="teal" as="h4" inverted>
                  {i18next.t("landingpage-footer-call-to-action")}
                </Header>
                <p>{i18next.t("landingpage-footer-pre-call-to-action-text")}</p>
                <Button
                  as="a"
                  href="signup"
                  color="blue"
                  inverted
                  style={{ marginLeft: "0.5em" }}
                >
                  {i18next.t("landingpage-footer-signup-button-text")}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  </div>
);
export default withTranslation()(HomepageLayout);
