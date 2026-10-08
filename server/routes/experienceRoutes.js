import express from 'express';
import Experience from '../models/Experience.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// @desc    Get all experience entries (Public)
// @route   GET /api/experience
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new experience entry (Admin only)
// @route   POST /api/experience
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const newExp = await Experience.create(req.body);
    res.status(201).json(newExp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an experience entry (Admin only)
// @route   PUT /api/experience/:id
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Experience entry not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an experience entry (Admin only)
// @route   DELETE /api/experience/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Experience entry not found' });
    res.json({ message: 'Experience entry removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
