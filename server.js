require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed:', err));

app.listen(3000, () => {
    console.log('It is working! Port 3000 initiated!');
});

// Models
const pokemonTeamSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    item: String
});

const gymLeaderSchema = new mongoose.Schema({
    name: String,
    region: String,
    town: String,
    badge: String,
    specialty: String,
    aceLevel: Number,
    motto: String
});

const GymLeader = mongoose.model('GymLeader', gymLeaderSchema);

// POST: Create a leader
app.post('/api/leaders', async (req, res) => {
    try {
        const leader = new GymLeader(req.body);
        await leader.save();

        console.log('Added a new Leader:', leader);
        res.status(201).json(leader);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: Fetch all leaders
app.get('/api/leaders', async (req, res) => {
    try {
        const leaders = await GymLeader.find({});
        console.log('Fetched all leader entries:', leaders);
        res.json(leaders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Delete a leader
app.delete('/api/leaders/:id', async (req, res) => {
    try {
        const deleted = await GymLeader.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Leader not found' });
        }

        res.json({ message: "The leader's been successfully deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Update a leader
app.put('/api/leaders/:id', async (req, res) => {
    try {
        const updated = await GymLeader.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Leader not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


