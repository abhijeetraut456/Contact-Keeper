const express = require('express');
const router = express.Router();

//routes  - POST api/auth
//desc    - Auth user and get the token
//access  - Public
router.post('/', (req, res) => res.send('Get the token'));

//routes   - GET api/auth
//desc     - logged in a user
//access   - Private
router.get('/', (req, res) => res.send('logged in user'));
module.exports = router;
