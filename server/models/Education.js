import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  status: { type: String, required: true },
  details: { type: String }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
export default Education;
