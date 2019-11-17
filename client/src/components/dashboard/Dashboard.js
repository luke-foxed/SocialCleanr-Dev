import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Segment,
  Grid,
  Divider,
  Button,
  Menu
} from 'semantic-ui-react';
import SidebarMenu from './sidebar/SidebarMenu';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
  backgroundColor: 'grey',
  display: 'table'
};

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    scans: '',
    text_cleaned: '',
    images_cleaned: '',
    facebookData: []
  });

  const { name, scans, text_cleaned, images_cleaned, facebookData } = userData;

  const getFacebookProfile = async () => {
    let res = await axios.get('http://localhost:5000/api/passport-auth/me', {
      withCredentials: true
    });
    const { data } = await res;
    console.log(data);
    setUserData({ ...userData, facebookData: data });
  };

  // TODO: Clean up below function with better error handling

  useEffect(() => {
    const fetchUser = async () => {
      // using fetch to issue cors headers
      let response = await fetch(
        'http://localhost:5000/api/passport-auth/login/success',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }
        }
      );

      if (response.status === 200) {
        let jsonData = await response.json();
        setUserData({ ...userData, name: jsonData.user.name });
      } else {
        // show error modal
        return 'Error';
      }
    };

    fetchUser();
  }, [userData.name]);

  return (
    <Container textAlign='center' style={containerStyle}>
      <Container fluid>
        <SidebarMenu></SidebarMenu>
      </Container>
      <Segment>
        <Header>Welcome</Header>
        <p>{name}</p>
        <Button onClick={getFacebookProfile}>Fetch Profile</Button>
      </Segment>
    </Container>
  );
};

export default Dashboard;
