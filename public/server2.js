const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files (CSS, JS)
app.use(express.static('public'));

// MongoDB setup (replace with your MongoDB connection string)
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pawsParadise', { useNewUrlParser: true, useUnifiedTopology: true });

// Pet Schema
const petSchema = new mongoose.Schema({
  petName: String,
  species: String,
  breed: String,
  dob: Date,
  vaccination: String,
});

const Pet = mongoose.model('Pet', petSchema);

// Handle POST requests to add a pet
app.post('/add-pet', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.json(req.body);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle GET requests to search for pets
app.get('/search-pets', async (req, res) => {
  try {
    const searchKeyword = req.query.keyword.trim().toLowerCase();

    // Search for pets in the database based on the keyword
    const matchingPets = await Pet.find({
      $or: [
        { petName: { $regex: searchKeyword, $options: 'i' } }, // Case-insensitive search for petName
        { species: { $regex: searchKeyword, $options: 'i' } }, // Case-insensitive search for species
        { breed: { $regex: searchKeyword, $options: 'i' } }, // Case-insensitive search for breed
        { vaccination: { $regex: searchKeyword, $options: 'i' } }, // Case-insensitive search for vaccination
      ],
    });

    res.json(matchingPets);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
