import React from "react";
import { connect } from "react-redux";
import { Grid, Header, Image, Placeholder } from "semantic-ui-react";
import NavBar from "../03_organisms/NavBar";
import NewPostModal from "../03_organisms/NewPost";
import AvatarJob from "../assets/images/job.png";
import { postActions } from "../redux/_actions";

/**
 * Job Page created to list a collection of Jobs from all chairs.
 * Wasn't finished in time.
 */
export class Job extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <HeaderJobPage />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3}>
              <Avatar_Job />

              <NewPostModal
                onNewPost={newPostText => this.props.addTodo(newPostText)}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <ul>
                {this.props.todos.map(todo => {
                  return <li key={todo.id}>{todo.title}</li>;
                })}
              </ul>
            </Grid.Column>
            <Grid.Column width={4}>
              <SecondProfile />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center" width={3} />
            <Grid.Column width={8} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const Contact_Form = () => {
  return (
    <div>
      {" "}
      <Header color="blue">Jobangebote</Header>
    </div>
  );
};

const Avatar_Job = () => {
  return <Image src={AvatarJob} />;
};

//todo
/** Redux-standard methods that transfers (*maps*) values from the redux store to the component's props.
 *  To learn more on props: see https://reactjs.org/docs/components-and-props.html
 *  To learn about redux https://react-redux.js.org/using-react-redux/connect-mapstate
 */
let mapStateToProps = state => {
  return {
    todos: state.job.todos
  };
};

let mapDispatchToProps = {
  addTodo: postActions.addTodo
};

let TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Job);
export default TodoListContainer;

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
