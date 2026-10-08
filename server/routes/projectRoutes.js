import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// @desc    Get all projects (Public)
// @route   GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new project (Protected - Requires JWT)
// @route   POST /api/projects
router.post('/', protect, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a project (Protected - Requires JWT)
// @route   PUT /api/projects/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a project (Protected - Requires JWT)
// @route   DELETE /api/projects/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
