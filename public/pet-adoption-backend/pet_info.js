const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pet-adoption', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Pet schema
const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  vaccinationDetails: String,
  dob: Date,
  species: String,
});

const Pet = mongoose.model('Pet', petSchema);

// Middleware for parsing JSON requests
app.use(express.json());

// Route to add a new pet
app.post('/pets', async (req, res) => {
  try {
    const { name, breed, vaccinationDetails, dob, species } = req.body;

    // Create a new pet instance
    const newPet = new Pet({
      name,
      breed,
      vaccinationDetails,
      dob: new Date(dob),
      species,
    });

    // Save the pet to the database
    await newPet.save();

    res.status(201).json({ message: 'Pet added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle requests to the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Pet Adoption API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
