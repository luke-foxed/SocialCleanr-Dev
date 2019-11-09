const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect to DB
connectDB();

// Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes here
app.use('/facebook-auth', require('./routes/api/auth'));
app.use('/scrape', require('./routes/api/scrape'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
