const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// Connect to DB
connectDB();

// Init session (needed for OAuth)
app.use(
  session({
    secret: 'test',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
  })
);

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Init middleware
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.json({ extended: false }));
app.use(cookieParser());

// Fix cors error
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

// Default route
app.get('/', (req, res) => {
  res.send('welcome');
});

// Define routes here
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/passport-auth', require('./routes/api/auth-passport'));
app.use('/api/classifier', require('./routes/api/classifier'));
app.use('/api/user', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app; // for testing
