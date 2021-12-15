const express = require('express'); //common js formate
const connectDB = require('./config/db');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to the contact keeper API' })
// );

//Connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Define the routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  //* means anything  not the about routes
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
