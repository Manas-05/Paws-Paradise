const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ApplicationForm', { useNewUrlParser: true, useUnifiedTopology: true });

const adoptionFormSchema = new mongoose.Schema({
    name: String,
    address: String,
    identityProof: String,
    status: String // Pending, Approved, Rejected, etc.
});

const AdoptionForm = mongoose.model('AdoptionForm', adoptionFormSchema);

app.use(express.static('public'));

app.post('/submitForm', (req, res) => {
    const { name, address, identityProof } = req.body;

    const newAdoptionForm = new AdoptionForm({
        name,
        address,
        identityProof,
        status: 'Pending'
    });

    newAdoptionForm.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Form submitted successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
