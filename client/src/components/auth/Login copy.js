import React from 'react';
import {
  Input,
  Container,
  Button,
  Icon,
  Form,
  Grid,
  Header,
  Divider
} from 'semantic-ui-react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
    };
  }

  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _handleSubmit = () => {
    const { password, password2 } = this.state;
    if (password !== password2) {
      alert('Passwords do not equal');
    } else {
      console.log(this.state);
    }
  };

  render() {
    return (
      <Container textAlign='center' style={{ width: '30%', margin: '0 auto' }}>
        <br></br>
        <Header>Register</Header>
        <Divider></Divider>
        <Form onSubmit={this._handleSubmit}>
          <Form.Field>
            <Input
              icon='user'
              iconPosition='left'
              name='username'
              placeholder='Username'
              onChange={this._handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon='mail'
              iconPosition='left'
              name='email'
              placeholder='Email'
              onChange={this._handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon='lock'
              name='password'
              type='password'
              iconPosition='left'
              placeholder='Create a password'
              onChange={this._handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon='lock'
              type='password'
              iconPosition='left'
              placeholder='Enter password again'
            />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default Register;
