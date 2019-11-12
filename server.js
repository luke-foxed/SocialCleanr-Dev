const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const cookies = require('cookie-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');

// Connect to DB
connectDB();

// Init middleware
app.use(cookies());
app.use(cors());
app.use(express.json({ extended: false }));

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Init session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.get('/', (req, res) => res.send('API Running'));

// Define routes here
app.use('/facebook-auth', require('./routes/api/auth'));
app.use('/scrape', require('./routes/api/scrape'));
app.use('/user', require('./routes/api/user'));

/////

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // res.json(req.user);
    res
      .cookie('token', req.user.token, {
        expires: new Date(Date.now() + 9999999),
        secure: true,
        httpOnly: true
      })
      .send('success');
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
