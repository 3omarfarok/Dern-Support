const express = require('express');
const Request = require('../models/Requests');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { deviceType, issue, priority } = req.body;

        if (!deviceType || !issue) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newRequest = new Request({
            userId: req.user.id,
            deviceType,
            issue,
            priority
        });

        await newRequest.save();
        res.status(201).json({ message: 'Request is added', requestId: newRequest._id });

    } catch (err) {
        res.status(500).json({ message: 'Error in server', error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Not Found the Request' });

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: 'Error in Server' });
    }
});


router.put('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not Allowed' });

        const { status, priority } = req.body;
        await Request.findByIdAndUpdate(req.params.id, { status, priority });

        res.json({ message: 'Request is updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error in Server' });
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Not Allowed' });

        await Request.findByIdAndDelete(req.params.id);
        res.json({ message: 'Request is Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error in Server' });
    }
});

module.exports = router;
