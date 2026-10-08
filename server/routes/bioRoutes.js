import express from 'express';
import Bio from '../models/Bio.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get Bio & Personal Info (Public)
// @route   GET /api/bio
router.get('/', async (req, res) => {
  try {
    const bio = await Bio.findOne();
    if (!bio) {
      return res.status(404).json({ message: 'Bio not found. Seed the database first.' });
    }
    res.json(bio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update Bio & Personal Info (Protected - Requires JWT)
// @route   PUT /api/bio
router.put('/', protect, async (req, res) => {
  try {
    let bio = await Bio.findOne();
    if (bio) {
      Object.assign(bio, req.body);
      await bio.save();
    } else {
      bio = await Bio.create(req.body);
    }
    res.json(bio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
