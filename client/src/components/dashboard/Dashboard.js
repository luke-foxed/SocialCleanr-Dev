import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Segment,
  Grid,
  Divider,
  Button,
  Image
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
    post_images: [],
    profile_id: ''
  });

  const { name, scans, text_cleaned, images_cleaned, post_images } = userData;

  const getFacebookProfile = async () => {
    let res = await axios.get('http://localhost:5000/api/passport-auth/me', {
      withCredentials: true
    });
    const { data } = await res;
    setUserData({
      ...userData,
      post_images: data.posts.data,
      profile_id: data.name
    });
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

      let res = await axios.get('http://localhost:5000/api/passport-auth/me', {
        withCredentials: true
      });
      const { data } = await res;
      setUserData({
        ...userData,
        post_images: data.posts.data,
        profile_id: data.name
      });
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

      <Segment>
        {post_images.map(image => (
          <Image
            rounded
            className='photoOfOrder'
            key={image.id}
            src={image.picture}
          />
        ))}
      </Segment>
    </Container>
  );
};

export default Dashboard;
