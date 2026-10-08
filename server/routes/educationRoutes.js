import express from 'express';
import Education from '../models/Education.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// @desc    Get all education entries (Public)
// @route   GET /api/education
router.get('/', async (req, res) => {
  try {
    const educationList = await Education.find().sort({ createdAt: -1 });
    res.json(educationList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new education entry (Admin only)
// @route   POST /api/education
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const newEdu = await Education.create(req.body);
    res.status(201).json(newEdu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an education entry (Admin only)
// @route   PUT /api/education/:id
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Education entry not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an education entry (Admin only)
// @route   DELETE /api/education/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Education entry not found' });
    res.json({ message: 'Education entry removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
