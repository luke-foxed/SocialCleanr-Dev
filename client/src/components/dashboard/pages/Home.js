import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { getUser } from '../../../actions/user';

const Home = () => {
  useEffect(() => {
    async function fetchProfile() {
      await getUser();
    }

    fetchProfile();
  }, []);

  return <h1>HOME</h1>;
};

export default Home;
