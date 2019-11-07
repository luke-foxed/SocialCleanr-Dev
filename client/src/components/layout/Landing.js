import React from 'react';
import { Container, Header, Grid, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
  backgroundColor: 'grey',
  display: 'table'
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  _onButtonClick() {}

  render() {
    return (
      <Container textAlign='center' style={containerStyle}>
        <Divider horizontal />
        <Header inverted size='large' color='blue' textAlign='center'>
          WELCOME TO SOCIAL CLEANER!
        </Header>
        <Divider horizontal />
        <Link to='/login'>
          <Button>Get Started</Button>
        </Link>
      </Container>
    );
  }
}

export default Landing;
