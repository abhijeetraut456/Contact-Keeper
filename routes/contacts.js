const express = require('express');
const router = express.Router();

//routes   - GET /api/contacts
//desc     - Get all the user
//access   - Private
router.get('/', (req, res) => res.send('Fetching and get the user'));

//routes   - POST /api/contacts
//desc     - Add the user
//access   - Private
router.post('/', (req, res) => res.send('Add the user in database'));

//routes   - PUT /api/contacts
//desc     - update user
//access   - Private
router.put('/:id', (req, res) => res.send('Update the user'));

//routes   - Delete /api/contacts
//desc     - Delete the user
//access   - Private
router.delete('/:id', (req, res) => res.send('Delete the user'));

module.exports = router;
