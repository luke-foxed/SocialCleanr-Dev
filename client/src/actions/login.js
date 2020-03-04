import axios from 'axios';

export const loginScraper = userData => {
  axios({
    method: 'post',
    url: '/api/scrape/login',
    data: {
      email: userData.email,
      password: userData.password,
      authcode: userData.authcode
    }
  });
};

export const loginSocialMedia = website => {
  window.open(
    `http://localhost:5000/api/passport-auth/login-${website}`,
    '_self'
  );
};
