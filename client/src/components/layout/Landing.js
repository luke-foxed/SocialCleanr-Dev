import React, { useState, useEffect } from 'react';
import { Container, Header, Grid, Divider, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginModal from '../auth/LoginModal';

const containerStyle = {
  width: '100%',
  height: '400px',
  backgroundColor: 'grey',
  display: 'table'
};

const Landing = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <Container textAlign='center' style={containerStyle}>
      <Divider horizontal />
      <Header inverted size='large' color='blue' textAlign='center'>
        WELCOME TO SOCIAL CLEANER!
      </Header>
      <Divider horizontal />
      <Button onClick={toggleModal}>Get Started</Button>

      <LoginModal open={isModalVisible} onClose={toggleModal} />
    </Container>
  );
};

export default Landing;
