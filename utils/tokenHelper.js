const graph = require('fbgraph');
const config = require('config');

module.exports = {
  extendToken: async function(token) {
    await graph.extendAccessToken(
      {
        access_token: token,
        client_id: config.facebookTESTAppID,
        client_secret: config.facebookTESTSecret
      },
      function(err, facebookRes) {
        console.log(facebookRes);
      }
    );
  },

  validateToken: async function(user) {
    await graph.get(
      `/debug_token?input_token=${user.token}&access_token=${user.token}`,
      function(err, res) {
        if (res.data.is_valid) {
          return true;
        } else {
          graph.del(`/${user.id}/permissions`, function(err, res) {
            return false;
          });
        }
      }
    );
  }
};
