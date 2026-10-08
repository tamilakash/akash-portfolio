import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// @desc    Get all skills (Public)
// @route   GET /api/skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new skill (Admin only)
// @route   POST /api/skills
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const newSkill = await Skill.create(req.body);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a skill (Admin only)
// @route   PUT /api/skills/:id
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a skill (Admin only)
// @route   DELETE /api/skills/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
