import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  tech: [{ type: String }],
  description: { type: String, required: true },
  link: { type: String, default: 'https://github.com/tamilakash' }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
