import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  highlights: [{ type: String }]
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
