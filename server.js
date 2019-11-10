const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const passport = require('passport');

// Connect to DB
connectDB();

// Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Init passport
require('./config/passport')(passport);
app.use(passport.initialize());

// Init session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.session());

app.get('/', (req, res) => res.send('API Running'));

// Define routes here
app.use('/facebook-auth', require('./routes/api/auth'));
app.use('/scrape', require('./routes/api/scrape'));
app.use('/auth', require('./routes/api/auth-passport'));
app.use('/user', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
