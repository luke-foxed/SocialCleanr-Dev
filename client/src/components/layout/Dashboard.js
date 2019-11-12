import React, { useState, useEffect } from 'react';
import { Container, Header, Grid, Divider, Button } from 'semantic-ui-react';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    scans: '',
    text_cleaned: '',
    images_cleaned: '',
    facebookData: []
  });

  const { name, scans, text_cleaned, images_cleaned, facebookData } = userData;

  //   const getFacebookProfile = async () => {
  //     const res = await fetch('/api/profile/me');
  //     const { data } = res.data;
  //     setUserData({ ...userData, facebook: data });
  //   };

  //TODO: Clean up below function with better error handling

  useEffect(() => {
    const fetchUser = async (req, res) => {
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
        return 'Error';
      }
    };

    fetchUser();
  }, [userData.name]);

  return (
    <Container>
      <Header>Welcome</Header>
      <p>{name}</p>
    </Container>
  );
};

export default Dashboard;
