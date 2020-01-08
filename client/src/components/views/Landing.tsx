import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import React = require('react');
import logo from '../../assets/img/logo.png';

const Landing = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}>
      <img src={logo} width={300} height={300}></img>
      <Link to='/login' style={{ textDecoration: 'none' }}>
        <Button color='primary'>Get Started</Button>
      </Link>
    </Grid>
  );
};

export default Landing;
