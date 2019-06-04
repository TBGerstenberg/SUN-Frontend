import React from "react";
import NavBar from "../03_organisms/NavBar";
import NewPost from "../03_organisms/NewPost"
import ConFirmModal from "../03_organisms/ConfirmModal"
import AvatarJob from "../05_images/job.png";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Icon,
  Image,
  Label,
  GridColumn,
  Placeholder,
  Modal
} from "semantic-ui-react";

const Job = () => {
  return (
    <div>
      <NavBar />
      <HeaderJobPage/>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column textAlign="center" width={3}>
            <Avatar_Job/>
            <ConFirmModal/>
           <NewPost/>
           <Inputtest/>
          </Grid.Column>
          <Grid.Column width={8}>
            <Contact_Form />
          </Grid.Column>
          <Grid.Column width={4}>
            <SecondProfile />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column textAlign="center" width={3}>
            
      
            
            
          </Grid.Column>
          <Grid.Column width={8}>
            <Contact_Form />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Job;

const Avatar_Job = () => {
  return <Image src={AvatarJob} />;
};

const Inputtest =() => {
  return <form>
  <label>
    Name:
    <input type="text" name="name" value="this.state.name" />
  </label>
  <input type="submit" onChange="this.onChange" value="Submit" />
  <label>
    
  </label>
</form>
}

const HeaderJobPage = () => {
  return (
    <Header as="h1" color="blue" block>
      Jobseite
    </Header>
  );
};



const SecondProfile = () => {
  return (
    <div>
      <Header color="blue">Gründungsthema</Header>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          <Placeholder.Line length="full" />
          
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  );
};



const Contact_Form = () => {
  return (
    <div>
      {" "}
      <Header color="blue">Jobangebote</Header>
      <Placeholder fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  );
};


