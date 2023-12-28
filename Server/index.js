const express = require('express');
const mongoose = require('mongoose');
const { cloudinaryConnect } = require('./utils/cloudinary');
const { uploadImageToCloudinary } = require('./utils/imageUploader');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Pet Schema
const petSchema = new mongoose.Schema({
    name: String,
    species: String,
    breed: String,
    dob: Date,
    vaccination: String,
    imageUrl: String,
});

const Pet = mongoose.model('Pet', petSchema);

// Middleware to parse JSON
app.use(express.json());
cloudinaryConnect();

// Routes
app.post('/pets', async (req, res) => {
    try {
        if (!req.files || !req.files.picture) {
            return res.status(400).json({ message: 'Image file is missing.' });
        }

        const picture = req.files.picture;
        const imageUrl = await uploadImageToCloudinary(picture, process.env.FOLDER_NAME, 1000, 1000);

        const newPet = new Pet({
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            dob: req.body.dob,
            vaccination: req.body.vaccination,
            imageUrl: imageUrl.secure_url,
        });

        const savedPet = await newPet.save();
        res.json(savedPet);
    } catch (error) {
        console.error(error);
        res.status(402).json({ message: 'Error while posting pets' });
    }
});

app.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Error while getting pets' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
