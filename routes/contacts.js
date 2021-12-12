const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const router = express.Router();

//routes   - GET /api/contacts
//desc     - Get all the user
//access   - Private
router.get('/', auth, async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
  res.json(contacts);
});

//routes   - POST /api/contacts
//desc     - Add the user
//access   - Private
router.post('/', auth, body('name', 'Name is required'), async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array });
  }
  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//routes   - PUT /api/contacts
//desc     - update user
//access   - Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build the contact object
  const contactField = {};
  if (name) contactField.name = name;
  if (email) contactField.email = email;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not found' });
    }

    //Make sure the users own contact
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not Authorization' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactField },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//routes   - Delete /api/contacts
//desc     - Delete the user
//access   - Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: 'Contact Not found' });
    }
    //Make sure users own contacts
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
