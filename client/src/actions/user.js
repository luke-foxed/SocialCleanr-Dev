const axios = require('axios');

export const getUser = async () => {
  let user = axios.get('http://localhost:5000/api/passport-auth/my-facebook');
  console.log(user);
};
