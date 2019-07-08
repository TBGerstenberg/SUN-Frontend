import i18next from "i18next";
import React from "react";
import { Container, Grid, Header, Icon, Segment } from "semantic-ui-react";
import NavBar from "../03_organisms/NavBar";

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Segment>
          <Grid>
            <Grid.Row
              textAlign="center"
              style={{ minHeight: "300px" }}
              verticalAlign="middle"
            >
              <Grid.Column width={16}>
                <Icon name="search" size="big" />
                <Header>{i18next.t("404-Page-Text")}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </div>
  );
};

export default NotFound;
