const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Cloudinary configuration (replace 'your_cloud_name', 'your_api_key', 'your_api_secret' with your Cloudinary credentials)
cloudinary.config({
    cloud_name: 'dou9ke817',
    api_key: '924381449966889',
    api_secret: 'YviLZfDv-FaO9qM6qYuLdffZ0bI'
});

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the Pet model
const Pet = mongoose.model('Pet', {
    name: String,
    species: String,
    breed: String,
    dob: Date,
    vaccination: String,
    image: String, // Store the Cloudinary image URL
});

// Route to handle adding a pet
app.post('/add-pet', upload.single('image'), async (req, res) => {
    const { name, species, breed, dob, vaccination } = req.body;

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));

        const newPet = new Pet({ name, species, breed, dob, vaccination, image: result.secure_url });

        newPet.save((err, pet) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Pet added successfully', pet });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
