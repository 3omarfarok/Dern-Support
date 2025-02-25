const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;


        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Email is already used' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Sign in successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error in server' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Looking for the user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email is not Found' });

        // Password Validation
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password is not right' });

// to generate token
        const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });

        res.json({ message: 'Login successfully', token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Error in server' });
    }
});

module.exports = router;
