import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Grid, Button, Container } from '@material-ui/core';
import Typography from 'material-ui/styles/typography';

const Landing = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}>
      <Link to='/login' style={{ textDecoration: 'none' }}>
        <Button color='primary'>Get Started</Button>
      </Link>
    </Grid>
  );
};

export default Landing;
