const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
// app.use(bodyParser.urlencoded(extends: true))

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a mongoose schema for the form data
const applicationSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    phone: String,
    identity_photo: String,
    experience: String,
    living_space: String,
    financial_preparedness: String
});

const Application = mongoose.model('Application', applicationSchema);

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Express middleware to handle form submissions
app.post('/submit_form', upload.single('identity_photo'), async (req, res) => {
    try {
        // Create a new application instance with form data
        const newApplication = new Application({
            full_name: req.body.full_name,
            email: req.body.email,
            phone: req.body.phone,
            identity_photo: req.file.filename,
            experience: req.body.experience,
            living_space: req.body.living_space,
            financial_preparedness: req.body.financial_preparedness
        });

        // Save the application to the database
        await newApplication.save();

        res.send('Application submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
