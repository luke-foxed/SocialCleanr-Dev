import axios from 'axios';

export const getToken = async () => {
  let token = await axios.get('/api/passport-auth/get-token');
  return token;
};
