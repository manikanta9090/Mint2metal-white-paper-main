const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Whitelist = require('./models/Whitelist');

dotenv.config();

const app = express();

// Use PORT from .env (fallback 8000)
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files properly
app.use(express.static(path.join(__dirname, 'Mint2Metal_WhitePaper-main')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// API Route
app.post('/api/whitelist', async(req, res) => {
    try {
        const { name, email, stellarWalletId } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingEntry = await Whitelist.findOne({ email: email.toLowerCase() });
        if (existingEntry) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const newEntry = new Whitelist({
            name,
            email: email.toLowerCase(),
            stellarWalletId,
        });

        await newEntry.save();

        res.status(201).json({ message: 'Successfully added to whitelist' });

    } catch (error) {
        console.error('Error adding to whitelist:', error);

        if (error.code === 11000) {
            res.status(409).json({ message: 'Email already registered' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});