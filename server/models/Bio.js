import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  roles: [{ type: String }],
  location: { type: String },
  phone: { type: String },
  email: { type: String },
  githubUrl: { type: String },
  githubHandle: { type: String },
  objective: { type: String, required: true },
  photo: { type: String, default: '/akash_photo.jpg' }
}, { timestamps: true });

const Bio = mongoose.model('Bio', bioSchema);
export default Bio;
