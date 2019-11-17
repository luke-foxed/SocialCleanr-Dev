const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const cookies = require('cookie-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');

// Connect to DB
connectDB();

app.use(session({ secret: 'test' }));

// Fix Cors error
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

// Init middleware
app.use(express.json({ extended: false }));

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Init session
app.get('/', (req, res) => {
  res.send('welcome');
});

// Define routes here
app.use('/api/facebook-auth', require('./routes/api/auth'));
app.use('/api/scrape', require('./routes/api/scrape'));
app.use('/api/passport-auth', require('./routes/api/auth-passport'));
/////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
