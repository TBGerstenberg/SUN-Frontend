import React, { Component } from 'react'
import { Button, Icon, Modal, Form, TextArea } from 'semantic-ui-react'

class ContactForm extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button color="teal" icon>
            Posten <Icon name='mail forward' />
          </Button>
        }
      >
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <p style={{
            fontFamily:"bold",
            fontSize: "14pt"
          }} >Der Beitrag wurde geposted</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive icon='checkmark' labelPosition='right' content='Alles klar' onClick={this.close}  />
        </Modal.Actions>
      </Modal>
    )
  }
}

const SecondModal= () => (
  <Modal trigger={<Button color="teal">Neuer Post</Button>}>
    <Modal.Header>Neuer Post</Modal.Header>
      <Modal.Description>
      <Form>
    <TextArea  placeholder="Job- oder Gründungsthema" style={{ minHeight: 40 }} />
    <TextArea  placeholder="Beschreibung" style={{ minHeight: 400 }} />
  </Form>
      </Modal.Description>
    <Modal.Actions>
      <ContactForm />
    </Modal.Actions>
  </Modal>
)

export default SecondModal



