const express = require('express'); //common js formate
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the contact keeper API' })
);

//Connect Database
connectDB();

//Define the routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
